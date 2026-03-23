import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});

const MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",    
  "gemma2-9b-it"          
];

let currentModelIndex = 0;

export async function sendMsgToGroq(messages) {
  if (!process.env.REACT_APP_GROQ_API_KEY) {
    return "❌ مفتاح Groq غير موجود. يرجى إضافته في ملف .env";
  }

  async function tryWithModel(model) {
    try {
      const response = await groq.chat.completions.create({
        messages: messages,    
        model: model,          
        temperature: 0.7,      
        max_tokens: 500,       
      });

      return { success: true, data: response.choices[0]?.message?.content };
    } catch (error) {
      return { success: false, error };
    }
  }

  for (let i = 0; i < MODELS.length; i++) {
    const model = MODELS[i];
    const result = await tryWithModel(model);
    
    if (result.success) {
      currentModelIndex = i; 
      return result.data;
    }
    
    if (result.error.status !== 400 || !result.error.message?.includes("model")) {
      return handleError(result.error);
    }
  }

  return "❌ جميع النماذج غير متاحة حالياً. يرجى المحاولة لاحقاً";
}

function handleError(error) {
  console.error("Groq Error:", error);
  
  if (error.status === 401) {
    return "❌ مفتاح Groq غير صالح";
  }
  
  if (error.status === 429) {
    return "❌ لقد تجاوزت عدد الطلبات المسموح بها (30/دقيقة). انتظر قليلاً";
  }
  
  return "❌ خطأ: " + (error.message || "خطأ غير معروف");
}