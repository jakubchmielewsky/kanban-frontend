import api from "../../lib/axios";
import { Board, CreateUpdateBoardDto } from "../../shared/types/board";

export const fetchAllBoards = async (): Promise<Board[]> => {
  const res = await api.get("/boards");
  return res.data.data.data;
};

export const fetchBoard = async (boardId: string): Promise<Board> => {
  const res = await api.get(`/boards/${boardId}`);
  return res.data.data.data;
};

export const updateBoard = async (
  boardId: string,
  updatedBoard: CreateUpdateBoardDto
): Promise<Board> => {
  const res = await api.patch(`/boards/${boardId}`, updatedBoard);
  return res.data.data.data;
};

export const deleteBoard = async (boardId: string): Promise<Board> => {
  const res = await api.delete(`/boards/${boardId}`);
  return res.data;
};

export const createBoard = async (
  newBoard: CreateUpdateBoardDto
): Promise<Board> => {
  const res = await api.post(`/boards`, newBoard);
  return res.data.data.data;
};
