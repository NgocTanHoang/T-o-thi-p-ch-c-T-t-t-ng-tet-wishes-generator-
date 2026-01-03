
import React from 'react';
import { UserInput, GeneratedContent, AppStep } from './types';
import { generateTetGreeting, generateTetImage } from './services/geminiService';
import { InputForm } from './components/InputForm';
import { PreviewCard } from './components/PreviewCard';
import { Loading } from './components/Loading';

const App: React.FC = () => {
  const [step, setStep] = React.useState<AppStep>('INPUT');
  const [generatedData, setGeneratedData] = React.useState<GeneratedContent | null>(null);
  const [userInput, setUserInput] = React.useState<UserInput | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleGenerate = async (input: UserInput) => {
    setUserInput(input);
    setStep('GENERATING');
    setError(null);

    try {
      const [greeting, imageUrl] = await Promise.all([
        generateTetGreeting(input),
        generateTetImage(input)
      ]);

      setGeneratedData({ greeting, imageUrl });
      setStep('PREVIEW');
    } catch (err) {
      console.error(err);
      setError("Rất tiếc, đã có lỗi xảy ra trong quá trình sáng tạo. Vui lòng thử lại!");
      setStep('INPUT');
    }
  };

  const handleReset = () => {
    setGeneratedData(null);
    setStep('INPUT');
  };

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8">
      {/* Decorative Header */}
      <header className="pt-10 pb-16 text-center">
        <div className="inline-block bg-red-700 text-white px-8 py-3 rounded-full mb-6 shadow-xl border-2 border-yellow-400">
          <span className="text-2xl font-traditional tracking-widest font-bold">TẾT VIỆT NĂM NAY</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-calligraphy text-red-900 font-bold mb-4">
          Sáng Tạo Thiệp Xuân
        </h1>
        <div className="flex justify-center items-center space-x-4 text-red-800 opacity-80 italic">
          <span className="h-px w-12 bg-red-200"></span>
          <span>Mang bản sắc Việt vào từng lời chúc</span>
          <span className="h-px w-12 bg-red-200"></span>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-center">
            {error}
          </div>
        )}

        {step === 'INPUT' && (
          <InputForm onSubmit={handleGenerate} />
        )}

        {step === 'GENERATING' && (
          <Loading />
        )}

        {step === 'PREVIEW' && generatedData && userInput && (
          <PreviewCard 
            content={generatedData} 
            style={userInput.style} 
            onReset={handleReset} 
          />
        )}
      </main>

      {/* Decorative Footer */}
      <footer className="fixed bottom-0 left-0 w-full p-6 text-center pointer-events-none opacity-40">
        <div className="flex justify-between items-end container mx-auto px-4">
           <img src="https://picsum.photos/id/111/100/100" className="w-16 h-16 opacity-10 filter grayscale" alt="" />
           <p className="text-red-900 font-traditional text-sm">© 2024 Tết Việt AI - Gói trọn yêu thương</p>
           <img src="https://picsum.photos/id/112/100/100" className="w-16 h-16 opacity-10 filter grayscale" alt="" />
        </div>
      </footer>
    </div>
  );
};

export default App;
