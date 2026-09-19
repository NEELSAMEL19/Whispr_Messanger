import { Search } from "lucide-react";

export default function ChatSearch() {
  return (
    <div className="w-full shrink-0 bg-white p-3 sm:p-4">
      <div className="flex h-10 items-center gap-3 rounded-lg bg-[#f0f2f5] px-3">
        <Search size={18} className="text-gray-500" />

        <input
          type="text"
          placeholder="Search or start new chat"
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>
    </div>
  );
}
