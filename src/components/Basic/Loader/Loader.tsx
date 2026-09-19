import { MessageCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex-1 h-screen flex items-center justify-center bg-[#efeae2]">
      <div className="relative w-[180px] h-[120px]">
        {/* ================================
            ANIMATED WHATSAPP ORB
        ================================= */}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Outer rotating ring */}
          <div className="absolute -inset-5 rounded-full border border-[#25D366]/30 animate-spin-slow">
            <span className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-[#25D366] shadow-[0_0_12px_#25D366]" />
          </div>

          {/* Second ring */}
          <div className="absolute -inset-3 rounded-full border border-white/50 animate-ring" />

          {/* Glow */}
          <div className="absolute -inset-2 rounded-full bg-[#25D366]/25 blur-xl animate-glow" />

          {/* Main orb */}
          <div
            className="
              relative
              w-[72px]
              h-[72px]
              rounded-full
              bg-gradient-to-br
              from-[#43ed83]
              via-[#25D366]
              to-[#119447]
              shadow-[0_10px_35px_rgba(37,211,102,0.4)]
              flex
              items-center
              justify-center
              overflow-hidden
              animate-logo
            "
          >
            {/* Glass highlight */}
            <div
              className="
                absolute
                top-0
                left-0
                w-full
                h-1/2
                bg-gradient-to-b
                from-white/30
                to-transparent
                rounded-full
              "
            />

            {/* Inner circle */}
            <div
              className="
                w-[54px]
                h-[54px]
                rounded-full
                bg-white/10
                border
                border-white/30
                flex
                items-center
                justify-center
                backdrop-blur-sm
              "
            >
              <MessageCircle
                size={32}
                strokeWidth={2.4}
                className="text-white"
              />
            </div>

            {/* Shine */}
            <div
              className="
                absolute
                w-3
                h-3
                bg-white/50
                rounded-full
                top-3
                left-4
                blur-[2px]
              "
            />
          </div>

          {/* Floating particles */}
          <span className="absolute -top-8 left-2 w-1.5 h-1.5 rounded-full bg-[#25D366] animate-particle-1" />

          <span className="absolute -right-8 top-4 w-2 h-2 rounded-full bg-[#25D366] animate-particle-2" />

          <span className="absolute -bottom-7 right-3 w-1.5 h-1.5 rounded-full bg-[#25D366] animate-particle-3" />
        </div>

        {/* ================================
            MESSAGE 1
        ================================= */}

        <div className="absolute left-0 top-[25px] animate-message-1">
          <div className="w-10 h-7 bg-white rounded-[10px] rounded-bl-[3px] shadow-sm flex items-center justify-center">
            <span className="flex gap-1">
              <i />
              <i />
              <i />
            </span>
          </div>
        </div>

        {/* ================================
            MESSAGE 2
        ================================= */}

        <div className="absolute right-0 top-[75px] animate-message-2">
          <div className="w-10 h-7 bg-[#d9fdd3] rounded-[10px] rounded-br-[3px] shadow-sm flex items-center justify-center">
            <span className="flex gap-1">
              <i />
              <i />
              <i />
            </span>
          </div>
        </div>

        {/* ================================
            CONNECTION LINE 1
        ================================= */}

        <div className="absolute left-[35px] top-[50px] w-[45px] h-[2px] bg-[#25D366]/20 overflow-hidden">
          <span className="absolute left-0 top-0 h-full w-4 bg-[#25D366] animate-line" />
        </div>

        {/* ================================
            CONNECTION LINE 2
        ================================= */}

        <div className="absolute right-[35px] top-[68px] w-[45px] h-[2px] bg-[#25D366]/20 rotate-[25deg] overflow-hidden">
          <span className="absolute left-0 top-0 h-full w-4 bg-[#25D366] animate-line-reverse" />
        </div>
      </div>
    </div>
  );
}
