"use client"

import { MessageStruct } from "@/model/message";
import Message from "./Message";
import { useEffect, useState } from "react";

type MessageGalleryProps = {
  newMessage: string;
}
const MessageGallery: React.FC<MessageGalleryProps> = ({
  newMessage
}) => {
  const prop_messages = [
    {
      prompt: "En el artículo se menciona la concentración de ozono, pero, ¿Cómo se mide?",
      response: 'Las concentraciones de ozono en la atmósfera se suelen medir en términos de "ppmv" (partes por millón en volumen). La concentración de ozono estratosférico (en la capa de ozono) es mucho menor que la de la troposfera (la capa más baja de la atmósfera, donde ocurre la mayor parte del clima). En la estratosfera, el ozono suele medirse en "DU" (unidades Dobson), que es una medida de la cantidad total de ozono en una columna vertical de la atmósfera que se extiende desde la superficie terrestre hasta el límite superior de la atmósfera.'
    }
  ]
  const [messages, setMessages] = useState<MessageStruct[]>(prop_messages);

  useEffect(() => {
    console.log(newMessage)
    if (newMessage) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          prompt: newMessage,
          response: "No se la respuesta a tu pregunta"
        }
      ]);
    }
  }, [newMessage]);

  return (
    <div className="w-full">
      <h1>MessageGallery</h1>
      {messages.map((message, index) => (
        <>
          <Message key={index} message={message.prompt} isUser={true}/>
          <Message key={100+index} message={message.response} isUser={false}/>
        </>
      ))}
    </div>
  );
};

export default MessageGallery;