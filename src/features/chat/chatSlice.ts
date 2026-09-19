import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { chatApi } from "../../services/chat";
import { logout } from "../auth/authSlice";
import type { ChatMessage, ChatUser } from "../../types/chat";

interface ChatState {
  conversations: ChatUser[];
  selectedContact: ChatUser | null;
  messages: ChatMessage[];
  contactsStatus: "idle" | "loading" | "succeeded" | "failed";
  messagesStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string;
}

const initialState: ChatState = {
  conversations: [],
  selectedContact: null,
  messages: [],
  contactsStatus: "idle",
  messagesStatus: "idle",
  error: "",
};

export const loadConversations = createAsyncThunk("chat/loadConversations", async (query: string) => {
  const response = query.trim()
    ? await chatApi.users(query.trim())
    : await chatApi.conversations();
  return response.data;
});

export const loadConversation = createAsyncThunk("chat/loadConversation", async (userId: string) => {
  const response = await chatApi.conversation(userId);
  return response.data;
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectConversation: (state, action: PayloadAction<ChatUser | null>) => {
      state.selectedContact = action.payload;
      if (action.payload) {
        const conversation = state.conversations.find((item) => item._id === action.payload?._id);
        if (conversation) conversation.unreadCount = 0;
      }
      state.messages = [];
      state.messagesStatus = action.payload ? "loading" : "idle";
      state.error = "";
    },
    appendMessage: (state, action: PayloadAction<ChatMessage>) => {
      const message = action.payload;
      const selectedId = state.selectedContact?._id;
      if (selectedId !== message.sender && selectedId !== message.receiver) return;
      if (!state.messages.some((item) => item._id === message._id)) state.messages.push(message);
      const conversation = state.conversations.find((item) => item._id === selectedId);
      if (conversation) {
        conversation.latestMessage = message;
        conversation.unreadCount = 0;
      }
    },
    replaceMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages = state.messages.map((message) => message._id === action.payload._id ? action.payload : message);
    },
    markMessageRead: (state, action: PayloadAction<{ messageId: string; readAt?: string }>) => {
      state.messages = state.messages.map((message) => message._id === action.payload.messageId
        ? { ...message, status: "read", readAt: action.payload.readAt }
        : message);
    },
    markMessageDelivered: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.map((message) => message._id === action.payload
        ? { ...message, status: "delivered" }
        : message);
    },
    setChatError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    removeConversation: (state, action: PayloadAction<string>) => {
      state.conversations = state.conversations.filter((conversation) => conversation._id !== action.payload);
      if (state.selectedContact?._id === action.payload) {
        state.selectedContact = null;
        state.messages = [];
        state.messagesStatus = "idle";
      }
    },
    setUserPresence: (state, action: PayloadAction<{ userId: string; isOnline: boolean; lastSeenAt?: string }>) => {
      const { userId, isOnline, lastSeenAt } = action.payload;
      const conversation = state.conversations.find((item) => item._id === userId);
      if (conversation) {
        conversation.isOnline = isOnline;
        conversation.lastSeenAt = lastSeenAt;
      }
      if (state.selectedContact?._id === userId) {
        state.selectedContact.isOnline = isOnline;
        state.selectedContact.lastSeenAt = lastSeenAt;
      }
    },
    resetChat: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadConversations.pending, (state) => {
        state.contactsStatus = "loading";
      })
      .addCase(loadConversations.fulfilled, (state, action) => {
        state.contactsStatus = "succeeded";
        state.conversations = action.payload;
        const selectedContact = state.selectedContact
          ? action.payload.find((user) => user._id === state.selectedContact?._id)
          : undefined;
        if (selectedContact && state.selectedContact) {
          state.selectedContact = { ...state.selectedContact, ...selectedContact };
        } else if (state.selectedContact) {
          state.selectedContact = null;
          state.messages = [];
        }
      })
      .addCase(loadConversations.rejected, (state) => {
        state.contactsStatus = "failed";
        state.error = "Unable to load conversations.";
      })
      .addCase(loadConversation.pending, (state) => {
        state.messagesStatus = "loading";
      })
      .addCase(loadConversation.fulfilled, (state, action) => {
        state.messagesStatus = "succeeded";
        state.messages = action.payload;
      })
      .addCase(loadConversation.rejected, (state) => {
        state.messagesStatus = "failed";
        state.error = "Unable to load this conversation.";
      })
      .addCase(logout.fulfilled, () => initialState);
  },
});

export const { appendMessage, markMessageDelivered, markMessageRead, removeConversation, replaceMessage, resetChat, selectConversation, setChatError, setUserPresence } = chatSlice.actions;
export default chatSlice.reducer;