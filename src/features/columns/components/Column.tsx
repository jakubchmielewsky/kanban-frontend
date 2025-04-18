import { Column as ColumnType } from "../../../types/column";

interface ColumnProps {
  column: ColumnType;
}

export const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <div className="">
      <h3 className="heading-m text-medium-gray mx-8 my-3">
        {`${column.name.toUpperCase()} (${"TODO:X"})`}
      </h3>
    </div>
  );
};
