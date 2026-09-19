import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Send, Smile } from "lucide-react";

interface ChatInputProps {
  disabled: boolean;
  onSend: (content: string) => void;
  onTyping: (typing: boolean) => void;
}

export default function ChatInput({ disabled, onSend, onTyping }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const sendMessage = () => {
    const content = message.trim();
    if (!content || disabled) return;
    onSend(content);
    setMessage("");
    setShowEmoji(false);
    onTyping(false);
  };

  return (
    <div className="relative w-full shrink-0 bg-[#f0f2f5] px-2 py-2 sm:px-4 sm:py-2.5">
      {showEmoji && <div className="absolute bottom-[65px] left-3 z-50"><EmojiPicker onEmojiClick={({ emoji }) => setMessage((current) => current + emoji)} height={400} width={350} /></div>}
      <div className="flex min-w-0 items-center gap-1 sm:gap-2">
        <button type="button" disabled={disabled} onClick={() => setShowEmoji((current) => !current)} className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] hover:bg-[#e9edef] disabled:opacity-50" aria-label="Emoji">
          <Smile size={25} strokeWidth={1.8} />
        </button>
        <input value={message} disabled={disabled} onChange={(event) => { setMessage(event.target.value); onTyping(Boolean(event.target.value.trim())); }} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} type="text" placeholder={disabled ? "Select a contact" : "Type a message"} className="h-[42px] min-w-0 flex-1 rounded-lg border-none bg-white px-4 text-[15px] text-[#111b21] outline-none placeholder:text-[#667781] disabled:bg-gray-100" />
        <button type="button" disabled={!message.trim() || disabled} onClick={sendMessage} className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] hover:bg-[#e9edef] disabled:opacity-50" aria-label="Send">
          <Send size={23} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}