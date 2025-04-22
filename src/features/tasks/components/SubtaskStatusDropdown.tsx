import { Dropdown } from "../../../shared/components/Dropdown";
import { Column } from "../../../shared/types/column";

interface Props {
  columns: Column[] | null;
  currentValue: Column | null;
  setCurrentValue: (column: Column) => void;
}

export const SubtaskStatusDropdown: React.FC<Props> = ({
  columns,
  currentValue,
  setCurrentValue,
}) => {
  return (
    <div>
      <h5 className="body-m mb-2 text-medium-gray">Status</h5>

      {columns && columns.length > 0 && currentValue && (
        <Dropdown
          options={columns}
          currentValue={currentValue}
          setValue={setCurrentValue}
        />
      )}
    </div>
  );
};
