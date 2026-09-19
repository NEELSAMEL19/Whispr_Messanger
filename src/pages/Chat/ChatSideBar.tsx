import ChatSearch from "../../components/Chat/ChatSearch";
import ChatList from "../../components/Chat/ChatList";

const ChatSideBar = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <ChatSearch />
      <ChatList />
    </div>
  );
};

export default ChatSideBar;
