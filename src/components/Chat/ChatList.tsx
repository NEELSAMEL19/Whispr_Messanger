import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import type { ChatUser } from "../../types/chat";

interface ChatListProps {
  contacts: ChatUser[];
  selectedContact: ChatUser | null;
  isLoading: boolean;
  onSelect: (contact: ChatUser) => void;
  onDelete: (contact: ChatUser) => void;
}

interface ContextMenuState {
  contact: ChatUser;
  x: number;
  y: number;
}

export default function ChatList({ contacts, selectedContact, isLoading, onSelect, onDelete }: ChatListProps) {
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div aria-busy={isLoading} className={`relative min-h-0 w-full flex-1 overflow-y-auto bg-white transition-opacity duration-200 ${isLoading ? "opacity-70" : "opacity-100"}`}>
      {contacts.map((contact) => (
        <div
          key={contact._id}
          onClick={() => onSelect(contact)}
          onContextMenu={(event) => {
            event.preventDefault();
            setContextMenu({ contact, x: Math.min(event.clientX, window.innerWidth - 180), y: Math.min(event.clientY, window.innerHeight - 55) });
          }}
          className={`flex min-h-[72px] cursor-pointer items-center gap-3 border-b border-gray-100 px-3 hover:bg-[#f5f6f6] ${selectedContact?._id === contact._id ? "bg-[#f0f2f5]" : ""}`}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#dfe5e7] font-semibold text-gray-600">
            {contact.avatar || contact.name.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-[16px] font-medium text-gray-900">{contact.name}</h3>
              {contact.latestMessage && <span className="shrink-0 text-xs text-gray-500">{new Date(contact.latestMessage.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>}
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm text-gray-500">{contact.latestMessage?.deletedAt ? "Message deleted" : contact.latestMessage?.content ?? contact.phone}</p>
              {!!contact.unreadCount && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#25d366] px-1 text-xs text-white">{contact.unreadCount}</span>}
            </div>
          </div>
        </div>
      ))}

      {contextMenu && (
        <div
          className="fixed z-50 min-w-40 rounded-lg border border-gray-200 bg-white p-1 shadow-xl"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            onClick={() => {
              onDelete(contextMenu.contact);
              setContextMenu(null);
            }}
          >
            <Trash2 size={16} />
            Delete chat
          </button>
        </div>
      )}
    </div>
  );
}