import { Card, CardContent } from "@/components/ui/card";
import { useModalStore } from "../../../shared/stores/useModalStore";
import { Card as CardType } from "../../../shared/types/card";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  card: CardType;
  isDragOverlay?: boolean;
}

export const AppCard: React.FC<Props> = ({ card, isDragOverlay }) => {
  const openModal = useModalStore((store) => store.openModal);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleOpenViewTaskModal = () => {
    openModal({
      name: "TASK_DETAILS",
      payload: { taskId: card._id },
    });
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="py-2 rounded-md hover:bg-card-foreground/2 cursor-pointer"
      // className={`w-full px-4 py-4 bg-white rounded-lg shadow-sm  ${
      //   isDragging && "opacity-30"
      // } ${
      //   isDragOverlay
      //     ? "cursor-grabbing opacity-70 border border-dashed"
      //     : "cursor-pointer border border-lines-light/20"
      // }`}
      onClick={handleOpenViewTaskModal}
    >
      <CardContent>{card.title}</CardContent>
    </Card>
  );
};
