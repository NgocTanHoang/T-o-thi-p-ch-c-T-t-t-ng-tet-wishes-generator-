
import { GoogleGenAI } from "@google/genai";
import { UserInput, Relationship, Style } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateTetGreeting = async (input: UserInput): Promise<string> => {
  const prompt = `
    Bạn là một chuyên gia văn hóa Việt Nam và nhà thơ. 
    Hãy sáng tác 1-2 câu chúc Tết hoặc một đoạn thơ ngắn (4-6 dòng) bằng tiếng Việt dành cho:
    - Họ tên người nhận: ${input.fullName}
    - Độ tuổi: ${input.age}
    - Giới tính: ${input.gender}
    - Mối quan hệ: ${input.relationship}
    - Tính cách: ${input.personality || "không xác định"}
    - Phong cách yêu cầu: ${input.style}

    Yêu cầu:
    1. Ngôn ngữ thuần Việt, trang nhã, giàu ý nghĩa văn hóa Tết cổ truyền.
    2. Tuyệt đối không dùng tiếng Anh, không dùng emoji, không sáo rỗng.
    3. Phù hợp chính xác với tôn ti trật tự và mối quan hệ người nhận.
    4. Nếu là thơ, hãy dùng thể lục bát hoặc song thất lục bát cho các phong cách truyền thống/thư pháp.
    5. Chỉ trả về nội dung văn bản, không thêm lời dẫn.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });
    return response.text || "Chúc mừng năm mới An Khang Thịnh Vượng!";
  } catch (error) {
    console.error("Error generating greeting:", error);
    return "Chúc mừng năm mới, vạn sự như ý, sức khỏe dồi dào!";
  }
};

export const generateTetImage = async (input: UserInput): Promise<string> => {
  const stylePrompt = input.style === Style.Calligraphy ? "ink wash painting, calligraphy style" : 
                      input.style === Style.Traditional ? "traditional Vietnamese folk painting style (Tranh Đông Hồ/Hàng Trống)" :
                      input.style === Style.Formal ? "high-end luxury aesthetic, oil painting" : 
                      "warm vibrant photography";

  const prompt = `A high-quality, beautiful artistic representation of Vietnamese Lunar New Year (Tet). 
    The scene should include: ${input.relationship === Relationship.Parents || input.relationship === Relationship.Grandparents ? 'family reunion around a tray of food' : 'vibrant flowers and traditional decorations'}. 
    Key elements: Pink Peach blossoms (Hoa Đào) or Yellow Apricot blossoms (Hoa Mai), Bánh Chưng, red envelopes (Lì Xì), red couplets, traditional Vietnamese architecture.
    Atmosphere: ${input.style}, warm, celebratory.
    Color palette: Red, Gold, Jade Green.
    Art style: ${stylePrompt}.
    No text in the image. Purely artistic. No Western elements. Focus on Vietnamese heritage.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4",
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error generating image:", error);
    // Fallback image from picsum if AI fails
    return "https://picsum.photos/800/1200?random=tet";
  }
};
