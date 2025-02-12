// Define o limite máximo de números sorteáveis.
let limiteNumeros = 5;

// Lista para armazenar números já sorteados.
let listaNumSorteados = [];

// Gera o primeiro número secreto.
let numeroSecreto = numeroAleatorio();

// Contador de tentativas.
let qtdTentativas = 1;

// Exibe a mensagem inicial do jogo.
mensagemInicial();

// Função para gerar um número aleatório sem repetição.
function numeroAleatorio() {
  let numeroSorteado = parseInt(Math.random() * limiteNumeros + 1);

  // Se todos os números já foram sorteados, reinicia a lista.
  if (listaNumSorteados.length == limiteNumeros) listaNumSorteados = [];

  // Se o número já foi sorteado, gera outro.
  if (listaNumSorteados.includes(numeroSorteado)) {
    return numeroAleatorio();
  } else {
    // Adiciona o número sorteado à lista e retorna.
    listaNumSorteados.push(numeroSorteado);
    return numeroSorteado;
  }
}

// Função para exibir texto em uma tag HTML.
function textoExibidoNaTela(tag, texto) {
  let descricao = document.querySelector(tag);
  descricao.innerHTML = texto;
}

// Exibe a mensagem inicial na tela.
function mensagemInicial() {
  textoExibidoNaTela("h1", "Jogo da Senha");
  let mensagemNumerosLimite = `Escolha um número entre 1 e ${limiteNumeros}`;
  textoExibidoNaTela("p", mensagemNumerosLimite);
}

// Limpa o campo de entrada do usuário.
function limparCampo() {
  palpite = document.querySelector("input");
  palpite.value = "";
}

// Função para verificar o palpite do jogador.
function verificarChute() {
  let palpite = document.querySelector("input").value;

  // Verifica se o palpite está dentro do intervalo permitido.
  if (palpite <= limiteNumeros && palpite > 0) {
    // Se acertar, exibe mensagem de acerto.
    if (palpite == numeroSecreto) {
      textoExibidoNaTela("h1", "Parabéns, Você Acertou!!");

      let palavraTentativa = qtdTentativas > 1 ? "tentativas" : "tentativa";
      let mensagemAcerto = `Você descobriu o número secreto ${numeroSecreto} com ${qtdTentativas} ${palavraTentativa}`;
      textoExibidoNaTela("p", mensagemAcerto);

      // Habilita o botão de reiniciar e desativa a entrada.
      document.getElementById("reiniciar").removeAttribute("disabled");
      document.getElementById("palpite").setAttribute("disabled", 1);
    } else {
      // Se errar, aumenta o contador e dá uma dica.
      qtdTentativas++;
      let maiorMenor = palpite > numeroSecreto ? "menor" : "maior";
      let mensagemErro = `O número secreto é ${maiorMenor} que ${palpite}.`;
      textoExibidoNaTela("p", mensagemErro);
    }
  } else {
    // Mensagem de erro para valores fora do intervalo permitido.
    let mensagemForaDoRange = `O número escolhido deve estar entre 1 e ${limiteNumeros}.`;
    textoExibidoNaTela("p", mensagemForaDoRange);
  }

  limparCampo();
}

// Reinicia o jogo gerando um novo número secreto.
function novoJogo() {
  limparCampo();
  qtdTentativas = 1;
  numeroSecreto = numeroAleatorio();
  mensagemInicial();

  // Desativa o botão de reinício e reativa a entrada.
  document.getElementById("reiniciar").setAttribute("disabled", 1);
  document.getElementById("palpite").removeAttribute("disabled");
}
