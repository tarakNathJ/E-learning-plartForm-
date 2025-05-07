
import React from "react";
import { File, FileAudio } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: "text" | "file" | "audio";
  fileUrl?: string;
  fileName?: string;
}

interface MessageBubbleProps {
  message: Message;
  isAdmin: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isAdmin }) => {
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case "text":
        return <p className="text-sm">{message.content}</p>;
      
      case "file":
        return (
          <a 
            href={message.fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-green-50 p-3 rounded-md hover:bg-green-100"
          >
            <File className="h-5 w-5 text-green-600" />
            <span className="flex-grow truncate text-sm">{message.fileName}</span>
          </a>
        );
      
      case "audio":
        return (
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <FileAudio className="h-5 w-5 text-green-600" />
              <span className="text-sm">{message.fileName}</span>
            </div>
            <audio controls className="w-full h-10">
              <source src={message.fileUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      
      default:
        return <p className="text-sm">Unsupported message type</p>;
    }
  };

  return (
    <div className="flex items-start space-x-2">
      {!isAdmin && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-green-600 text-white text-xs">
            {getInitials(message.sender)}
          </AvatarFallback>
        </Avatar>
      )}
      <div className={`flex flex-col space-y-1 max-w-[80%] ${isAdmin ? "ml-auto" : ""}`}>
        <div className={`flex items-center space-x-2 ${isAdmin ? "justify-end" : ""}`}>
          <span className="font-medium text-xs text-gray-800">{!isAdmin && message.sender}</span>
          <span className="text-[10px] text-gray-500">{message.timestamp}</span>
        </div>
        <div 
          className={`rounded-lg p-2 shadow-sm ${
            isAdmin 
              ? "bg-green-100 rounded-tr-none" 
              : "bg-white rounded-tl-none border border-gray-100"
          }`}
        >
          {renderMessageContent()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
