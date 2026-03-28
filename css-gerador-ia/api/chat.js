// api/chat.js
export default async function handler(req, res) {
  // Pega a API KEY das variáveis de ambiente da Vercel (protegido)
  const apiKey = process.env.GROQ_API_KEY;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile", // ou o modelo que preferir
      messages: req.body.messages,
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
