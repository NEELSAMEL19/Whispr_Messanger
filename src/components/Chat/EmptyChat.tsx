import { MessageCircle } from "lucide-react";

export default function EmptyChat() {
  return (
    <div className="relative flex min-h-0 flex-1 items-center justify-center bg-[#f5f7f8]">
      <div className="flex max-w-sm flex-col items-center px-6 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#d9fdd3] text-[#00a884]">
          <MessageCircle size={42} strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-normal text-[#41525d]">No conversation selected</h1>
        <p className="mt-2 text-sm leading-6 text-[#667781]">Choose a conversation from your chats to view messages.</p>
      </div>
    </div>
  );
}