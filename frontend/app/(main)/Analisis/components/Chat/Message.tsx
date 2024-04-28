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
        <div className={`w-full text-white px-4
        py-1 rounded-[20px]
        ${isUser && "bg-[#5756F5] !w-2/3"}`}>
          {!isUser && 
            <div className="text-[32px] mb-4">
              ARPA-Bot
            </div>
          }
          {message}
        </div>
      </div>
    ); 
  };
  
  export default Message;