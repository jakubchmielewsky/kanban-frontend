import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { List as ListType } from "../../../shared/types/column";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AppCard } from "@/features/cards/components/AppCard";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useCreateCard } from "@/features/cards/hooks/useCreateCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
//import { useDroppable } from "@dnd-kit/core";
import { Card as CardType } from "@/shared/types/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  list: ListType;
  cards: CardType[];
}

export const List: React.FC<Props> = ({ list, cards }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: list._id,
    data: { list, type: "list" },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  const createCardMutation = useCreateCard(list._id);

  const handleCreateCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCardMutation.mutate(title);
    setTitle("");
  };

  const handleBlur = () => {
    setIsAdding(false);
    setTitle("");
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`p-0 gap-2 rounded-md bg-card-foreground/2 w-64 h-min  max-h-[calc(100dvh-(--spacing(24)))] ${
        isDragging && "opacity-30"
      }`}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-foreground text-sm">{list.name}</CardTitle>
        <CardAction>
          <Ellipsis />
        </CardAction>
      </CardHeader>

      <div className="overflow-hidden flex">
        <ScrollArea className="w-full">
          <CardContent className="px-2 pb-1 space-y-2">
            <SortableContext
              items={cards.map((c) => c._id)}
              strategy={verticalListSortingStrategy}
            >
              {cards.map((card) => (
                <AppCard key={card._id} card={card} />
              ))}
            </SortableContext>
          </CardContent>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
      <CardFooter className="p-2">
        {isAdding && (
          <form
            onSubmit={handleCreateCard}
            onBlur={handleBlur}
            className="w-full"
          >
            <Input
              type="text"
              value={title}
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Card title"
            />
          </form>
        )}
        {!isAdding && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsAdding(true)}
          >
            + New Card
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
