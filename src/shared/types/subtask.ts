export interface Subtask {
  _id: string;
  task: string;
  title: string;
  isCompleted: boolean;
}

export interface SubtaskDto {
  title: string;
  task: string;
}

export interface SubtaskFormData {
  title: string;
  tempId?: number;
  _id?: string;
}
