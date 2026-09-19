import { useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import Chatbox from "./Chatbox";
import ChatSideBar from "./ChatSideBar";
import EmptyChat from "../../components/Chat/EmptyChat";
import ChatFooter from "../../components/Chat/ChatFooter";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { appendMessage, loadConversation, loadConversations, markMessageDelivered, markMessageRead, removeConversation as removeConversationAction, replaceMessage, selectConversation, setChatError, setUserPresence } from "../../features/chat/chatSlice";
import { chatApi, type SocketMessage, type SocketSendResult } from "../../services/chat";
import { API_BASE_URL } from "../../services/routes";
import type { ChatUser } from "../../types/chat";
import useDebounce from "../../hooks/useDebounce";

const Chat = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const { conversations, selectedContact, messages, contactsStatus, messagesStatus, error } = useAppSelector((state) => state.chat);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const selectedContactRef = useRef<ChatUser | null>(null);

  useEffect(() => {
    selectedContactRef.current = selectedContact;
  }, [selectedContact]);

  useEffect(() => {
    void dispatch(loadConversations(debouncedSearch));
    const refreshPresence = window.setInterval(() => {
      void dispatch(loadConversations(debouncedSearch));
    }, 10000);

    return () => window.clearInterval(refreshPresence);
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    if (!currentUser) return;
    const socket = io(API_BASE_URL, { withCredentials: true, transports: ["websocket"] });
    socketRef.current = socket;
    socket.on("connect_error", () => dispatch(setChatError("Realtime connection unavailable.")));
    socket.on("user_online", ({ userId }: { userId: string }) => {
      dispatch(setUserPresence({ userId, isOnline: true }));
    });
    socket.on("user_offline", ({ userId, lastSeenAt }: { userId: string; lastSeenAt?: string }) => {
      dispatch(setUserPresence({ userId, isOnline: false, lastSeenAt }));
    });
    socket.on("new_message", (message: SocketMessage) => {
      const isActiveConversation = selectedContactRef.current?._id === message.sender || selectedContactRef.current?._id === message.receiver;
      dispatch(appendMessage(message));
      if (message.receiver === currentUser._id) socket.emit("mark_delivered", message._id);
      if (message.receiver === currentUser._id && selectedContactRef.current?._id === message.sender) {
        socket.emit("mark_read", message._id);
      }
      if (!isActiveConversation) void dispatch(loadConversations(search));
      if (selectedContactRef.current?._id === message.sender && message.receiver === currentUser._id) {
        socket.emit("mark_read", message._id);
      }
    });
    socket.on("pending_messages", (messages: SocketMessage[]) => {
      let hasInactiveMessage = false;
      messages.forEach((message) => {
        const isActiveConversation = selectedContactRef.current?._id === message.sender;
        if (!isActiveConversation) hasInactiveMessage = true;
        dispatch(appendMessage(message));
        socket.emit("mark_delivered", message._id);
        if (selectedContactRef.current?._id === message.sender) socket.emit("mark_read", message._id);
      });
      if (hasInactiveMessage) void dispatch(loadConversations(search));
    });
    socket.on("message_delivered", ({ messageId }: { messageId: string }) => {
      dispatch(markMessageDelivered(messageId));
    });
    socket.on("user_typing", ({ userId }: { userId: string }) => {
      if (selectedContactRef.current?._id === userId) setIsTyping(true);
    });
    socket.on("user_stopped_typing", ({ userId }: { userId: string }) => {
      if (selectedContactRef.current?._id === userId) setIsTyping(false);
    });
    socket.on("message_read", ({ messageId, readAt }: { messageId: string; readAt?: string }) => {
      dispatch(markMessageRead({ messageId, readAt }));
    });
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (!currentUser || !socketRef.current) return;
    messages
      .filter((message) => message.receiver === currentUser._id && message.status === "sent")
      .forEach((message) => socketRef.current?.emit("mark_delivered", message._id));
  }, [currentUser, messages]);

  const chooseConversation = (contact: ChatUser) => {
    dispatch(selectConversation(contact));
    void dispatch(loadConversation(contact._id));
    void chatApi.markRead(contact._id);
  };

  const sendMessage = (content: string) => {
    if (!selectedContact || !socketRef.current) return;
    socketRef.current.emit("send_message", { receiverId: selectedContact._id, content }, (result: SocketSendResult) => {
      if (!result.success) dispatch(setChatError(result.message));
    });
  };

  const sendTyping = (typing: boolean) => {
    if (selectedContact) socketRef.current?.emit(typing ? "typing" : "stop_typing", selectedContact._id);
  };

  const updateMessage = async (messageId: string, content: string) => {
    try {
      const response = await chatApi.editMessage(messageId, content);
      dispatch(replaceMessage(response.data));
    } catch {
      dispatch(setChatError("Unable to edit this message."));
    }
  };

  const removeMessage = async (messageId: string) => {
    try {
      const response = await chatApi.deleteMessage(messageId);
      dispatch(replaceMessage(response.data));
    } catch {
      dispatch(setChatError("Unable to delete this message."));
    }
  };

  const deleteConversation = async (contact: ChatUser) => {
    if (!window.confirm(`Delete your chat with ${contact.name}?`)) return;
    try {
      await chatApi.deleteConversation(contact._id);
      dispatch(removeConversationAction(contact._id));
    } catch {
      dispatch(setChatError("Unable to delete this chat."));
    }
  };

  return (
    <div className="flex h-dvh min-h-0 w-full flex-col overflow-hidden bg-white">
      <div className="flex min-h-0 flex-1">
        <div className="flex h-full w-[min(380px,34vw)] min-w-0 shrink-0 flex-col border-r border-[#d9dfe2] max-md:w-[38%] max-sm:w-[40%]">
        <ChatSideBar
          contacts={conversations}
          selectedContact={selectedContact}
          search={search}
          isLoading={contactsStatus === "loading"}
          onSearch={setSearch}
          onSelect={chooseConversation}
          onDelete={deleteConversation}
        />
        </div>
        <div className="flex h-full min-w-0 flex-1 flex-col">
          {selectedContact ? (
            <Chatbox
            contact={selectedContact}
            messages={messages}
            currentUserId={currentUser?._id ?? ""}
            isLoading={messagesStatus === "loading"}
            isTyping={isTyping}
            error={error}
            onSend={sendMessage}
            onTyping={sendTyping}
            onEdit={updateMessage}
            onDelete={removeMessage}
            onBack={() => dispatch(selectConversation(null))}
            />
          ) : <EmptyChat />}
        </div>
      </div>
      <ChatFooter />
    </div>
  );
};

export default Chat;