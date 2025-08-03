import api from "../../lib/axios";
import { Card, UpdateCardDto } from "../../shared/types/card";
import { ApiResponse } from "../../shared/types/api";

export const fetchCards = async (
  teamId: string,
  boardId: string,
  listId: string
): Promise<ApiResponse<Card[]>> => {
  const res = await api.get<ApiResponse<Card[]>>(
    `/teams/${teamId}/boards/${boardId}/lists/${listId}/cards`
  );
  return res.data;
};

export const fetchCard = async (
  teamId: string,
  boardId: string,
  listId: string,
  cardId: string
): Promise<Card> => {
  const res = await api.get<ApiResponse<Card>>(
    `/teams/${teamId}/boards/${boardId}/lists/${listId}/cards/${cardId}`
  );
  return res.data.data!;
};

export const createCard = async (
  teamId: string,
  boardId: string,
  listId: string,
  title: string
): Promise<ApiResponse<Card>> => {
  const res = await api.post<ApiResponse<Card>>(
    `/teams/${teamId}/boards/${boardId}/lists/${listId}/cards`,
    { title }
  );
  return res.data;
};

export const updateCard = async (
  cardId: string,
  updates: UpdateCardDto
): Promise<Card> => {
  const res = await api.patch<ApiResponse<Card>>(`/cards/${cardId}`, updates);
  return res.data.data!;
};

export const deleteCard = async (cardId: string): Promise<Card> => {
  const res = await api.delete<ApiResponse<Card>>(`/cards/${cardId}`);
  return res.data.data!;
};
