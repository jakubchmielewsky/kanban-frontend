import { useMoveCard } from "@/features/cards/hooks/useMoveCard";
import { useUpdateList } from "@/features/lists/hooks/useUpdateList";
import { Card } from "@/shared/types/card";
import { List as ListType } from "@/shared/types/column";
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Coordinates } from "@dnd-kit/core/dist/types";
import { arrayMove } from "@dnd-kit/sortable";
import { Dispatch, SetStateAction, useRef, useState } from "react";

const GAP = 1024;

export const useDragAndDrop = (
  dndCards: Card[],
  setDndCards: Dispatch<SetStateAction<Card[]>>,
  dndLists: ListType[],
  setDndLists: Dispatch<SetStateAction<ListType[]>>
) => {
  const moveCardMutation = useMoveCard();
  const updateListMutation = useUpdateList();
  const [dragOverlayItem, setDragOverlayItem] = useState<
    { type: "card"; card: Card } | { type: "list"; list: ListType } | null
  >(null);

  const activeCardRef = useRef<{ type: "card"; card: Card }>(null);
  const prevDelta = useRef<Coordinates>(null);

  const getActiveItem = (
    event: DragOverEvent | DragStartEvent | DragEndEvent
  ): { type: "card"; card: Card } | { type: "list"; list: ListType } | null => {
    if (event.active.data.current?.type === "card") {
      return {
        type: "card",
        card: event.active.data.current.card as Card,
      };
    } else if (event.active.data.current?.type === "list") {
      return {
        type: "list",
        list: event.active.data.current.list as ListType,
      };
    } else {
      return null;
    }
  };

  const getOverItem = (
    event: DragOverEvent | DragEndEvent
  ): { type: "card"; card: Card } | { type: "list"; list: ListType } | null => {
    if (event.over?.data.current?.type === "card") {
      return {
        type: "card",
        card: event.over.data.current.card as Card,
      };
    } else if (event.over?.data.current?.type === "list") {
      return {
        type: "list",
        list: event.over.data.current.list as ListType,
      };
    } else {
      return null;
    }
  };

  const getCardsByListId = (listId: string) => {
    const filtered = dndCards.filter((c) => c.listId === listId);

    return filtered;
  };

  const updateCard = (card: Card) => {
    setDndCards((prev: Card[]) =>
      prev
        .map((c) => (c._id === card._id ? card : c))
        .sort((a, b) => a.order - b.order)
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const activeItem = getActiveItem(event);

    setDragOverlayItem(activeItem);

    if (activeItem?.type === "card") activeCardRef.current = activeItem;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const overItem = getOverItem(event);
    if (
      prevDelta.current &&
      prevDelta.current.x === event.delta.x &&
      prevDelta.current.y === event.delta.y
    ) {
      return;
    }
    prevDelta.current = { ...event.delta };
    if (activeCardRef.current?.type === "card") {
      if (overItem?.type === "list") {
        const sourceListId = activeCardRef.current.card.listId;
        const targetListId = overItem.list._id;

        if (sourceListId === targetListId) return;

        const targetListCards = getCardsByListId(targetListId);
        const newOrder =
          (targetListCards[targetListCards.length - 1]?.order ?? 0) + GAP;
        const updatedCard = {
          ...activeCardRef.current.card,
          order: newOrder,
          listId: targetListId,
        };

        updateCard(updatedCard);
        activeCardRef.current = {
          type: "card",
          card: updatedCard,
        };
      }
      if (overItem?.type === "card") {
        const sourceListId = activeCardRef.current.card.listId;
        const targetListId = overItem.card.listId;

        if (sourceListId === targetListId) return;

        const targetListCards = getCardsByListId(targetListId);
        const overCardIndex = targetListCards.findIndex(
          (c) => c._id === overItem.card._id
        );
        const newOrder =
          ((targetListCards[overCardIndex - 1]?.order ?? 0) +
            targetListCards[overCardIndex].order) /
          2;
        const updatedCard = {
          ...activeCardRef.current.card,
          order: newOrder,
          listId: targetListId,
        };
        updateCard(updatedCard);
        activeCardRef.current = {
          type: "card",
          card: updatedCard,
        };
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    prevDelta.current = null;
    const activeItem = getActiveItem(event);
    const overItem = getOverItem(event);
    if (activeCardRef.current?.type === "card" && overItem?.type === "card") {
      if (activeCardRef.current.card._id !== overItem.card._id) {
        const sourceListId = activeCardRef.current.card.listId;
        const targetListId = overItem.card.listId;

        if (sourceListId === targetListId) {
          const listId = sourceListId;
          const listCards = getCardsByListId(listId);
          const activeCardIndex = listCards.findIndex(
            (c) => c._id === activeCardRef.current?.card._id
          );
          const overCardIndex = listCards.findIndex(
            (c) => c._id === overItem.card._id
          );
          const movedList = arrayMove(
            listCards,
            activeCardIndex,
            overCardIndex
          );
          const newOrder = movedList[overCardIndex + 1]?.order
            ? ((movedList[overCardIndex - 1]?.order ?? 0) +
                movedList[overCardIndex + 1]?.order) /
              2
            : (movedList[overCardIndex - 1]?.order ?? 0) + GAP;
          const updatedCard = {
            ...activeCardRef.current.card,
            order: newOrder,
          };
          updateCard(updatedCard);
          activeCardRef.current = {
            type: "card",
            card: updatedCard,
          };
        }
      }
    }

    if (activeItem?.type === "list" && overItem?.type === "list") {
      const activeListIndex = dndLists.findIndex(
        (l) => l._id === activeItem.list._id
      );
      const overListIndex = dndLists.findIndex(
        (l) => l._id === overItem.list._id
      );

      const movedLists = arrayMove(dndLists, activeListIndex, overListIndex);

      const newOrder = movedLists[overListIndex + 1]?.order
        ? ((movedLists[overListIndex - 1]?.order ?? 0) +
            movedLists[overListIndex + 1]?.order) /
          2
        : (movedLists[overListIndex - 1]?.order ?? 0) + GAP;

      movedLists[overListIndex].order = newOrder;

      setDndLists(movedLists);
      updateListMutation.mutate({
        listId: activeItem.list._id,
        data: { order: newOrder },
      });
    }

    ///api
    const updatedCard = activeCardRef.current?.card;

    if (dragOverlayItem?.type === "card" && updatedCard) {
      if (
        dragOverlayItem.card.listId !== updatedCard.listId ||
        dragOverlayItem.card.order !== updatedCard.order
      ) {
        moveCardMutation.mutate({
          cardId: updatedCard._id,
          data: {
            targetListId: updatedCard.listId,
            newOrder: updatedCard.order,
          },
        });
      }
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 10,
      },
    })
  );

  return {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    dragOverlayItem,
    sensors,
  };
};
