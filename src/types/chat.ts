export interface ChatUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeenAt?: string;
  latestMessage?: ChatMessage;
  unreadCount?: number;
}

export interface ChatMessage {
  _id: string;
  sender: string;
  receiver: string;
  content: string;
  status: "sent" | "delivered" | "read";
  createdAt: string;
  readAt?: string;
  editedAt?: string;
  deletedAt?: string;
}

export interface UsersResponse {
  success: boolean;
  data: ChatUser[];
}

export interface ConversationResponse {
  success: boolean;
  data: ChatMessage[];
  pagination: { page: number; limit: number; hasMore: boolean };
}

export interface MessageResponse {
  success: boolean;
  data: ChatMessage;
}

export interface ConversationsResponse {
  success: boolean;
  data: ChatUser[];
}