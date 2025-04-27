export interface Subtask {
  _id: string;
  title: string;
  isCompleted: boolean;
}

export interface SubtaskDto {
  title: string;
  isCompleted?: boolean;
}
