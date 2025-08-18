import { Card, CardContent } from "@/components/ui/card";
import { Card as CardType } from "../../../shared/types/card";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  card: CardType;
  isDragOverlay?: boolean;
}

export const AppCard: React.FC<Props> = ({ card }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card._id,
    data: { card, type: "card" },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`py-2 rounded-md hover:bg-card-foreground/2 cursor-pointer  ${
        isDragging && "opacity-30"
      }`}
      //onClick={handleOpenViewTaskModal}
    >
      <CardContent>{card.title}</CardContent>
    </Card>
  );
};
