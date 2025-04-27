import api from "../../lib/axios";
import {
  Column,
  CreateColumnDto,
  UpdateColumnDto,
} from "../../shared/types/column";
import { ApiResponse } from "../../shared/types/api";

export const fetchColumns = async (boardId: string): Promise<Column[]> => {
  const res = await api.get<ApiResponse<Column[]>>(
    `/boards/${boardId}/columns`
  );
  return res.data.data!;
};

export const createColumn = async (
  boardId: string,
  newColumn: CreateColumnDto
): Promise<Column> => {
  const res = await api.post<ApiResponse<Column>>(
    `/boards/${boardId}/columns`,
    newColumn
  );
  return res.data.data!;
};

export const updateColumn = async (
  boardId: string,
  columnId: string,
  updates: UpdateColumnDto
): Promise<Column> => {
  const res = await api.patch<ApiResponse<Column>>(
    `/boards/${boardId}/columns/${columnId}`,
    updates
  );
  return res.data.data!;
};

export const deleteColumn = async (
  boardId: string,
  columnId: string
): Promise<Column> => {
  const res = await api.delete<ApiResponse<Column>>(
    `/boards/${boardId}/columns/${columnId}`
  );
  return res.data.data!;
};
