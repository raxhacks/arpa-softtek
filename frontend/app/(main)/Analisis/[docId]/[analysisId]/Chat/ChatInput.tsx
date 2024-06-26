"use client"

import { useState } from "react";

type SendMessageButtonProps = {
  handleSendMessage: () => void;
}
const SendMessageButton: React.FC<SendMessageButtonProps> = ({
  handleSendMessage
}) => {
  return (
    <button title="send" className="w-[8vh] h-[8vh] bg-[#5756F5] px-[1vh] py-[1vh] rounded-[10px] ml-[2vh] mt-5 flex justify-center
    items-center hover:bg-[#FCFAF5]" onClick={handleSendMessage} data-cy="chatbot-boton" >
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-big-right-line" width="100" height="100" viewBox="0 0 24 24" stroke-width="1.5" stroke="#24252E" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-6v-6h6z" />
        <path d="M3 9v6" />
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
    <div className="flex inline items-center">
      <div className="w-full rounded-[20px] h-[8vh]
      border-[3px] border-[#5756F5] text-white
      inline-flex items-center px-5 mt-5">
        <input type="text" placeholder="Ingresa aquí tu pregunta" 
        className="w-full h-full bg-transparent outline-none
        border-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        data-cy="chatbot-input"/>
      </div>
      <SendMessageButton handleSendMessage={handleSendMessage}/>
    </div>
    
  );
};

export default ChatInput;