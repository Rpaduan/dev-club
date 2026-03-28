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

 try {
    let dados = await resposta.json();
    console.log("1. JSON recebido:", dados);

    // ACESSO CORRETO AO CONTEÚDO (Verifique os índices [0])
    let resultado = dados.choices[0].message.content;
    console.log("2. Texto da IA:", resultado);

    // Limpando o código (remove as crases ``` se a IA enviou)
    let htmlLimpo = resultado.replace(/```html|```/g, '').trim();

    // VERIFICAÇÃO DOS ELEMENTOS
    let elBloco = document.getElementById('blocoCodigo');
    let elIframe = document.getElementById('resultadoCodigo');

    if (elBloco) {
        elBloco.textContent = htmlLimpo;
        console.log("3. Sucesso no bloco de código");
    } else {
        console.error("ERRO: Elemento 'blocoCodigo' não encontrado no HTML!");
    }

    if (elIframe) {
        elIframe.srcdoc = htmlLimpo;
        console.log("4. Sucesso no iframe");
    } else {
        console.error("ERRO: Elemento 'resultadoCodigo' não encontrado no HTML!");
    }

} catch (erro) {
    console.error("Erro fatal ao processar a resposta:", erro);
}


    
    //let resultado = dados.choices[0].message.content

    //blocoCodigo.textContent = resultado
    //resultadoCodigo.srcdoc = resultado

}

botao.addEventListener("click", gerarCodigo)

