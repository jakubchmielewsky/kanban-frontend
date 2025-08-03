import { DndContext } from "@dnd-kit/core";
import { useGetBoardLists } from "@/features/lists/hooks/useGetBoardLists";
import { List } from "@/features/lists/components/List";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useCreateList } from "@/features/lists/hooks/useCreateList";

export const Board: React.FC = () => {
  const listsQuery = useGetBoardLists();
  const lists = listsQuery.data?.data || [];

  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  const createListMutation = useCreateList();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const scrollToInput = () => {
      if (inputRef.current && isAdding) {
        inputRef.current.scrollIntoView({ behavior: "smooth", inline: "end" });
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

  return (
    <DndContext>
      <ScrollArea className="h-full">
        <div className="flex space-x-4 p-4">
          {lists.map((list) => (
            <List list={list} key={list._id} />
          ))}
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
    </DndContext>
  );
};
