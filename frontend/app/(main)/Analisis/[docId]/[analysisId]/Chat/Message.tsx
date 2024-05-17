type MessageProps = { 
    message: string;
    isUser: boolean;
  }
  const Message: React.FC<MessageProps> = ({
    message,
    isUser,
  }) => {
    return (
      <div className={`w-full inline-flex ${isUser && "justify-end"}`}>
        <div className={`w-2/3 text-[#FCFAF5] px-6 py-4 rounded-[20px] my-3 break-words ${isUser ? "bg-[#5756F5]" : "bg-[#24252E]"}`}>
          {!isUser && 
            <div className="text-[32px] mb-2 flex">
              <div className="mr-3">ARPA-Bot</div>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-robot" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FCFAF5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M6 4m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                <path d="M12 2v2" />
                <path d="M9 12v9" />
                <path d="M15 12v9" />
                <path d="M5 16l4 -2" />
                <path d="M15 14l4 2" />
                <path d="M9 18h6" />
                <path d="M10 8v.01" />
                <path d="M14 8v.01" />
              </svg>
            </div>
          }
          {message}
        </div>
      </div>
    ); 
  };
  
  export default Message;