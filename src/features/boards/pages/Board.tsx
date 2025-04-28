import { useFetchColumns } from "../../columns/hooks/useFetchColumns";
import { Column } from "../../../features/columns/components/Column";
import { Button } from "../../../shared/components/button/Button";

export const Board: React.FC = () => {
  const columns = useFetchColumns();

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
    <div className="h-full w-full overflow-x-auto">
      <div className="flex flex-row gap-x-4 min-w-fit p-4">
        {columns.data.map((column) => (
          <Column key={column._id} column={column} />
        ))}
      </div>
    </div>
  );
};
