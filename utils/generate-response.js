const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: "",
});

async function main(req, res) {
  try {
    const param = req.query.prompt;
    console.log(param);
    console.log("that was param");

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: `${param}`,
      config: {                     
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
      },
    });

    for await (const chunk of response) {
      const text = chunk.text;
      console.log("Chunk:", text);
      res.write(`data: ${JSON.stringify({ text: text })}\n\n`);
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.log(
      "error in main function of api communication \n" + error.message
    );
    res.write(
      `data: ${JSON.stringify({
        text: "we are facing some issue ai is currently down",
      })}\n\n`
    );
    res.write("data: [DONE]\n\n");
    res.end();
  }
}

module.exports = main;
