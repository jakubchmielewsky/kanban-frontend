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
import { useFetchCards } from "@/features/cards/hooks/useFetchCards";
import { AppCard } from "@/features/cards/components/AppCard";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useCreateCard } from "@/features/cards/hooks/useCreateCard";

interface ListProps {
  list: ListType;
}

export const List: React.FC<ListProps> = ({ list }) => {
  const fetchCardsQuery = useFetchCards(list._id);
  const cards = fetchCardsQuery.data?.data || [];

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
    <Card className="p-2 gap-2 rounded-md bg-card-foreground/2 w-64 h-min  max-h-[calc(100dvh-(--spacing(24)))]">
      <CardHeader className="p-2">
        <CardTitle className="text-foreground text-sm">{list.name}</CardTitle>
        <CardAction>
          <Ellipsis />
        </CardAction>
      </CardHeader>
      <div className="overflow-hidden flex">
        <ScrollArea className="flex-1 max-h-full min-h-0">
          <CardContent className="px-0 py-1 space-y-2 ">
            {cards.map((card) => (
              <AppCard key={card._id} card={card} />
            ))}
          </CardContent>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
      <CardFooter className="px-0">
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
