import { useGetBoardLists } from "@/features/lists/hooks/useGetBoardLists";
import { List } from "@/features/lists/components/List";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useCreateList } from "@/features/lists/hooks/useCreateList";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { AppCard } from "@/features/cards/components/AppCard";
import { useFetchCards } from "@/features/cards/hooks/useFetchCards";
import { Card } from "@/shared/types/card";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { List as ListType } from "@/shared/types/column";

export const Board: React.FC = () => {
  const listsQuery = useGetBoardLists();
  const fetchCardsQuery = useFetchCards();

  const lists = useMemo(
    () => listsQuery.data?.data || [],
    [listsQuery.data?.data]
  );
  const cards = useMemo(
    () => fetchCardsQuery.data?.data || [],
    [fetchCardsQuery.data?.data]
  );

  const [dndCards, setDndCards] = useState<Card[]>([]);
  const [dndLists, setDndLists] = useState<ListType[]>([]);

  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  const createListMutation = useCreateList();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setDndCards(cards);
  }, [cards]);

  useEffect(() => {
    setDndLists(lists);
  }, [lists]);

  useEffect(() => {
    const scrollToInput = () => {
      if (inputRef.current && isAdding) {
        inputRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    scrollToInput();
  }, [lists.length, isAdding]);

  const handleCreateList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createListMutation.mutateAsync(title);
    setTitle("");
  };

  const handleBlur = () => {
    setIsAdding(false);
    setTitle("");
  };

  const {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    sensors,
    dragOverlayItem,
  } = useDragAndDrop(dndCards, setDndCards, dndLists, setDndLists);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <ScrollArea className="h-full flex flex-1">
        <div className="flex space-x-4 p-4 flex-1">
          <SortableContext
            items={dndLists.map((c) => c._id)}
            strategy={horizontalListSortingStrategy}
          >
            {dndLists.map((list) => (
              <List
                list={list}
                key={list._id}
                cards={dndCards.filter((c) => c.listId === list._id)}
              />
            ))}
          </SortableContext>
          {isAdding && (
            <form onSubmit={handleCreateList} onBlur={handleBlur}>
              <Input
                type="text"
                value={title}
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                placeholder="List title"
                className="w-64"
                ref={inputRef}
              />
            </form>
          )}
          {!isAdding && (
            <Button
              variant="outline"
              className="w-64"
              onClick={() => setIsAdding(true)}
            >
              + New List
            </Button>
          )}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <DragOverlay>
        {dragOverlayItem?.type === "card" && (
          <AppCard card={dragOverlayItem.card} />
        )}
        {dragOverlayItem?.type === "list" && (
          <List
            list={dragOverlayItem.list}
            cards={dndCards.filter(
              (c) => c.listId === dragOverlayItem.list._id
            )}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};
