import api from "../../lib/axios";
import { List, UpdateListDto } from "../../shared/types/column";
import { ApiResponse } from "../../shared/types/api";

export const getBoardLists = async (
  teamId: string,
  boardId: string
): Promise<ApiResponse<List[]>> => {
  const res = await api.get<ApiResponse<List[]>>(
    `teams/${teamId}/boards/${boardId}/lists`
  );
  return res.data;
};

export const createList = async (
  teamId: string,
  boardId: string,
  name: string
): Promise<ApiResponse<List>> => {
  const res = await api.post<ApiResponse<List>>(
    `/teams/${teamId}/boards/${boardId}/lists`,
    {
      name,
    }
  );
  return res.data;
};

export const updateList = async (
  teamId: string,
  boardId: string,
  listId: string,
  updates: UpdateListDto
): Promise<ApiResponse<List>> => {
  const res = await api.patch<ApiResponse<List>>(
    `/teams/${teamId}/boards/${boardId}/lists/${listId}`,
    updates
  );
  return res.data;
};

// export const deleteColumn = async (
//   boardId: string,
//   columnId: string
// ): Promise<Column> => {
//   const res = await api.delete<ApiResponse<Column>>(
//     `/boards/${boardId}/columns/${columnId}`
//   );
//   return res.data.data!;
// };
