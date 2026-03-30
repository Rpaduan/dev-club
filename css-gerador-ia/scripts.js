//Descobri o botão
let botao = document.querySelector(".botao-gerar")
let endereco = "https://api.groq.com/openai/v1/chat/completions"


//Criei a função que será chamada quando clicar no botão
async function gerarCodigo() {
    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")

    let resposta = await fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            
        },
        body: JSON.stringify({
            textoUsuario: textoUsuario
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

