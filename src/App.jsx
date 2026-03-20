import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// ⚠️ ใส่ API Key ของคุณตรงนี้
const genAI = new GoogleGenerativeAI("ใส่_API_KEY_ของคุณที่นี่");

function App() {
  const [text, setText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTalkToAi = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `มีคนมาเตรียมระบายความเครียดว่า: "${text}" ในฐานะเพื่อนที่ดี ช่วยตอบกลับสั้นๆ ไม่เกิน 2 ประโยค เพื่อให้กำลังใจและทำให้เขารู้สึกดีขึ้นหน่อยครับ`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setAiResponse(response.text());
    } catch (error) {
      setAiResponse("ขอโทษนะ เหมือนระบบจะขัดข้องนิดหน่อย แต่เรายังเป็นกำลังใจให้คุณเสมอนะ!");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white font-sans">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-sky-400">AI เพื่อนรับฟัง 🤖🌿</h1>
        <p className="text-slate-400">ระบายความเครียดของคุณออกมา แล้วให้ AI ช่วยปลอบใจ</p>
        
        <textarea
          className="w-full h-40 p-4 rounded-2xl bg-slate-800 border-2 border-slate-700 focus:border-sky-500 outline-none resize-none transition-all text-lg"
          placeholder="ช่วงนี้เหนื่อยเรื่องอะไร... เล่าให้เราฟังได้นะ"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <button
          onClick={handleTalkToAi}
          disabled={!text || isLoading}
          className="w-full py-4 rounded-full font-bold text-xl bg-sky-600 hover:bg-sky-500 transition-all disabled:bg-slate-700"
        >
          {isLoading ? 'กำลังรับฟัง...' : 'เล่าให้ AI ฟัง'}
        </button>

        {aiResponse && (
          <div className="mt-6 p-4 rounded-2xl bg-sky-900/30 border border-sky-500/50 animate-fade-in text-sky-100 italic">
            " {aiResponse} "
          </div>
        )}
      </div>
    </div>
  );
}

export default App;