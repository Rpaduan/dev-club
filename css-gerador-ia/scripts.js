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

    console.log(resposta)

    //let dados = await resposta.json()
    //let resultado = dados.choices[0].message.content

    //blocoCodigo.textContent = resultado

}

botao.addEventListener("click", gerarCodigo)

