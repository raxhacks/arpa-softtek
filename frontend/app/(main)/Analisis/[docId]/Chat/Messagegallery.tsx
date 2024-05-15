"use client"

import { MessageStruct } from "@/model/message";
import Message from "./Message";
import { useEffect, useState, useRef } from "react";
import { Bounce } from "react-awesome-reveal";
import { getChat } from "@/services/chat.service";
import { sendMessage } from "@/services/chat.service";
import queryString from 'query-string';



type MessageGalleryProps = {
  newMessage: string;
  docId: string | (string | null)[];
}

const MessageGallery: React.FC<MessageGalleryProps> = ({newMessage, docId}) => {
  const prop_messages = [
    {
      prompt: "En el artículo se menciona la concentración de ozono, pero, ¿Cómo se mide?",
      response: 'Las concentraciones de ozono en la atmósfera se suelen medir en términos de "ppmv" (partes por millón en volumen). La concentración de ozono estratosférico (en la capa de ozono) es mucho menor que la de la troposfera (la capa más baja de la atmósfera, donde ocurre la mayor parte del clima). En la estratosfera, el ozono suele medirse en "DU" (unidades Dobson), que es una medida de la cantidad total de ozono en una columna vertical de la atmósfera que se extiende desde la superficie terrestre hasta el límite superior de la atmósfera.'
    }
  ]
  const [messages, setMessages] = useState<MessageStruct[]>(prop_messages);
  const url = window.location.href;
  // Parsear el query
  const parsedURL = queryString.parseUrl(url);
  // Obtener el valor del parámetro "id"
  const scroller = useRef(null);
  console.log(newMessage);

  useEffect(() => {
    console.log('entre')
    console.log(docId)
    if (newMessage && docId) {
      console.log(newMessage);
      (async () => {
        const response = await sendMessage(docId, newMessage)
//        await getChat(docId)
        if (response){
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              prompt: newMessage,
              response: response
            }
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              prompt: newMessage,
              response: 'Ha ocurido un error'
            }
          ]);
        }
        
      })();
    }
  }, [newMessage]);

  // useEffect(() => {
  //   if(scroller) {
  //     scroller.current.addEventListener('DOMNodeInserted', (event: { currentTarget: any; }) => {
  //       const { currentTarget: target } = event;
  //       target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
  //     });
  //   }
  // }, [])

  return (
    <div className="w-full h-[47vh] pr-[1vw] overflow-y-scroll overflow-x-hidden md:h-[55vh]" ref={scroller}>
      {/*<h1>MessageGallery</h1>*/}
      {messages.map((message, index) => (
        <>
          <Bounce duration={300} triggerOnce={true}>
            <Message key={index} message={message.prompt} isUser={true}/>
          </Bounce>
          <Bounce duration={300} triggerOnce={true}>
            <Message key={100+index} message={message.response} isUser={false}/>
          </Bounce>
        </>
      ))}
    </div>
  );
};

export default MessageGallery;