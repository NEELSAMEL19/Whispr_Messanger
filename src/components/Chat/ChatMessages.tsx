import { useEffect, useRef, useState } from "react";
import { Copy, Edit3, Trash2 } from "lucide-react";
import type { ChatMessage } from "../../types/chat";

interface ChatMessagesProps {
  messages: ChatMessage[];
  currentUserId: string;
  isLoading: boolean;
  isTyping: boolean;
  onEdit: (messageId: string, content: string) => void;
  onDelete: (messageId: string) => void;
}

interface ContextMenuState {
  message: ChatMessage;
  isMine: boolean;
  x: number;
  y: number;
}

export default function ChatMessages({ messages, currentUserId, isLoading, isTyping, onEdit, onDelete }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const copyMessage = async (message: ChatMessage) => {
    await navigator.clipboard.writeText(message.content);
    setContextMenu(null);
  };

  return (
    <div className="min-h-0 w-full flex-1 overflow-y-auto bg-[#efeae2] p-3 sm:p-4">
      {isLoading && <p className="text-center text-sm text-gray-500">Loading messages...</p>}
      {!isLoading && messages.length === 0 && <p className="mt-8 text-center text-sm text-gray-500">No messages yet. Say hello.</p>}
      <div className="flex flex-col gap-2">
        {messages.map((message) => {
          const isMe = message.sender === currentUserId;
          const time = new Date(message.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
          return (
            <div key={message._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                onContextMenu={(event) => {
                  event.preventDefault();
                  setContextMenu({ message, isMine: isMe, x: Math.min(event.clientX, window.innerWidth - 180), y: Math.min(event.clientY, window.innerHeight - (isMe ? 105 : 55)) });
                }}
                className={`relative max-w-[88%] px-3 py-2 shadow-sm sm:max-w-[70%] ${isMe ? "rounded-l-lg rounded-br-lg bg-[#d9fdd3]" : "rounded-r-lg rounded-bl-lg bg-white"}`}
              >
                <div className="flex items-end gap-2">
                  <p className="break-words text-[14px] leading-5 text-gray-800">{message.deletedAt ? "Message deleted" : message.content}</p>
                  <div className="flex shrink-0 items-center gap-1">
                    <span className="text-[10px] text-gray-500">{time}</span>
                    {isMe && <span className={`text-[12px] ${message.status === "read" ? "text-blue-500" : "text-gray-500"}`}>{message.status === "sent" ? "✓" : "✓✓"}</span>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {isTyping && <p className="text-xs text-gray-500">Typing...</p>}
        <div ref={bottomRef} />
      </div>

      {contextMenu && (
        <div
          className="fixed z-50 min-w-40 rounded-lg border border-gray-200 bg-white p-1 shadow-xl"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(event) => event.stopPropagation()}
        >
          <button type="button" className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" onClick={() => void copyMessage(contextMenu.message)}>
            <Copy size={16} />
            Copy
          </button>
          {contextMenu.isMine && !contextMenu.message.deletedAt && (
            <>
              <button type="button" className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100" onClick={() => { const content = window.prompt("Edit message", contextMenu.message.content)?.trim(); if (content) onEdit(contextMenu.message._id, content); setContextMenu(null); }}>
                <Edit3 size={16} />
                Edit
              </button>
              <button type="button" className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50" onClick={() => { onDelete(contextMenu.message._id); setContextMenu(null); }}>
                <Trash2 size={16} />
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}