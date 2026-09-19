import { LogOut, MessageCircle } from "lucide-react";
import { logout } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const ChatListHeader = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "W";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#d9dfe2] bg-[#f0f2f5] px-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-white">
          <MessageCircle size={20} strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <p className="text-base font-semibold tracking-tight text-[#111b21]">Whispr</p>
          {user?.name && <p className="truncate text-xs text-[#667781]">{user.name}</p>}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d9fdd3] text-xs font-semibold text-[#087f5b]" aria-label={user?.name ?? "User"}>
          {initials}
        </span>
        <button
          type="button"
          onClick={() => void dispatch(logout())}
          className="flex h-9 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-[#54656f] transition-colors hover:bg-[#e2e6e8] hover:text-[#111b21]"
          aria-label="Log out"
          title="Log out"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default ChatListHeader;
