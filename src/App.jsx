import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [isReleased, setIsReleased] = useState(false);

  const handleRelease = () => {
    if (text.trim() !== '') {
      setIsReleased(true);
      setTimeout(() => {
        setText('');
        setIsReleased(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-6 text-white font-sans">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-emerald-400">ระบายความเครียด 🌿</h1>
        <p className="text-gray-400">พิมพ์สิ่งที่ติดค้างในใจ แล้วกดปุ่มเพื่อปล่อยมันไป</p>
        
        <textarea
          className="w-full h-48 p-4 rounded-2xl bg-neutral-800 border-2 border-neutral-700 focus:border-emerald-500 outline-none resize-none transition-all text-lg text-white"
          placeholder="ระบายตรงนี้..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <button
          onClick={handleRelease}
          disabled={!text || isReleased}
          className={`w-full py-4 rounded-full font-bold text-xl transition-all active:scale-95 ${
            isReleased ? 'bg-emerald-500 scale-90' : 'bg-white text-black hover:bg-emerald-50'
          }`}
        >
          {isReleased ? 'ปล่อยวางแล้ว... ✨' : 'ทิ้งความเครียดลงถัง'}
        </button>
      </div>
    </div>
  );
}

export default App;