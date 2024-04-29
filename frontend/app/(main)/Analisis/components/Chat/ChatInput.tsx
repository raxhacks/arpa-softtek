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
    bg-[#5756F5] rounded-lg flex justify-center items-center" onClick={handleSendMessage}>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send-2" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#24252E" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
        <path d="M6.5 12h14.5" />
      </svg>
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
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  return (
    <div className="w-full rounded-[20px] h-[70px]
     border-[3px] border-[#5756F5] text-white
     inline-flex items-center px-5 my-5">
      <input type="text" placeholder="Ingresa aquí tu pregunta" 
      className="w-full h-full bg-transparent outline-none
      border-none"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleKeyPress}
      />
      <SendMessageButton handleSendMessage={handleSendMessage}/>
    </div>
  );
};

export default ChatInput;