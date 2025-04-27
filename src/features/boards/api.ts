import api from "../../lib/axios";
import {
  Board,
  CreateBoardDto,
  UpdateBoardDto,
} from "../../shared/types/board";
import { ApiResponse } from "../../shared/types/api";

export const fetchBoards = async (): Promise<Board[]> => {
  const res = await api.get<ApiResponse<Board[]>>("/boards");
  return res.data.data!;
};

export const fetchBoard = async (boardId: string): Promise<Board> => {
  const res = await api.get<ApiResponse<Board>>(`/boards/${boardId}`);
  return res.data.data!;
};

export const createBoard = async (newBoard: CreateBoardDto): Promise<Board> => {
  const res = await api.post<ApiResponse<Board>>("/boards", newBoard);
  return res.data.data!;
};

export const updateBoard = async (
  boardId: string,
  updates: UpdateBoardDto
): Promise<Board> => {
  const res = await api.patch<ApiResponse<Board>>(
    `/boards/${boardId}`,
    updates
  );
  return res.data.data!;
};

export const deleteBoard = async (boardId: string): Promise<Board> => {
  const res = await api.delete<ApiResponse<Board>>(`/boards/${boardId}`);
  return res.data.data!;
};
