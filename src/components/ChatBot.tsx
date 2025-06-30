import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, CheckCheck, Upload, Download, ExternalLink } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface UserData {
  name: string;
  role: string;
  city: string;
  availability: string;
  whatsapp: string;
  bio: string;
  services: string[];
  photos: File[];
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! 👋 Welcome to OFTN: AgentOS. What's your name?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    role: '',
    city: '',
    availability: '',
    whatsapp: '',
    bio: '',
    services: [],
    photos: []
  });
  const [showCard, setShowCard] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, isBot: boolean = false) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessageWithDelay = (text: string, delay: number = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, true);
    }, delay);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    addMessage(inputValue);
    handleUserInput(inputValue);
    setInputValue('');
  };

  const handleUserInput = (input: string) => {
    const trimmedInput = input.trim();

    switch (step) {
      case 1: // Name
        setUserData(prev => ({ ...prev, name: trimmedInput }));
        addBotMessageWithDelay(`Great! 👍 What's your role? (e.g., student photographer, real estate agent)`);
        setStep(2);
        break;
      
      case 2: // Role
        setUserData(prev => ({ ...prev, role: trimmedInput }));
        addBotMessageWithDelay(`Nice! 📍 Where are you based?`);
        setStep(3);
        break;
      
      case 3: // City
        setUserData(prev => ({ ...prev, city: trimmedInput }));
        addBotMessageWithDelay(`Cool! 🕒 When are you available? (e.g., evenings, 9 AM–5 PM)`);
        setStep(4);
        break;
      
      case 4: // Availability
        setUserData(prev => ({ ...prev, availability: trimmedInput }));
        addBotMessageWithDelay(`Got it! 📱 What's your WhatsApp number?`);
        setStep(5);
        break;
      
      case 5: // WhatsApp
        setUserData(prev => ({ ...prev, whatsapp: trimmedInput }));
        addBotMessageWithDelay(`Perfect! 📝 Tell me about yourself (2–3 sentences about your services).`);
        setStep(6);
        break;
      
      case 6: // Bio
        let refinedBio = trimmedInput;
        if (trimmedInput.toLowerCase().includes('i take photos') || trimmedInput.toLowerCase().includes('photographer')) {
          refinedBio = `Creative ${userData.role.toLowerCase()} capturing vibrant moments in ${userData.city}.`;
          addBotMessageWithDelay(`How about: "${refinedBio}" OK? 👍`, 1000);
          setTimeout(() => {
            addBotMessageWithDelay(`Almost there! 💼 List three skills or services (separated by commas).`, 3000);
          }, 2000);
        } else if (trimmedInput.toLowerCase().includes('sell cars') || trimmedInput.toLowerCase().includes('car dealer')) {
          refinedBio = `Trusted car dealer offering premium vehicles in ${userData.city}.`;
          addBotMessageWithDelay(`How about: "${refinedBio}" OK? 👍`, 1000);
          setTimeout(() => {
            addBotMessageWithDelay(`Almost there! 💼 List three skills or services (separated by commas).`, 3000);
          }, 2000);
        } else {
          addBotMessageWithDelay(`Almost there! 💼 List three skills or services (separated by commas).`);
        }
        setUserData(prev => ({ ...prev, bio: refinedBio }));
        setStep(7);
        break;
      
      case 7: // Services
        const servicesList = trimmedInput.split(',').map(s => s.trim()).filter(s => s);
        setUserData(prev => ({ ...prev, services: servicesList }));
        addBotMessageWithDelay(`Excellent! 📷 Optional: Upload up to 3 photos for your gallery, or type "skip" to continue.`);
        setStep(8);
        break;
      
      case 8: // Photos or Complete
        if (trimmedInput.toLowerCase() === 'skip') {
          generateCard();
        } else {
          addBotMessageWithDelay(`Great! For demo purposes, I'll create your card now. In the real app, you'd upload photos here. 📸`);
          setTimeout(generateCard, 2000);
        }
        break;
    }
  };

  const generateCard = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(`Thanks! Here's your professional card: 🎉`, true);
      setShowCard(true);
      
      setTimeout(() => {
        addMessage(`📱 **Instructions:**\n• Save this card (screenshot)\n• Share in WhatsApp groups\n• Visit your microsite: ${userData.name.toLowerCase().replace(/\s+/g, '')}.agentos.my.id`, true);
      }, 2000);
    }, 2000);
  };

  const generateCardText = () => {
    const username = userData.name.toLowerCase().replace(/\s+/g, '');
    return `🌟 **OFTN: AgentOS Card** 🌟
**${userData.name}**
**Role**: ${userData.role}
📍 **${userData.city}**
🕒 **Availability**: ${userData.availability}
📞 **WhatsApp**: ${userData.whatsapp}
📝 ${userData.bio}
💼 **Services**: ${userData.services.join(', ')}
✅ Visit ${username}.agentos.my.id (Gallery!)`;
  };

  const generateCondensedBio = () => {
    const username = userData.name.toLowerCase().replace(/\s+/g, '');
    return `${userData.name}, ${userData.role} 📍 ${userData.city} 🕒 ${userData.availability} 📞 ${userData.whatsapp} | ${userData.services.join(', ')} 🔗 See gallery at ${username}.agentos.my.id #AgentOSCard`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-lg">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Link to="/" className="hover:bg-green-700 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold">OFTN: AgentOS Bot</h1>
            <p className="text-sm text-green-100">WhatsApp Demo • Online</p>
          </div>
          <a 
            href="https://bolt.new/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img 
              src="/black_circle_360x360.png" 
              alt="Powered by Bolt" 
              className="w-8 h-8"
            />
          </a>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.isBot 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-green-500 text-white'
              }`}>
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {!message.isBot && <CheckCheck className="w-3 h-3 opacity-70" />}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Generated Card */}
          {showCard && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 border-2 border-blue-200 rounded-2xl p-4">
                <div className="text-sm font-mono whitespace-pre-line text-gray-800 mb-4">
                  {generateCardText()}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1 hover:bg-blue-600 transition-colors">
                    <Download className="w-4 h-4" />
                    Save Card
                  </button>
                  <Link 
                    to={`/microsite/${userData.name.toLowerCase().replace(/\s+/g, '')}`}
                    className="flex-1 bg-teal-500 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1 hover:bg-teal-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Site
                  </Link>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Condensed Bio (175 chars):</h4>
                <p className="text-sm text-yellow-700 font-mono">
                  {generateCondensedBio()}
                </p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        {!showCard && (
          <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatBot;