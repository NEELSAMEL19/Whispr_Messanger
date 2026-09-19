import ChatMessages from "../../components/Chat/ChatMessages";
import ChatHeader from "../../components/Chat/ChatHeader";
import ChatInput from "../../components/Chat/ChatInput";

const Chatbox = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default Chatbox;
