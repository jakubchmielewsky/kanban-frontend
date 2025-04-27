export interface Column {
  _id: string;
  name: string;
  boardId: string;
  order: number;
}

export interface CreateColumnDto {
  name: string;
  boardId: string;
}

export interface UpdateColumnDto {
  name?: string;
  order?: number;
}
