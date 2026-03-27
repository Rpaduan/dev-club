let botao = document.querySelector(".botao-gerar")

function gerarCodigo(){
    let textoUsuario = document.querySelector(".caixa-texto").value
    console.log(textoUsuario)
}



botao.addEventListener("click", gerarCodigo)

