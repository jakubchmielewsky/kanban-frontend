export interface Task {
  _id: string;
  title: string;
  description: string;
  status: boolean;
  column: string;
}

export interface TaskDto {
  title: string;
  description: string;
  column: string;
}
