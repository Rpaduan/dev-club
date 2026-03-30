export default async function handler(req, res) {
    const { textoUsuario } = JSON.parse(req.body);

    const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}` // A chave fica segura aqui
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: "Você é um gerador de código HTML e CSS..." },
                { role: "user", content: textoUsuario }
            ]
        })
    });

    const dados = await resposta.json();
    return res.status(200).json(dados);
}
