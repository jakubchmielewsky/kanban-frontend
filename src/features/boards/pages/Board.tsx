import { Column } from "../../../features/columns/components/Column";
import { Button } from "../../../shared/components/button/Button";
import { useGetColumns } from "../../columns/hooks/useGetColumns";
import { useParams } from "react-router-dom";

export const Board: React.FC = () => {
  const { boardId } = useParams();
  const columns = useGetColumns(boardId);

  if (!columns.data) return null;

  if (columns.data.length < 1)
    return (
      <div className="h-full flex flex-col gap-5 items-center justify-center">
        <h1 className="heading-l text-medium-gray">
          This board is empty. Create a new column to get started.
        </h1>
        <Button size="l">+ Add New Column</Button>
      </div>
    );
  return (
    <div className="h-full flex p-4 gap-x-4">
      {columns.data.map((column) => {
        return <Column key={column._id} column={column}></Column>;
      })}
    </div>
  );
};
