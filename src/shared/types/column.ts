export interface List {
  _id: string;
  name: string;
  boardId: string;
  order: number;
}

export interface CreateListDto {
  name: string;
  boardId: string;
}

export interface UpdateListDto {
  name?: string;
  order?: number;
}
