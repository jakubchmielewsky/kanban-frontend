export type ModalType =
  | {
      name: "VIEW_TASK";
      payload: { taskId: string };
    }
  | { name: "ADD_TASK"; payload: { taskId: string } }
  | { name: "EDIT_TASK"; payload: { taskId: string } }
  | { name: "DELETE_TASK"; payload: { taskId: string } }
  | { name: "ADD_BOARD" }
  | { name: "EDIT_BOARD"; payload: { boardId: string } }
  | { name: "DELETE_BOARD"; payload: { boardId: string } };
