export default async function handler(req, res) {
    const { textoUsuario } = req.body; // ⚠️ NÃO precisa JSON.parse

    const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "Você é um gerador de código HTML e CSS. Responda apenas com o código puro, nunca use crases, markdown ou explicações e comentários. Formato: primeiro <style> com o CSS, depois o HTML. Siga exatamente o que o que o usuário pedir, se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate. Movimentações apenas se o usuário solicitar, caso contrário deixe o objeto estático. Mostre o resultado sempre no centro do iframe. "
                },
                {
                    role: "user",
                    content: textoUsuario
                }
            ]
        })
    });

    const dados = await resposta.json();
    return res.status(200).json(dados);
}