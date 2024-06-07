"use client"

import { useState } from "react";
import ChatInput from "./ChatInput";
import MessageGallery from "./Messagegallery";
import { Doc } from "@/model/document";

type ChatProps = { docId: string | undefined };

const Chat: React.FC<ChatProps> = ({ docId }) => {
  const [newMessage, setNewMessage] = useState<string>("");

  return (
    <div className="w-full">
      <MessageGallery newMessage={newMessage} docId={docId} />
      <ChatInput setNewMessage={setNewMessage} />
    </div>
  );
};

export default Chat;