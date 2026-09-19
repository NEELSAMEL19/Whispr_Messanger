const chats = [
  {
    id: 1,
    name: "John Doe",
    message: "Hey! How are you doing?",
    time: "10:42 AM",
    unread: 2,
    avatar: "JD",
  },
];

export default function ChatList() {
  return (
    <div className="min-h-0 w-full flex-1 overflow-y-auto bg-white">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="flex min-h-[72px] items-center gap-3 px-3
                     cursor-pointer border-b border-gray-100
                     hover:bg-[#f5f6f6]"
        >
          {/* Avatar */}
          <div
            className="w-12 h-12 shrink-0 rounded-full
                          bg-[#dfe5e7] flex items-center
                          justify-center font-semibold text-gray-600"
          >
            {chat.avatar}
          </div>

          {/* Chat Content */}
          <div className="flex-1 min-w-0">
            {/* Name + Time */}
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-[16px] text-gray-900 truncate">
                {chat.name}
              </h3>

              <span className="text-xs text-gray-500">{chat.time}</span>
            </div>

            {/* Message + Unread */}
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-gray-500 truncate">{chat.message}</p>

              {chat.unread && (
                <span
                  className="ml-2 min-w-5 h-5 px-1 rounded-full
                                 bg-[#25d366] text-white text-xs
                                 flex items-center justify-center"
                >
                  {chat.unread}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
