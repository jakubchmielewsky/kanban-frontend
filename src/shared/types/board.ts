export interface Board {
  _id: string;
  name: string;
  owner: string;
  members: string[];
}

export interface CreateUpdateBoardDto {
  name: string;
}
