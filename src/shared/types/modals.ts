import { Board } from "./board";

export type ModalType =
  | { name: "ADD_BOARD"; payload: null }
  | { name: "TASK_DETAILS"; payload: { taskId: string } }
  | { name: "ADD_TASK" }
  | { name: "EDIT_TASK"; payload: { taskId: string } }
  | { name: "DELETE_TASK"; payload: { taskId: string } }
  | { name: "EDIT_BOARD"; payload: { board: Board } }
  | { name: "DELETE_BOARD"; payload: { board: Board } };
