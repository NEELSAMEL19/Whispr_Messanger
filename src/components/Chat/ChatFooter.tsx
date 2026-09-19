import { Copyright, MessageCircle } from "lucide-react";

export default function ChatFooter() {
  return (
    <footer className="flex min-h-10 shrink-0 items-center justify-center gap-2 border-t border-[#d9dfe2] bg-[#f8f9fa] px-4 py-2 text-[11px] text-[#8696a0]">
      <MessageCircle size={13} className="text-[#00a884]" />
      <span className="font-semibold tracking-wide text-[#54656f]">Whispr</span>
      <span aria-hidden="true">·</span>
      <span className="hidden sm:inline">Simple conversations, close connections</span>
      <span className="sm:hidden">Stay connected</span>
      <span aria-hidden="true">·</span>
      <Copyright size={12} />
      <span>N.s</span>
    </footer>
  );
}