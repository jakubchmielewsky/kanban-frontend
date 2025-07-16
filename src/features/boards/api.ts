import api from "../../lib/axios";
import { Board } from "../../shared/types/board";
import { ApiResponse } from "../../shared/types/api";

export const getTeamBoards = async (
  teamId: string
): Promise<ApiResponse<Board[]>> => {
  const res = await api.get<ApiResponse<Board[]>>(`teams/${teamId}/boards/`);
  return res.data;
};

// export const createBoard = async (newBoard: CreateBoardDto): Promise<Board> => {
//   const res = await api.post<ApiResponse<Board>>("/boards", newBoard);
//   return res.data.data!;
// };

// export const updateBoard = async (
//   boardId: string,
//   updates: UpdateBoardDto
// ): Promise<Board> => {
//   const res = await api.patch<ApiResponse<Board>>(
//     `/boards/${boardId}`,
//     updates
//   );
//   return res.data.data!;
// };

// export const deleteBoard = async (boardId: string): Promise<Board> => {
//   const res = await api.delete<ApiResponse<Board>>(`/boards/${boardId}`);
//   return res.data.data!;
// };

// export const fetchBoardMembers = async (boardId: string): Promise<User[]> => {
//   const res = await api.get<ApiResponse<User[]>>(`/boards/${boardId}/members`);
//   return res.data.data!;
// };

// export const addBoardMember = async (
//   boardId: string,
//   memberEmail: string
// ): Promise<null> => {
//   const res = await api.post<ApiResponse<null>>(`/boards/${boardId}/members`, {
//     memberEmail,
//   });
//   return res.data.data!;
// };

// export const removeBoardMember = async (
//   boardId: string,
//   memberEmail: string
// ): Promise<null> => {
//   const res = await api.delete<ApiResponse<null>>(
//     `/boards/${boardId}/members`,
//     {
//       data: { memberEmail },
//     }
//   );
//   return res.data.data!;
// };
