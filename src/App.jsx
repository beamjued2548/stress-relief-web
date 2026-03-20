import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// ⚠️ ให้แน่ใจว่าไฟล์ .env ของคุณมี VITE_GEMINI_KEY=รหัสของคุณ
const apiKey = import.meta.env.VITE_GEMINI_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

function App() {
  const [text, setText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTalkToAi = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    setAiResponse(''); // เคลียร์คำตอบเก่าก่อน

    try {
      // ตรวจสอบว่ามี API Key หรือไม่
      if (!apiKey) {
        setAiResponse("⚠️ ระบบหา API Key ไม่เจอ กรุณาเช็คไฟล์ .env ครับ");
        setIsLoading(false);
        return;
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Prompt ที่สั่งให้ AI เป็นเพื่อนรับฟัง (ตรงนี้สำคัญที่ทำให้มันตอบฉลาด)
      const prompt = `คุณคือเพื่อนสนิทที่คอยรับฟังและให้กำลังใจ ตอนนี้เพื่อนของคุณกำลังระบายความเครียดว่า: "${text}" 
      กรุณาตอบกลับสั้นๆ ไม่เกิน 3 ประโยค ด้วยน้ำเสียงที่อ่อนโยน เห็นอกเห็นใจ และให้กำลังใจ`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      // นำข้อความจาก AI มาแสดงผล
      setAiResponse(response.text());

    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("ขออภัยด้วยนะ ตอนนี้ระบบ AI อาจจะเหนื่อย (Error) แต่เรายังเป็นกำลังใจให้คุณนะ ✌️");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white font-sans">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-sky-400">AI เพื่อนรับฟัง 🤖</h1>
        <p className="text-slate-400">พิมพ์เรื่องที่กังวล แล้วให้ AI ช่วยปลอบใจ</p>
        
        <textarea
          className="w-full h-40 p-4 rounded-2xl bg-slate-800 border-2 border-slate-700 focus:border-sky-500 outline-none resize-none transition-all text-lg text-white"
          placeholder="วันนี้เจอเรื่องหนักๆ อะไรมา เล่าให้ฟังได้นะ..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <button
          onClick={handleTalkToAi}
          disabled={!text || isLoading}
          className="w-full py-4 rounded-full font-bold text-xl bg-sky-600 hover:bg-sky-500 transition-all disabled:bg-slate-700 disabled:text-slate-500"
        >
          {isLoading ? 'กำลังคิดหาคำปลอบใจ...' : 'ส่งให้ AI ฟัง'}
        </button>

        {/* กล่องแสดงคำตอบของ AI */}
        {aiResponse && (
          <div className="mt-6 p-6 rounded-2xl bg-sky-900/40 border border-sky-500/50 text-left">
            <p className="text-sky-300 font-semibold mb-2">เพื่อน AI ตอบว่า:</p>
            <p className="text-sky-100 leading-relaxed whitespace-pre-line">{aiResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;