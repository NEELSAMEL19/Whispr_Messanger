import Chatbox from "./Chatbox";
import ChatSideBar from "./ChatSideBar";

const Chat = () => {
  return (
    <div className="flex h-dvh min-h-0 w-full overflow-hidden bg-white">
      <div className="flex h-full w-[min(380px,34vw)] min-w-0 shrink-0 flex-col border-r border-[#d9dfe2] max-md:w-[38%] max-sm:w-[40%]">
        <ChatSideBar />
      </div>
      <div className="flex h-full min-w-0 flex-1 flex-col">
        <Chatbox />
      </div>
    </div>
  );
};

export default Chat;
