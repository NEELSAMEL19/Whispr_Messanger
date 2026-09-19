import ChatMessages from "../../components/Chat/ChatMessages";
import ChatHeader from "../../components/Chat/ChatHeader";
import ChatInput from "../../components/Chat/ChatInput";
import type { ChatMessage, ChatUser } from "../../types/chat";

interface ChatboxProps {
  contact: ChatUser | null;
  messages: ChatMessage[];
  currentUserId: string;
  isLoading: boolean;
  isTyping: boolean;
  error: string;
  onSend: (content: string) => void;
  onTyping: (typing: boolean) => void;
  onEdit: (messageId: string, content: string) => void;
  onDelete: (messageId: string) => void;
  onBack: () => void;
}

const Chatbox = ({ contact, messages, currentUserId, isLoading, isTyping, error, onSend, onTyping, onEdit, onDelete, onBack }: ChatboxProps) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <ChatHeader contact={contact} onBack={onBack} />
      <ChatMessages messages={messages} currentUserId={currentUserId} isLoading={isLoading} isTyping={isTyping} onEdit={onEdit} onDelete={onDelete} />
      {error && <p className="bg-red-50 px-4 py-1 text-center text-xs text-red-700">{error}</p>}
      <ChatInput disabled={!contact} onSend={onSend} onTyping={onTyping} />
    </div>
  );
};

export default Chatbox;
