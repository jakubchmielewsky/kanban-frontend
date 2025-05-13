import { useState } from "react";
import { useFetchBoardMembers } from "./useFetchBoardMembers";
import { useAddBoardMember } from "./useAddBoardMember";
import { useRemoveBoardMember } from "./useRemoveBoardMember";
import { manageMembersSchema } from "../schemas/manageMembersSchema";
import { z } from "zod";

export const useManageMembers = () => {
  const membersQuery = useFetchBoardMembers();
  const addMemberMutation = useAddBoardMember();
  const removeMemberMutation = useRemoveBoardMember();

  const members = membersQuery.data;

  type FormValues = z.infer<typeof manageMembersSchema>;
  const [values, setValues] = useState<FormValues>({ newMemberEmail: "" });
  const [errors, setErrors] = useState<{
    email?: string;
    api?: string;
  }>({});

  type Field = keyof typeof values;
  const handleChange = (field: Field, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "", api: "" }));
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddMember = async () => {
    const result = manageMembersSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors((prev) => ({
        ...prev,
        email: fieldErrors.newMemberEmail?.[0],
      }));
      return;
    }

    setErrors({});
    try {
      await addMemberMutation.mutateAsync(result.data.newMemberEmail);
      setValues({ newMemberEmail: "" });
    } catch (error: any) {
      if (error?.response?.data?.err?.message) {
        setErrors((prev) => ({
          ...prev,
          api: error.response.data.err.message,
        }));
      } else {
        setErrors((prev) => ({ ...prev, api: "Failed to add member" }));
      }
    }
  };

  const handleRemoveMember = async (memberEmail: string) => {
    try {
      await removeMemberMutation.mutateAsync(memberEmail);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setErrors((prev) => ({ ...prev, api: error.response.data.message }));
      } else {
        setErrors((prev) => ({ ...prev, api: "Authentication failed" }));
      }
    }
  };

  const isDisabled = addMemberMutation.isPending || !values.newMemberEmail;

  return {
    members,
    values,
    errors,
    handleChange,
    handleAddMember,
    handleRemoveMember,
    isDisabled,
    isPending: addMemberMutation.isPending,
  };
};
