"use client"

import { useState } from "react";

type SendMessageButtonProps = {
  handleSendMessage: () => void;
}
const SendMessageButton: React.FC<SendMessageButtonProps> = ({
  handleSendMessage
}) => {
  return (
    <button title="send" className="w-[50px] h-[50px]
    bg-[#5756F5] rounded-lg" onClick={handleSendMessage}>

    </button>
  );
};

type ChatInputProps = {
  setNewMessage: (message: string) => void;
}
const ChatInput: React.FC<ChatInputProps> = ({
  setNewMessage
}) => {
  const [message, setMessage] = useState<string>("");
  const handleSendMessage = () => {
    setNewMessage(message);
    setMessage("");
  }
  return (
    <div className="w-full rounded-[20px] h-[70px]
     border-[3px] border-[#5756F5] text-white
     inline-flex items-center px-3">
      <input type="text" placeholder="Ingresar la pregunta" 
      className="w-full h-full bg-transparent outline-none
      border-none"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      />
      <SendMessageButton handleSendMessage={handleSendMessage}/>
    </div>
  );
};

export default ChatInput;