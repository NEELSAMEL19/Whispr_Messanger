import { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  Smile,
  Paperclip,
  Mic,
  Send,
  Image,
  FileText,
  Camera,
  X,
  Square,
  Trash2,
} from "lucide-react";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttach, setShowAttach] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // -------------------------
  // Emoji
  // -------------------------

  const handleEmoji = (emojiData: { emoji: string }) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  // -------------------------
  // File
  // -------------------------

  const openFilePicker = () => {
    fileInputRef.current?.click();
    setShowAttach(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    console.log("Selected file:", file);

    // Upload file to backend/Firebase here.

    // Allow selecting the same file again later.
    event.target.value = "";
  };

  // -------------------------
  // Camera
  // -------------------------

  const openCamera = () => {
    setShowAttach(false);

    // Camera implementation can use:
    // navigator.mediaDevices.getUserMedia({ video: true })
    console.log("Open camera");
  };

  // -------------------------
  // Voice Recording
  // -------------------------

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        alert("Your browser does not support microphone recording.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });

        const url = URL.createObjectURL(blob);

        setAudioUrl(url);

        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      };

      recorder.start();

      setIsRecording(true);
      setShowEmoji(false);
      setShowAttach(false);
    } catch (error) {
      console.error("Microphone error:", error);

      alert(
        "Microphone permission was denied. Please allow microphone access.",
      );
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }

    setIsRecording(false);
  };

  const cancelRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());

    streamRef.current = null;
    mediaRecorderRef.current = null;
    chunksRef.current = [];

    setIsRecording(false);
    setAudioUrl(null);
  };

  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    setAudioUrl(null);
  };

  const sendVoiceMessage = () => {
    if (!audioUrl) return;

    console.log("Sending voice message:", audioUrl);

    // Upload audio blob to backend/Firebase here.

    URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
  };

  // -------------------------
  // Send Text Message
  // -------------------------

  const sendMessage = () => {
    const text = message.trim();

    if (!text) return;

    console.log("Sending:", text);

    // Send message to backend/Firebase here.

    setMessage("");
    setShowEmoji(false);
  };

  // -------------------------
  // Enter Key
  // -------------------------

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="relative w-full shrink-0 bg-[#f0f2f5] px-2 py-2 sm:px-4 sm:py-2.5">
      {/* =========================
          Emoji Picker
      ========================= */}

      {showEmoji && (
        <div className="absolute bottom-[65px] left-3 z-50">
          <EmojiPicker onEmojiClick={handleEmoji} height={400} width={350} />
        </div>
      )}

      {/* =========================
          Attachment Menu
      ========================= */}

      {showAttach && (
        <div className="absolute bottom-[65px] left-12 z-50 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-xl">
          {/* Photos / Videos */}

          <button
            type="button"
            onClick={openFilePicker}
            className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900"
          >
            <Image size={20} />
            Photos & videos
          </button>

          {/* Documents */}

          <button
            type="button"
            onClick={openFilePicker}
            className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900"
          >
            <FileText size={20} />
            Documents
          </button>

          {/* Camera */}

          <button
            type="button"
            onClick={openCamera}
            className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900"
          >
            <Camera size={20} />
            Camera
          </button>
        </div>
      )}

      {/* Hidden File Input */}

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*,video/*,.pdf,.doc,.docx,.txt"
        onChange={handleFileChange}
      />

      {/* =========================
          Recording UI
      ========================= */}

      {isRecording ? (
        <div className="flex h-[52px] items-center gap-3">
          {/* Stop */}

          <button
            type="button"
            onClick={stopRecording}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] hover:bg-[#e9edef]"
            aria-label="Stop recording"
          >
            <Square size={20} />
          </button>

          {/* Recording Status */}

          <div className="flex flex-1 items-center gap-3 rounded-lg bg-white px-4">
            <span className="animate-pulse text-red-500">●</span>

            <span className="text-sm text-[#54656f]">Recording...</span>
          </div>

          {/* Delete / Cancel */}

          <button
            type="button"
            onClick={cancelRecording}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] hover:bg-[#e9edef]"
            aria-label="Cancel recording"
          >
            <Trash2 size={21} />
          </button>
        </div>
      ) : audioUrl ? (
        /* =========================
           Audio Preview
        ========================= */

        <div className="flex h-[52px] items-center gap-3">
          {/* Delete */}

          <button
            type="button"
            onClick={deleteRecording}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] hover:bg-[#e9edef]"
            aria-label="Delete recording"
          >
            <X size={22} />
          </button>

          {/* Audio */}

          <audio src={audioUrl} controls className="h-10 flex-1" />

          {/* Send Voice */}

          <button
            type="button"
            onClick={sendVoiceMessage}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00a884] text-white"
            aria-label="Send voice message"
          >
            <Send size={19} />
          </button>
        </div>
      ) : (
        /* =========================
           Normal Input
        ========================= */

        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          {/* Emoji */}

          <button
            type="button"
            onClick={() => {
              setShowEmoji((prev) => !prev);
              setShowAttach(false);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] hover:bg-[#e9edef]"
            aria-label="Emoji"
          >
            <Smile size={25} strokeWidth={1.8} />
          </button>

          {/* Attachment */}

          <button
            type="button"
            onClick={() => {
              setShowAttach((prev) => !prev);
              setShowEmoji(false);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] hover:bg-[#e9edef]"
            aria-label="Attach"
          >
            <Paperclip size={23} strokeWidth={1.8} />
          </button>

          {/* Message Input */}

          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Type a message"
            className="
              h-[42px]
              flex-1
              min-w-0
              rounded-lg
              border-none
              bg-white
              px-4
              text-[15px]
              text-[#111b21]
              outline-none
              placeholder:text-[#667781]
            "
          />

          {/* Send / Mic */}

          {message.trim() ? (
            <button
              type="button"
              onClick={sendMessage}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] hover:bg-[#e9edef]"
              aria-label="Send"
            >
              <Send size={23} strokeWidth={1.8} />
            </button>
          ) : (
            <button
              type="button"
              onClick={startRecording}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#54656f] hover:bg-[#e9edef]"
              aria-label="Voice message"
            >
              <Mic size={23} strokeWidth={1.8} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
