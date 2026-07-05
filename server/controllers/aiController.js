const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const summarizeNote = async (req, res) => {
  try {
    const { content } = req.body;

    const prompt = `
Summarize the following note into 4-5 concise bullet points.

Note:
${content}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.status(200).json({
      summary: response.text,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  summarizeNote,
};