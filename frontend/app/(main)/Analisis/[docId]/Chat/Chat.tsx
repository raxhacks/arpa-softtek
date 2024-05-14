"use client"

import { useState } from "react";
import ChatInput from "./ChatInput";
import MessageGallery from "./Messagegallery";

type ChatProps = {docId: string | (string | null)[] }
const Chat: React.FC<ChatProps> = ({docId}) => {
  const [newMessage, setNewMessage] = useState<string>("");
  return (
    <div className="w-full">
      <MessageGallery newMessage={newMessage} docId={docId}/>
      <ChatInput setNewMessage={setNewMessage}/>
    </div>
  );
};

export default Chat;