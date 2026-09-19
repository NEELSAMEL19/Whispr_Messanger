import ChatSearch from "../../components/Chat/ChatSearch";
import ChatList from "../../components/Chat/ChatList";
import type { ChatUser } from "../../types/chat";
import ChatListHeader from "../../components/Chat/ChatListHeader";

interface ChatSideBarProps {
  contacts: ChatUser[];
  selectedContact: ChatUser | null;
  search: string;
  isLoading: boolean;
  onSearch: (value: string) => void;
  onSelect: (contact: ChatUser) => void;
  onDelete: (contact: ChatUser) => void;
}

const ChatSideBar = ({
  contacts,
  selectedContact,
  search,
  isLoading,
  onSearch,
  onSelect,
  onDelete,
}: ChatSideBarProps) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <ChatListHeader />
      <ChatSearch value={search} onChange={onSearch} />
      <ChatList
        contacts={contacts}
        selectedContact={selectedContact}
        isLoading={isLoading}
        onSelect={onSelect}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ChatSideBar;
