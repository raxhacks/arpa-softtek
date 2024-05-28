"use client"

import Message from "./Message";
import { useEffect, useState, useRef } from "react";
import { Bounce } from "react-awesome-reveal";
import { getChat } from "@/services/chat.service";
import { sendMessage } from "@/services/chat.service";



type MessageGalleryProps = {
  newMessage: string;
  docId: string | undefined;
}

const MessageGallery: React.FC<MessageGalleryProps> = ({newMessage, docId}) => {
  const [messages, setMessages] = useState<any[]>([]);
  const scroller = useRef<HTMLDivElement>(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    (async () =>{
      const response = await getChat(docId);
      setloading(false);
      setMessages(response);
    })()
  },[docId])

  useEffect(() => {
    if (newMessage && docId) {
      setMessages((prevMessages:any) => [...prevMessages, { prompt: newMessage }]);
      (async () => {
        const loadingmessage = setMessages((prevMessages:any) => [
          ...prevMessages,
          {
            response: "..."
          }
        ]);

        const response = await sendMessage(docId, newMessage)
        if (response){

          setMessages((prevMessages) => {
            if (prevMessages.length === 0) {
              // Si no hay mensajes, simplemente agregamos el nuevo mensaje
              return [{ response }];
            } else {
              // Crear una copia del array de mensajes
              const updatedMessages = [...prevMessages];
      
              // Reemplazar el último mensaje
              updatedMessages[updatedMessages.length - 1] = { response };
      
              return updatedMessages;
            }
          });
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              response: 'Ha ocurrido un error, por favor contacte al administrador'
            }
          ]);
        }
      })();
    }
  }, [newMessage]);

  useEffect(() => {
    if(scroller.current != null && scroller) {
      scroller.current.addEventListener('DOMNodeInserted', (event: { currentTarget: any; }) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

  return (
    <div className="w-full h-[55vh] pr-[1vw] overflow-y-scroll overflow-x-hidden md:h-[55vh]" ref={scroller}>
      {loading ? (
        <div className='flex justify-center items-center pt-44'>
          <div>
            <svg className="animate-spin h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </div>
        </div>
      ) : messages.length == 0 ? (
        <div></div>
      ) : (
        <div>
          {messages.map((message, index) => (
            <>
              <Bounce duration={300} triggerOnce={true}>
                {message.prompt && <Message key={index} message={message.prompt} isUser={true} />}
              </Bounce>
              <Bounce duration={300} triggerOnce={true}>
                  {message.response && <Message key={100 + index} message={message.response} isUser={false} />}
              </Bounce>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageGallery;