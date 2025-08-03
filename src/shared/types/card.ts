export interface Card {
  _id: string;
  title: string;
  description: string;
  listId: string;
  order: number;
}

export interface CreateCardDto {
  title: string;
  description?: string;
  listId: string;
}

export interface UpdateCardDto {
  title?: string;
  description?: string;
  listId?: string;
  order?: number;
}
