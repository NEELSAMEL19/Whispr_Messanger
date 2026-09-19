import { useEffect, useRef } from "react";

type Message = {
  id: number;
  text: string;
  sender: "me" | "other";
  time: string;
  status?: "sent" | "delivered" | "read";
};

const messages: Message[] = [
  {
    id: 1,
    text: "Hey! How are you doing?",
    sender: "other",
    time: "10:40 AM",
  },
  {
    id: 2,
    text: "I'm doing great! What about you?",
    sender: "me",
    time: "10:41 AM",
    status: "read",
  },
  {
    id: 3,
    text: "I'm good too 😊",
    sender: "other",
    time: "10:42 AM",
  },
  {
    id: 4,
    text: "Are we still meeting today?",
    sender: "other",
    time: "10:43 AM",
  },
  {
    id: 5,
    text: "Yes! Let's meet around 6 PM.",
    sender: "me",
    time: "10:44 AM",
    status: "read",
  },
  {
    id: 6,
    text: "Perfect 👍",
    sender: "other",
    time: "10:45 AM",
  },
];

export default function ChatMessages() {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-0 w-full flex-1 overflow-y-auto bg-[#efeae2] p-3 sm:p-4">
      <div className="flex flex-col gap-2">
        {messages.map((message) => {
          const isMe = message.sender === "me";

          return (
            <div
              key={message.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-[88%] px-3 py-2 shadow-sm sm:max-w-[70%] ${
                  isMe
                    ? "rounded-l-lg rounded-br-lg bg-[#d9fdd3]"
                    : "rounded-r-lg rounded-bl-lg bg-white"
                }`}
              >
                <div className="flex items-end gap-2">
                  <p className="break-words text-[14px] leading-5 text-gray-800">
                    {message.text}
                  </p>

                  <div className="flex shrink-0 items-center gap-1">
                    <span className="text-[10px] text-gray-500">
                      {message.time}
                    </span>

                    {isMe && (
                      <span
                        className={`text-[12px] ${
                          message.status === "read"
                            ? "text-blue-500"
                            : "text-gray-500"
                        }`}
                      >
                        ✓✓
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
