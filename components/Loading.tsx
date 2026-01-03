
import React from 'react';

export const Loading: React.FC = () => {
  const [messageIndex, setMessageIndex] = React.useState(0);
  const messages = [
    "Đang chuẩn bị câu chúc ý nghĩa...",
    "Đang vẽ hình ảnh Tết cổ truyền...",
    "Đang thêu dệt phong vị mùa xuân...",
    "Gần xong rồi, hãy chờ một chút nhé!",
    "Đang tạo ra kiệt tác dành riêng cho bạn..."
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center py-20 animate-pulse">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-red-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-red-700 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl">🧧</span>
        </div>
      </div>
      <p className="text-xl font-traditional text-red-800 font-semibold h-8">
        {messages[messageIndex]}
      </p>
      <div className="mt-12 flex space-x-2">
         <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
         <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
         <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};
