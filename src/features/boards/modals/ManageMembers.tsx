import IconDelete from "../../../assets/icon-cross.svg?react";
import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { useManageMembers } from "../hooks/useManageMembers";
import { Spinner } from "@/shared/components/Spinner";

export const ManageMembers: React.FC = () => {
  const {
    members,
    values,
    errors,
    handleChange,
    handleAddMember,
    handleRemoveMember,
    isDisabled,
    isPending,
  } = useManageMembers();

  return (
    <div className="flex flex-col">
      <h3 className="heading-l mb-6 text-black">Manage Members</h3>

      {members && (
        <>
          <h5 className="body-m text-medium-gray">Members</h5>
          <ul className="flex flex-col gap-2 mb-4">
            {members.map((member) => (
              <li className="flex items-center gap-4 p-2" key={member._id}>
                {member.email}
                <button onClick={() => handleRemoveMember(member.email)}>
                  <IconDelete className="text-medium-gray hover:text-red" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      <TextInput
        label="Email"
        value={values.newMemberEmail}
        onChange={(value) => handleChange("newMemberEmail", value)}
        className="mb-2"
        error={errors.email || errors.api}
      />
      <Button onClick={handleAddMember} disabled={isDisabled}>
        {isPending ? <Spinner /> : "Add Member"}
      </Button>
    </div>
  );
};
