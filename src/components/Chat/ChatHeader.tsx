import { ArrowLeft, MoreVertical } from "lucide-react";
import type { ChatUser } from "../../types/chat";

const formatLastSeen = (lastSeenAt: string) => {
  const lastSeen = new Date(lastSeenAt);
  const elapsed = Date.now() - lastSeen.getTime();
  const day = 24 * 60 * 60 * 1000;
  const time = lastSeen.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  if (elapsed < day) return `last seen ${time}`;
  if (elapsed < day * 2) return `last seen yesterday at ${time}`;
  return `last seen ${lastSeen.toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}`;
};

export default function ChatHeader({ contact, onBack }: { contact: ChatUser | null; onBack: () => void }) {
  const presence = contact?.isOnline
    ? "online"
    : contact?.lastSeenAt
      ? formatLastSeen(contact.lastSeenAt)
      : "last seen recently";

  const initials = contact?.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "?";

  return (
    <header className="flex h-[72px] shrink-0 items-center gap-2 border-b border-[#e1e7e9] bg-white px-2 sm:gap-3 sm:px-4">
      <button type="button" onClick={onBack} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#54656f] transition-colors hover:bg-[#f0f2f5] hover:text-[#111b21]" aria-label="Close chat" title="Close chat">
        <ArrowLeft size={21} strokeWidth={2} />
      </button>

      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d9fdd3] text-sm font-bold text-[#087f5b]">
        {initials}
        {contact?.isOnline && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#00a884]" aria-label="Online" />}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-[#111b21] sm:text-base">
          {contact?.name ?? "Select a conversation"}
        </p>
        <p className={`truncate text-xs ${contact?.isOnline ? "font-medium text-[#00a884]" : "text-[#667781]"}`}>
          {contact ? presence : "Choose a contact to start messaging"}
        </p>
      </div>

      <button type="button" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#54656f] transition-colors hover:bg-[#f0f2f5] hover:text-[#111b21]" aria-label="More options" title="More options">
        <MoreVertical size={21} />
      </button>
    </header>
  );
}
