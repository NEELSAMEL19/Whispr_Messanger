import { ArrowLeft, Video, Phone, MoreVertical } from "lucide-react";

export default function ChatHeader() {
  const contact = {
    name: "John Doe",
    phone: "+91 98765 43210",
    isSaved: true,
    online: true,
  };

  return (
    <div className="flex h-16 shrink-0 items-center gap-2 border-b bg-[#f0f2f5] px-2 sm:gap-3 sm:px-3">
      {/* Back */}
      <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200">
        <ArrowLeft size={22} />
      </button>

      {/* Avatar */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 font-semibold text-white">
        {contact.isSaved
          ? contact.name
              .split(" ")
              .map((word) => word[0])
              .join("")
          : "?"}
      </div>

      {/* Contact Info */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-[16px] text-gray-900 truncate">
          {contact.isSaved ? contact.name : contact.phone}
        </div>

        <div className="text-xs text-gray-500">
          {contact.online ? "online" : "last seen recently"}
        </div>
      </div>

      {/* Actions */}
      <button className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 sm:flex">
        <Video size={21} />
      </button>

      <button className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 sm:flex">
        <Phone size={20} />
      </button>

      <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200">
        <MoreVertical size={21} />
      </button>
    </div>
  );
}
