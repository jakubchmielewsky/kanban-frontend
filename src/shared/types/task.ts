export interface Task {
  _id: string;
  title: string;
  description: string;
  column: string;
  subtasks: {
    _id?: string;
    title: string;
    isCompleted: boolean;
  }[];
}
