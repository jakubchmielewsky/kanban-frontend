export interface Board {
  _id: string;
  name: string;
  ownerId: string;
  membersIds: string[];
}

export interface CreateBoardDto {
  name: string;
}

export interface UpdateBoardDto {
  name: string;
  ownerId: string;
}
