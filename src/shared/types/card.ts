export interface Card {
  _id: string;
  title: string;
  description: string;
  listId: string;
  boardId: string;
  order: number;
}

export interface CreateCardDto {
  title: string;
  description?: string;
  listId: string;
  boardId: string;
}

export interface UpdateCardDto {
  title?: string;
  description?: string;
  listId?: string;
  boardId: string;
  order?: number;
}

export interface MoveCardDto {
  targetListId?: string;
  newOrder?: number;
}
