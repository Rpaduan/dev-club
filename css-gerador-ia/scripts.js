//Descobri o botão
let botao = document.querySelector(".botao-gerar")
let endereco = "https://api.groq.com/openai/v1/chat/completions"


//Criei a função que será chamada quando clicar no botão
async function gerarCodigo() {
    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")

    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " 
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "Você é um gerador de código HTML e CSS. Responda apenas com o código puro, nunca use crases, markdown ou explicações e comentários. Formato: primeiro <style> com o CSS, depois o HTML. Siga exatamente o que o que o usuário pedir, se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate. Movimentações apenas se o usuário solicitar, caso contrário deixe o objeto estático. Mostre o resultado sempre no centro do iframe.'"
                },
                {
                    role: "user",
                    content: textoUsuario
                }
            ]
        })

    })

    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content

    blocoCodigo.textContent = resultado
    resultadoCodigo.srcdoc = resultado
    
    console.log(dados)

}

//Ficar de olho no botão, quando clicar chamar o gerarCodigo
botao.addEventListener("click", gerarCodigo)

