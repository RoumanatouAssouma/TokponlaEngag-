
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageSquare, Send, X, Mic, Image } from "lucide-react";

const ChatbotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Bonjour ! Je suis l'assistant IA de TokponlaEngagé. Comment puis-je vous aider aujourd'hui ?",
    },
  ]);
  const [input, setInput] = useState("");

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    const newMessages = [
      ...messages,
      { sender: "user", text: input },
    ];
    
    setMessages(newMessages);
    setInput("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: "Je suis une démonstration de l'assistant IA. Dans la version complète, je pourrai vous aider à découvrir des projets, comprendre comment contribuer, et répondre à vos questions sur la plateforme.",
        },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 shadow-lg bg-yellow-600 hover:bg-yellow-800"
        onClick={toggleChatbot}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageSquare size={24} />
        )}
      </Button>

      {/* Chatbot Dialog */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[450px] max-h-[70vh] shadow-xl flex flex-col rounded-xl border border-border overflow-hidden z-50">
          <div className="bg-blue-950 text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageSquare size={16} />
              </div>
              <span className="font-medium">Assistant TokponlaEngagé</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={toggleChatbot}
            >
              <X size={16} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-muted rounded-tl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Mic size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Image size={18} />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="Tapez votre message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 bottom-0 text-tokponla-primary"
                  onClick={handleSendMessage}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatbotAssistant;
