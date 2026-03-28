let botao = document.querySelector(".botao-gerar")
let endereco = "/api/chat"

async function gerarCodigo(){
    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")

    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            messages: [
            {
                role: "system",
                content: "Você é um gerador de código HTML e CSS, responda APENAS com código puro. Nunca use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate."
            },
            {
                role: "user",
                content: textoUsuario
            }]
        })
    })

   // 1. Verifique se o fetch realmente deu certo
if (!resposta.ok) {
    console.error("Erro na requisição:", await resposta.text());
    return;
}

let dados = await resposta.json();
console.log("Dados recebidos:", dados); // Veja se aparece no console do navegador

// 2. Acesse o conteúdo com o índice [0]
if (dados.choices && dados.choices.length > 0) {
    let resultado = dados.choices[0].message.content;

    // Limpa possíveis marcações de markdown (```html)
    let htmlLimpo = resultado.replace(/```html|```/g, '').trim();

    // 3. Insere nos elementos (verifique se os IDs 'blocoCodigo' e 'resultadoCodigo' existem)
    if (document.getElementById('blocoCodigo')) {
        document.getElementById('blocoCodigo').textContent = htmlLimpo;
    }
    
    if (document.getElementById('resultadoCodigo')) {
        document.getElementById('resultadoCodigo').srcdoc = htmlLimpo;
    }
} else {
    console.error("Estrutura de resposta inesperada", dados);
}


    
    //let resultado = dados.choices[0].message.content

    //blocoCodigo.textContent = resultado
    //resultadoCodigo.srcdoc = resultado

}

botao.addEventListener("click", gerarCodigo)

