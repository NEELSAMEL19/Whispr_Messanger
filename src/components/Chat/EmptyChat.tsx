import { LockKeyhole } from "lucide-react";

export default function EmptyChat() {
  return (
    <div className="flex-1 h-screen bg-[#efeae2] relative flex items-center justify-center">
      {/* Subtle WhatsApp background pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20px 20px, #54656f 1.5px, transparent 1.5px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Center Content */}
      <div className="relative flex flex-col items-center text-center -mt-8">
        {/* WhatsApp Logo */}
        <div className="mb-8">
          <div className="w-[160px] h-[160px] rounded-full border-[8px] border-[#d9d3ca] flex items-center justify-center">
            <div className="w-[130px] h-[130px] rounded-full bg-[#25d366] flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-[75px] h-[75px] fill-white">
                <path d="M19.11 17.24c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.92 2.93 4.65 4.11.65.28 1.15.45 1.54.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />
                <path d="M16.03 3C8.83 3 3 8.72 3 15.78c0 2.26.6 4.46 1.73 6.4L3 29l7-1.7a13.2 13.2 0 0 0 6.03 1.44h.01c7.19 0 13.03-5.72 13.03-12.77C29.07 8.72 23.22 3 16.03 3zm0 23.52h-.01c-1.89 0-3.74-.5-5.37-1.44l-.38-.22-4.16 1.01 1.11-4.03-.25-.41a10.5 10.5 0 0 1-1.62-5.65c0-5.86 4.85-10.63 10.81-10.63 2.9 0 5.62 1.11 7.67 3.13a10.46 10.46 0 0 1 3.18 7.5c0 5.86-4.85 10.64-10.98 10.64z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-[32px] font-normal text-[#41525d] mb-3">
          WhatsApp Web
        </h1>

        {/* Description */}
        <p className="text-[14px] text-[#667781] leading-6">
          Send and receive messages without keeping your phone online.
          <br />
          Use WhatsApp on up to 4 linked devices at the same time.
        </p>

        {/* Divider */}
        <div className="w-[420px] h-px bg-[#d1d7db] mt-8 mb-5" />

        {/* Encryption */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#8696a0]">
          <LockKeyhole size={13} strokeWidth={2} />
          <span>End-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
}
