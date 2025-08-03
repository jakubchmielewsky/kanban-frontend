import api from "../../lib/axios";
import { List } from "../../shared/types/column";
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

// export const updateColumn = async (
//   boardId: string,
//   columnId: string,
//   updates: UpdateColumnDto
// ): Promise<Column> => {
//   const res = await api.patch<ApiResponse<Column>>(
//     `/boards/${boardId}/columns/${columnId}`,
//     updates
//   );
//   return res.data.data!;
// };

// export const deleteColumn = async (
//   boardId: string,
//   columnId: string
// ): Promise<Column> => {
//   const res = await api.delete<ApiResponse<Column>>(
//     `/boards/${boardId}/columns/${columnId}`
//   );
//   return res.data.data!;
// };
