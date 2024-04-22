"use client"

import { useState } from "react";
import ChatInput from "./ChatInput";
import MessageGallery from "./Messagegallery";

type ChatProps = { }
const Chat: React.FC<ChatProps> = () => {
  const [newMessage, setNewMessage] = useState<string>("");
  return (
    <div className="w-full">
      <MessageGallery newMessage={newMessage}/>
      <ChatInput setNewMessage={setNewMessage}/>
    </div>
  );
};

export default Chat;