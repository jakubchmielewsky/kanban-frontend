export type ModalType =
  | { name: "ADD_BOARD"; payload: null }
  | { name: "TASK_DETAILS"; payload: { taskId: string } }
  | { name: "ADD_TASK"; payload: null }
  | { name: "EDIT_TASK"; payload: { taskId: string } }
  | { name: "DELETE_TASK"; payload: { taskId: string } }
  | { name: "EDIT_BOARD"; payload: { boardId: string } }
  | { name: "DELETE_BOARD"; payload: { boardId: string } };
