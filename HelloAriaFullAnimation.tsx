import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Chat bubble component
const ChatBubble = ({ sender, text }) => {
  const common = 'max-w-[78%] px-4 py-2 text-sm rounded-2xl shadow-md break-words';
  const botStyle = 'self-start bg-[#303235] text-gray-100 rounded-bl-none';
  const userStyle = 'self-end bg-gradient-to-br from-green-500 to-green-600 text-white rounded-br-none';

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`${common} ${sender === 'aria' ? botStyle : userStyle}`}
    >
      {text}
    </motion.div>
  );
};

// Typing indicator dots
const TypingDots = () => (
  <div className="flex gap-1">
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.24s]" />
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.12s]" />
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
  </div>
);

// Main chat animation component
export default function HelloAriaChatAnimation() {
  const conversation = [
    { sender: 'user', text: "Hey Aria, add 'Finish project report by Thursday'." },
    { sender: 'aria', text: 'Task added! ✅ Would you like me to set a reminder?' },
    { sender: 'user', text: 'Yes, remind me an hour before.' },
    { sender: 'aria', text: 'Reminder set! 🔔 Anything else?' },
    { sender: 'user', text: "Also add 'Call client on Friday at 3 PM'." },
    { sender: 'aria', text: 'Task added! Anything else I can help with?' },
    { sender: 'user', text: "That\'s all, thanks!" },
    { sender: 'aria', text: 'Always here to help you stay organized! 😊' }
  ];

  const [visible, setVisible] = useState([]);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Sequentially display messages with typing delays
  useEffect(() => {
    if (visible.length < conversation.length) {
      const current = conversation[visible.length];
      setTyping(true);
      const delay = current.sender === 'user' ? 1200 : 1800;
      const t = setTimeout(() => {
        setVisible(prev => [...prev, current]);
        setTyping(false);
      }, delay);
      return () => clearTimeout(t);
    }
  }, [visible]);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visible, typing]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* iPhone Frame */}
      <div className="relative w-[360px] h-[680px] bg-black rounded-[48px] shadow-2xl overflow-hidden">
        {/* Bezel */}
        <div className="absolute inset-0 rounded-[42px] border-[10px] border-gray-300 pointer-events-none" />
        {/* Notch */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-3 bg-[#666] rounded-full" />

        {/* Header */}
        <header className="absolute top-16 left-12 right-12 h-12 bg-[#0f0f0f]/90 backdrop-blur-md flex items-center gap-3 px-4 rounded-[18px]">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white ring-2 ring-white">A</div>
          <div className="flex flex-col leading-4">
            <span className="text-white text-sm font-medium">Hello Aria</span>
            <span className="text-[10px] text-gray-400">online</span>
          </div>
        </header>

        {/* Chat area */}
        <main
          className="absolute top-[92px] bottom-[88px] left-0 right-0 flex flex-col gap-3 px-4 py-4 overflow-y-auto"
          style={{ scrollbarWidth: 'none' }}
        >
          {visible.map((msg, i) => (
            <ChatBubble key={i} sender={msg.sender} text={msg.text} />
          ))}
          {typing && (
            <div className="self-end bg-[#2c2c2e] px-3 py-1 rounded-full">
              <TypingDots />
            </div>
          )}
          <div ref={chatEndRef} />
        </main>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 h-20 bg-[#151515]/90 backdrop-blur-md flex items-center gap-3 px-4 rounded-b-[40px]">
          <div className="w-7 h-7 bg-[#2c2c2e] rounded-full flex items-center justify-center text-lg text-gray-300 font-bold">+</div>
          <div className="flex-1 h-10 bg-[#2c2c2e] text-gray-400 rounded-full flex items-center px-5 text-sm">Message…</div>
          <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
          </svg>
        </footer>
      </div>
    </div>
  );
}
