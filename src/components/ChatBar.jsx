import React, { useRef, useEffect } from 'react';
import { useChat } from './ChatContext';

const ChatBar = () => {
  const {
    showChatBar,
    setShowChatBar,
    roomNumber,
    chatMessages,
    messageInput,
    setMessageInput,
    handleSendMessage
  } = useChat();

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Handle Enter key to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!showChatBar) return null;

  return (
    <aside className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 backdrop-blur-xl shadow-2xl border border-white/20 w-full sm:w-80 lg:w-96 h-screen sm:h-[calc(100vh-56px)] fixed top-0 sm:top-[56px] left-0 z-50 flex flex-col transition-all duration-500 ease-in-out transform animate-slide-in">
      {/* Modern Chat Header with Exit Button */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-xl flex-shrink-0 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-white/10 opacity-20">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full animate-float"></div>
          <div className="absolute top-1/2 -left-8 w-16 h-16 bg-white/10 rounded-full animate-float-delayed"></div>
        </div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-lg">
              <span className="text-2xl animate-bounce">💬</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-bold text-white truncate flex items-center">
                Chat with Friends
                <span className="ml-2 text-yellow-300 animate-pulse">✨</span>
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse absolute"></div>
                <p className="text-sm text-white/90 truncate ml-2">
                  Room: <span className="font-bold text-yellow-300">{roomNumber}</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Modern Exit Button */}
          <button 
            onClick={() => setShowChatBar(false)}
            className="w-10 h-10 bg-red-500/90 hover:bg-red-600 text-white rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-white/50"
            title="Close Chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Enhanced Welcome Message for Empty Chat */}
      {chatMessages.length === 0 && (
        <div className="p-6 text-center flex-shrink-0 animate-fade-in-up">
          <div className="relative">
            <div className="text-6xl mb-4 animate-bounce-gentle">🎉</div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-r from-yellow-300/30 to-pink-300/30 rounded-full animate-pulse"></div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
            <h4 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome to Chat! 🚀
            </h4>
           
            <div className="flex justify-center space-x-2 mt-3">
              {['🌟', '💫', '✨'].map((star, i) => (
                <span key={i} className="text-lg animate-twinkle" style={{animationDelay: `${i * 0.3}s`}}>
                  {star}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modern Chat Messages with Enhanced Design */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-32 h-32 bg-purple-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-8 left-8 w-24 h-24 bg-pink-300 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative z-10 space-y-4">
          {chatMessages.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'} animate-message-appear`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] p-4 rounded-3xl text-sm shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden ${
                  msg.sender === 'you'
                    ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-br-lg'
                    : 'bg-white/90 backdrop-blur-sm text-gray-800 border-2 border-purple-100 rounded-bl-lg'
                }`}
              >
                {/* Subtle shimmer effect for user messages */}
                {msg.sender === 'you' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                )}
                
                {/* Enhanced message sender indicator */}
                {msg.sender !== 'you' && (
                  <div className="text-xs text-purple-600 font-semibold mb-2 flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Learning Buddy
                    </span>
                  </div>
                )}
                
                <p className="leading-relaxed break-words relative z-10">{msg.text}</p>
                
                <div className={`text-xs mt-2 opacity-75 ${
                  msg.sender === 'you' ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Modern Input Section with Enhanced UX */}
      <div className="p-4 bg-white/70 backdrop-blur-xl border-t-2 border-gradient-to-r from-purple-200 to-pink-200 flex-shrink-0 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-pink-50/50"></div>
        
        <div className="relative z-10">
          {/* Enhanced Emoji Quick Reactions */}
          <div className="flex space-x-2 mb-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
            {['👍', '😊', '🎉', '❤️', '😮', '🤔', '🌟', '🚀'].map((emoji, index) => (
              <button
                key={emoji}
                onClick={() => setMessageInput(prev => prev + emoji)}
                className="text-2xl p-3 bg-gradient-to-br from-white to-gray-50 hover:from-purple-50 hover:to-pink-50 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-md hover:shadow-lg border border-purple-100 flex-shrink-0 min-w-[3rem]"
                title={`Add ${emoji} to message`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <span className="animate-bounce-subtle">{emoji}</span>
              </button>
            ))}
          </div>
          
          <div className="relative">
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-purple-200/50 transition-all duration-300 focus-within:border-purple-400 focus-within:shadow-xl">
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="write your message..."
                className="w-full p-4 pr-16 border-none rounded-2xl resize-none h-20 text-sm bg-transparent focus:outline-none placeholder-gray-400 transition-all duration-300"
                maxLength={200}
              />
              
              {/* Modern character count */}
              <div className={`absolute bottom-2 right-16 text-xs transition-colors duration-300 ${
                messageInput.length > 180 ? 'text-red-500 font-bold' : 
                messageInput.length > 150 ? 'text-yellow-600' : 'text-gray-400'
              }`}>
                {messageInput.length}/200
              </div>
              
              {/* Enhanced floating send button */}
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className={`absolute bottom-2 right-2 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 transform ${
                  messageInput.trim()
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-xl animate-pulse-gentle'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                title="Send message"
              >
                <svg className="w-4 h-4 transform rotate-45" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
            
            
          </div>
        </div>
      </div>
      
      {/* Enhanced Custom Styles for Modern Animations */}
      <style jsx>{`
        /* Modern slide-in animation for chat bar */
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        
        /* Enhanced message animations */
        @keyframes message-appear {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-message-appear {
          animation: message-appear 0.4s ease-out;
        }
        
        /* Floating animations for header elements */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        /* Gentle animations for autism-friendly design */
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-2px); }
          75% { transform: translateY(-1px); }
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        /* Twinkle animation for stars */
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .animate-twinkle {
          animation: twinkle 1.5s ease-in-out infinite;
        }
        
        /* Shimmer effect */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        /* Fade in up animation */
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        /* Slow spin for decorative elements */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        /* Enhanced scrollbar */
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #ec4899);
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333ea, #db2777);
        }
        
        /* Accessibility and reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Enhanced focus styles for accessibility */
        button:focus-visible {
          outline: 2px solid #a855f7;
          outline-offset: 2px;
          box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1);
        }
        
        textarea:focus-visible {
          outline: 2px solid #a855f7;
          outline-offset: 2px;
          box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1);
        }
        
        /* Smooth hover effects */
        .transition-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Gradient border animation */
        @keyframes gradient-border {
          0% { border-image-source: linear-gradient(45deg, #a855f7, #ec4899, #f59e0b); }
          33% { border-image-source: linear-gradient(45deg, #ec4899, #f59e0b, #a855f7); }
          66% { border-image-source: linear-gradient(45deg, #f59e0b, #a855f7, #ec4899); }
          100% { border-image-source: linear-gradient(45deg, #a855f7, #ec4899, #f59e0b); }
        }
      `}</style>
    </aside>
  );
};

export default ChatBar;