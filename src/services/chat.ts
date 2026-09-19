import { apiClient } from "./client";
import { API_ENDPOINTS } from "./routes";
import type {
  ChatMessage,
  ConversationsResponse,
  ConversationResponse,
  MessageResponse,
  UsersResponse,
} from "../types/chat";

export const chatApi = {
  users: (query: string) =>
    apiClient
      .get<UsersResponse>(API_ENDPOINTS.AUTH.USERS, { params: { q: query } })
      .then((response) => response.data),

  conversations: (query = "") =>
    apiClient
      .get<ConversationsResponse>(API_ENDPOINTS.MESSAGES.CONVERSATIONS, { params: query ? { q: query } : undefined })
      .then((response) => response.data),

  deleteConversation: (userId: string) =>
    apiClient.delete(API_ENDPOINTS.MESSAGES.CONVERSATION(userId)),

  conversation: (userId: string) =>
    apiClient
      .get<ConversationResponse>(API_ENDPOINTS.MESSAGES.CONVERSATION(userId))
      .then((response) => response.data),

  markRead: (userId: string) =>
    apiClient.patch(API_ENDPOINTS.MESSAGES.READ(userId)),

  editMessage: (messageId: string, content: string) =>
    apiClient
      .patch<MessageResponse>(API_ENDPOINTS.MESSAGES.MESSAGE(messageId), { content })
      .then((response) => response.data),

  deleteMessage: (messageId: string) =>
    apiClient
      .delete<MessageResponse>(API_ENDPOINTS.MESSAGES.MESSAGE(messageId))
      .then((response) => response.data),
};

export type SocketMessage = ChatMessage;
export type SocketSendResult = { success: true; data: ChatMessage } | { success: false; message: string };