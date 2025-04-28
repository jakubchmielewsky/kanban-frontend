import { useFetchBoardMembers } from "../hooks/useFetchBoardMembers";
import IconDelete from "../../../assets/icon-cross.svg?react";
import { TextInput } from "../../../shared/components/textInput/TextInput";
import { useEffect, useState } from "react";
import { Button } from "../../../shared/components/button/Button";
import { useAddBoardMember } from "../hooks/useAddBoardMember";

export const ManageMembers: React.FC = () => {
  const membersQuery = useFetchBoardMembers();
  const addMemberMutation = useAddBoardMember();
  const [newMemberEmail, setNewMemberEmail] = useState("");

  const members = membersQuery.data;

  const handleAddMember = () => {
    addMemberMutation.mutateAsync(newMemberEmail);
  };

  useEffect(() => {
    if (addMemberMutation.isSuccess) setNewMemberEmail("");
  }, [addMemberMutation.isSuccess]);

  const handleNewMemberEmailChange = (value: string) => {
    setNewMemberEmail(value);
  };

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
                <button>
                  <IconDelete className="text-medium-gray hover:text-red" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      <TextInput
        label="Email"
        value={newMemberEmail}
        onChange={(value) => handleNewMemberEmailChange(value)}
        className="mb-2"
      />
      <Button onClick={handleAddMember} disabled={addMemberMutation.isPending}>
        Add Member
      </Button>
    </div>
  );
};
