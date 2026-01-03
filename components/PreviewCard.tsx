
import React from 'react';
import { GeneratedContent, Style } from '../types';
import * as htmlToImage from 'html-to-image';

interface PreviewCardProps {
  content: GeneratedContent;
  style: Style;
  onReset: () => void;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({ content, style, onReset }) => {
  const [layout, setLayout] = React.useState<'overlay' | 'stack'>('overlay');
  const [isExporting, setIsExporting] = React.useState(false);

  const textFontClass = style === Style.Calligraphy ? 'font-calligraphy text-2xl md:text-4xl' : 
                       style === Style.Formal ? 'font-serif-vi text-xl md:text-2xl italic' :
                       'font-traditional text-xl md:text-3xl font-semibold';

  const handleDownload = async () => {
    const node = document.getElementById('capture-area');
    if (!node || isExporting) return;

    try {
      setIsExporting(true);
      // Đợi một chút để đảm bảo font chữ và ảnh đã render xong hoàn toàn
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const dataUrl = await htmlToImage.toPng(node, {
        quality: 1,
        pixelRatio: 2, // Tăng chất lượng ảnh lên 2x cho sắc nét
        backgroundColor: '#ffffff'
      });

      const link = document.createElement('a');
      link.download = `thiep-tet-viet-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Lỗi khi xuất ảnh:', error);
      alert('Có lỗi xảy ra khi lưu ảnh. Vui lòng thử lại hoặc chụp màn hình.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <button 
          onClick={() => setLayout('overlay')}
          className={`px-6 py-2 rounded-full border-2 transition-all ${layout === 'overlay' ? 'bg-red-700 text-white border-red-700 shadow-md' : 'bg-white text-red-800 border-red-200'}`}
        >
          Chữ trên ảnh
        </button>
        <button 
          onClick={() => setLayout('stack')}
          className={`px-6 py-2 rounded-full border-2 transition-all ${layout === 'stack' ? 'bg-red-700 text-white border-red-700 shadow-md' : 'bg-white text-red-800 border-red-200'}`}
        >
          Ảnh và Chữ riêng
        </button>
      </div>

      <div className="bg-white p-4 md:p-8 rounded-3xl shadow-2xl border-8 border-double border-red-100 overflow-hidden">
        <div id="capture-area" className="bg-white">
          {layout === 'overlay' ? (
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-inner group">
              <img 
                src={content.imageUrl} 
                alt="Tet background" 
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-8 md:p-12 text-center">
                <div className={`text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-relaxed whitespace-pre-line ${textFontClass}`}>
                  {content.greeting}
                </div>
              </div>
              {/* Decoration Corners */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-yellow-400 opacity-80" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-yellow-400 opacity-80" />
            </div>
          ) : (
            <div className="space-y-8 flex flex-col items-center p-4">
               <div className="w-full aspect-[4/3] max-w-lg rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={content.imageUrl} 
                    alt="Tet background" 
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
               </div>
               <div className="text-center px-4 py-8 bg-red-50/50 rounded-2xl border border-red-100 w-full">
                  <div className={`text-red-900 leading-relaxed whitespace-pre-line ${textFontClass}`}>
                    {content.greeting}
                  </div>
                  <div className="mt-6 flex justify-center space-x-2">
                    <div className="h-1 w-12 bg-red-300 rounded-full" />
                    <div className="h-1 w-4 bg-red-400 rounded-full" />
                    <div className="h-1 w-12 bg-red-300 rounded-full" />
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className={`flex-1 max-w-xs ${isExporting ? 'bg-gray-400' : 'bg-red-700 hover:bg-red-800'} text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2`}
        >
          {isExporting ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          )}
          <span>{isExporting ? 'Đang lưu...' : 'Lưu Thiệp (PNG)'}</span>
        </button>
        <button
          onClick={onReset}
          className="flex-1 max-w-xs bg-white hover:bg-gray-50 text-red-700 border-2 border-red-700 font-bold py-3 rounded-xl transition-all"
        >
          Tạo Thiệp Mới
        </button>
      </div>
      
      <p className="text-center text-sm text-gray-500 italic">
        Mẹo: Bạn có thể chọn chế độ hiển thị phù hợp trước khi nhấn Lưu để có tấm thiệp ưng ý nhất.
      </p>
    </div>
  );
};
