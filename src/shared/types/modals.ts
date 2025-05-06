import { Board } from "./board";
import { Task } from "./task";

export type ModalType =
  | { name: "MANAGE_MEMBERS" }
  | { name: "CREATE_BOARD" }
  | { name: "TASK_DETAILS"; payload: { taskId: string } }
  | { name: "CREATE_TASK" }
  | { name: "CREATE_COLUMN" }
  | { name: "UPDATE_TASK"; payload: { task: Task } }
  | { name: "DELETE_TASK"; payload: { task: Task } }
  | { name: "UPDATE_BOARD"; payload: { board: Board } }
  | { name: "DELETE_BOARD"; payload: { board: Board } };
