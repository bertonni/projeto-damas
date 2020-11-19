//Atribuição de valores de variáveis vindas de jogar.hbs && declaração de variáveis
var contador = 0;
var ultimaJogada = "";
var jogadorAtual = playerAtual
var caracterAtual = "";
var oponente = [];
var elemento;
var totalPecasBrancas = totalBrancas;
var totalPecasPretas = totalPretas;
var pecaEliminada;
var jogadasPossiveis = [];
var indicesjogadasPossiveis = [];
var tabuleiro = array;
var contadorDamas = 0;
var apoio;
var afogadas = 0;
var capturaSucessiva = false;
var transicao = false;

//Verifica se há captura sucessiva
if (jogPos.length > 0 && jogPos[0] != "") {
  //Transição = true && contador = 1 para continuar clicando em jogadas sucessivas
  transicao = true
  contador = 1;
  document.getElementById(destino).style.backgroundColor = "red";
  //Acende em verde as capturas possíveis
  for (let i = 0; i < jogPos.length; i++) {
    document.getElementById(jogPos[i]).style.backgroundColor = "#49cc37";
  }
  //Deixa todas as outras peças (exceto as capturas sucessivas) não clicavéis
  for (let i = 0; i < tabuleiro.length; i++) {
    for (let j = 0; j < tabuleiro[i].length; j++) {
      if (jogPos.indexOf(i + "-" + j) == -1) {
        document.getElementById(i + "-" + j).classList.add('naoClicavel');
      }
    }
  }
}

//Faz a troca da imagem referente ao jogador da vez
if (jogadorAtual[0] == "B") {
  document.getElementById("vez").setAttribute("src", "pecaBranca.png");
} else if (jogadorAtual[0] == "P") {
  document.getElementById("vez").setAttribute("src", "pecaPreta.png");
}

//Condição de empate (jogadas sucessivas de dama sem captura!)
if (contDamas == 20) {
  alert("Empate por limite de jogadas sucessivas de damas sem captura!")
  document.getElementsByClassName("tabuleiro")[0].classList.add("naoClicavel");
}

//Condição de empate de "maior força"
if (contForca == 20) {
  alert('Empate por jogador com maior número de damas não venceu em vinte lances!');
  document.getElementsByClassName("tabuleiro")[0].classList.add("naoClicavel");
}

//Faz a verificação de peças afogadas no tabuleiro
var pecasAfogadas = verificaPecasAfogadas(jogadorAtual);

//Condição de empate(peças afogadas)
if (pecasAfogadas == totalPecasBrancas && jogadorAtual[0] == "B" && totalPecasBrancas != 0) {
  alert('As brancas não possuem jogadas válidas!');
  document.getElementsByClassName("tabuleiro")[0].classList.add("naoClicavel");
} else if (pecasAfogadas == totalPecasPretas && jogadorAtual[0] == "P" && totalPecasPretas != 0) {
  alert('As pretas não possuem jogadas válidas!');
  document.getElementsByClassName("tabuleiro")[0].classList.add("naoClicavel");
}

//Condição de vitória (todas as peças capturadas)
if (totalPecasBrancas == 0) {
  alert("O preto ganhou!");
  document.getElementsByClassName("tabuleiro")[0].classList.add("naoClicavel");
} else if (totalPecasPretas == 0) {
  alert("O branco ganhou!");
  document.getElementsByClassName("tabuleiro")[0].classList.add("naoClicavel");
}

//Passa a quantidade de peças para o elemento HTML
document.getElementById("quantPecasBrancas").innerHTML = totalPecasBrancas;
document.getElementById("quantPecasPretas").innerHTML = totalPecasPretas;

//Função ativada no evento onclick, para pegar a linha e coluna;
function getPeca(linha, coluna) {
  //Apagar jogadas possíveis(em caso de houver acesa)
  for (var i = 0; i < jogadasPossiveis.length; i++) {
    elemento = document.getElementById(jogadasPossiveis[i]);
    elemento.style.backgroundColor = "initial";
  }

  //Array setado para posição inicial(zerado)
  jogadasPossiveis = [];

  //Define o oponente usando operador ternário
  oponente[0] = jogadorAtual[0] == "B" ? "P" : "B";
  oponente[1] = jogadorAtual[1] == "DB" ? "DP" : "DB";

  //Verifica se a peça clicada é um oponente e sai da função
  if (oponente.indexOf(tabuleiro[linha][coluna]) != -1) {
    return;
  }
  //Verifica se a div clicada é uma casa branca e sai da função 
  if (tabuleiro[linha][coluna] == "X") {
    return;
  }

  //Recebe o valor da posição clicada
  caracterAtual = tabuleiro[linha][coluna];

  //Apoio recebe um caracter atual válido para usar na função condiçãoSucessivas
  if (caracterAtual != " ") {
    apoio = caracterAtual;
  }

  //Quando contador é igual a 1
  if (contador == 1) {
    //Verifica se a div clicada é um espaço em branco
    if (tabuleiro[linha][coluna] == " ") {
      var transicao2 = false;
      if (transicao) {
        ultimaJogada = destino;
        transicao2 = true;
      }
      //Split de linha e coluna que está em ultimaJogada
      var stringDividida = ultimaJogada.split("-");
      var ultimaLinha = stringDividida[0];
      var ultimaColuna = stringDividida[1];
      var jogadaAtual = linha + "-" + coluna;

      //Chamada de uma condições de empate
      var resultado = condicaoSucessiva(apoio);
      var forcaMaior = condicaoMaiorForca(tabuleiro, jogadorAtual);
      //Chamada da função eliminarPeca
      pecaEliminada = eliminarPeca(linha, coluna, ultimaLinha, ultimaColuna, tabuleiro);

      //Se o retorno da função pecaEliminada for maior que 0 houve captura
      if (pecaEliminada.length > 0) {
        capturaSucessiva = true;
      }
      if (transicao2) {
        enviaDadosServer(pecaEliminada, jogadaAtual, ultimaJogada, totalPecasPretas, totalPecasBrancas, jogadorAtual, resultado, forcaMaior, capturaSucessiva);
      }
      if (indicesjogadasPossiveis.indexOf(linha + "-" + coluna) == -1) {
        document.getElementById(ultimaJogada).style.backgroundColor = "initial";
        return;
      }

      enviaDadosServer(pecaEliminada, jogadaAtual, ultimaJogada, totalPecasPretas, totalPecasBrancas, jogadorAtual, resultado, forcaMaior, capturaSucessiva);
      return;

    } else if (jogadorAtual.indexOf(tabuleiro[linha][coluna]) != -1) {
      document.getElementById(ultimaJogada).style.backgroundColor = "initial";
      document.getElementById(linha + "-" + coluna).style.backgroundColor = "red";

      verificaSupEsquerdo(linha, coluna, caracterAtual);
      verificaSupDireito(linha, coluna, caracterAtual);
      verificaInfEsquerdo(linha, coluna, caracterAtual);
      verificaInfDireito(linha, coluna, caracterAtual);

      ultimaJogada = linha + "-" + coluna;
    }
    //Quando contador é 0 (primeiro click)
  } else if (contador == 0) {
    //Verifica se o click não é um espaço em branco (1°)
    if (tabuleiro[linha][coluna] == " ") {
      return;
    }
    //Troca o background da peça selecionada para vermelho
    document.getElementById(linha + "-" + coluna).style.backgroundColor = "red";

    //Chama as quatro verificações de jogadas possíveis
    verificaSupEsquerdo(linha, coluna, caracterAtual);
    verificaSupDireito(linha, coluna, caracterAtual);
    verificaInfEsquerdo(linha, coluna, caracterAtual);
    verificaInfDireito(linha, coluna, caracterAtual);

    //Incrementa o contador e coloca o valor do ultimo click em ultimaJogada
    contador++
    ultimaJogada = linha + "-" + coluna;
  }
  //Zera o array
  indicesjogadasPossiveis = [];
  //Percorre o array e acende as jogadas possíveis
  for (var i = 0; i < jogadasPossiveis.length; i++) {
    elemento = document.getElementById(jogadasPossiveis[i]);
    elemento.style.backgroundColor = "#49cc37";
    indicesjogadasPossiveis.push(jogadasPossiveis[i]);
  }
}

function verificaSupEsquerdo(linha, coluna, caracterAtual) {
  //Define os oponentes com um operador ternário
  let oponentes = [];
  if (caracterAtual == "B" || caracterAtual == "DB") {
    oponentes = ["P", "DP"];
  } else {
    oponentes = ["B", "DB"];
  }

  //Condições de parada da função recursiva
  if ((linha - 1) < 0 || (coluna - 1) < 0 || jogadorAtual.indexOf(tabuleiro[linha - 1][coluna - 1]) != -1 || oponentes.indexOf(tabuleiro[linha][coluna]) != -1 && oponentes.indexOf(tabuleiro[linha - 1][coluna - 1]) != -1 || (caracterAtual == "P" && tabuleiro[linha - 1][coluna - 1] == " ")) {
    return false;
    //Verificação de captura para trás de uma peca Preta
  } else if (caracterAtual == "P" && oponentes.indexOf(tabuleiro[linha - 1][coluna - 1]) != -1 && (linha - 2) >= 0 && (coluna - 2) >= 0 && tabuleiro[linha - 2][coluna - 2] == " ") {
    jogadasPossiveis.push((linha - 2) + "-" + (coluna - 2));
    return true;
    //Verificação de jogada possível de qualquer peca diferente de P
  } else if (caracterAtual != "P") {
    if (tabuleiro[linha - 1][coluna - 1] == " ") {
      jogadasPossiveis.push((linha - 1) + "-" + (coluna - 1));
      //Verifica se é uma peça branca para parar a função recursiva
      if (caracterAtual != "DB" && caracterAtual != "DP" || oponentes.indexOf(tabuleiro[linha][coluna]) != -1) {
        return true;
      }
    }
    //Chama a própria função em caso da peça ser uma dama
    return verificaSupEsquerdo((linha - 1), (coluna - 1), caracterAtual);
  }

}

function verificaSupDireito(linha, coluna, caracterAtual) {
  let oponentes = [];
  if (caracterAtual == "B" || caracterAtual == "DB") {
    oponentes = ["P", "DP"];
  } else {
    oponentes = ["B", "DB"];
  }

  if ((linha - 1) < 0 || (coluna + 1) > 7 || jogadorAtual.indexOf(tabuleiro[linha - 1][coluna + 1]) != -1 || oponentes.indexOf(tabuleiro[linha][coluna]) != -1 && oponentes.indexOf(tabuleiro[linha - 1][coluna + 1]) != -1 || (caracterAtual == "P" && tabuleiro[linha - 1][coluna + 1] == " ")) {
    return false;
  } else if (caracterAtual == "P" && oponentes.indexOf(tabuleiro[linha - 1][coluna + 1]) != -1 && (linha - 2) >= 0 && (coluna + 2) <= 7 && tabuleiro[linha - 2][coluna + 2] == " ") {
    jogadasPossiveis.push((linha - 2) + "-" + (coluna + 2));
    return true;
  } else if (caracterAtual != "P") {
    if (tabuleiro[linha - 1][coluna + 1] == " ") {
      jogadasPossiveis.push((linha - 1) + "-" + (coluna + 1));
      if (caracterAtual != "DB" && caracterAtual != "DP" || oponentes.indexOf(tabuleiro[linha][coluna]) != -1) {
        return true;
      }
    }
    return verificaSupDireito((linha - 1), (coluna + 1), caracterAtual);
  }
}

function verificaInfEsquerdo(linha, coluna, caracterAtual) {
  let oponentes = [];
  if (caracterAtual == "B" || caracterAtual == "DB") {
    oponentes = ["P", "DP"];
  } else {
    oponentes = ["B", "DB"];
  }

  if ((linha + 1) > 7 || (coluna - 1) < 0 || jogadorAtual.indexOf(tabuleiro[linha + 1][coluna - 1]) != -1 || oponentes.indexOf(tabuleiro[linha][coluna]) != -1 && oponentes.indexOf(tabuleiro[linha + 1][coluna - 1]) != -1 || (caracterAtual == "B" && tabuleiro[linha + 1][coluna - 1] == " ")) {
    return false;
  } else if (caracterAtual == "B" && oponentes.indexOf(tabuleiro[linha + 1][coluna - 1]) != -1 && (linha + 2) <= 7 && (coluna - 2) >= 0 && tabuleiro[linha + 2][coluna - 2] == " ") {
    jogadasPossiveis.push((linha + 2) + "-" + (coluna - 2));
    return true;
  } else if (caracterAtual != "B") {
    if (tabuleiro[linha + 1][coluna - 1] == " ") {
      jogadasPossiveis.push((linha + 1) + "-" + (coluna - 1));
      if (caracterAtual != "DB" && caracterAtual != "DP" || oponentes.indexOf(tabuleiro[linha][coluna]) != -1) {
        return true;
      }
    }
    return verificaInfEsquerdo((linha + 1), (coluna - 1), caracterAtual);

  }
}

function verificaInfDireito(linha, coluna, caracterAtual) {
  let oponentes = [];
  if (caracterAtual == "B" || caracterAtual == "DB") {
    oponentes = ["P", "DP"];
  } else {
    oponentes = ["B", "DB"];
  }

  if ((linha + 1) > 7 || (coluna + 1) > 7 || jogadorAtual.indexOf(tabuleiro[linha + 1][coluna + 1]) != -1 || oponentes.indexOf(tabuleiro[linha][coluna]) != -1 && oponentes.indexOf(tabuleiro[linha + 1][coluna + 1]) != -1 || (caracterAtual == "B" && tabuleiro[linha + 1][coluna + 1] == " ")) {
    return false;
  } else if (caracterAtual == "B" && oponentes.indexOf(tabuleiro[linha + 1][coluna + 1]) != -1 && (linha + 2) <= 7 && (coluna + 2) <= 7 && tabuleiro[linha + 2][coluna + 2] == " ") {
    jogadasPossiveis.push((linha + 2) + "-" + (coluna + 2));
    return true;
  } else if (caracterAtual != "B") {
    if (tabuleiro[linha + 1][coluna + 1] == " ") {
      jogadasPossiveis.push((linha + 1) + "-" + (coluna + 1));
      if (caracterAtual != "DB" && caracterAtual != "DP" || oponentes.indexOf(tabuleiro[linha][coluna]) != -1) {
        return true;
      }
    }
    return verificaInfDireito((linha + 1), (coluna + 1), caracterAtual);

  }
}

//Função para eliminar a peça
function eliminarPeca(linhaDest, colunaDest, linhaOrig, colunaOrig, tabuleiro) {

  linhaDest = Number(linhaDest);
  colunaDest = Number(colunaDest);
  linhaOrig = Number(linhaOrig);
  colunaOrig = Number(colunaOrig);
  var posicaoEliminar = [];

  if (linhaOrig - linhaDest == 2) {
    //Foi pra cima
    if (colunaOrig - colunaDest == 2) {
      //Foi pra esquerda superior
      if (tabuleiro[linhaOrig - 1][colunaOrig - 1] === "B" || tabuleiro[linhaOrig - 1][colunaOrig - 1] === "DB") {
        totalPecasBrancas--;
      } else {
        totalPecasPretas--;
      }
      posicaoEliminar[0] = linhaOrig - 1;
      posicaoEliminar[1] = colunaOrig - 1;
      //Foi pra direita superior
    } else if (colunaOrig - colunaDest == -2) {
      if (tabuleiro[linhaOrig - 1][colunaOrig + 1] === "B" || tabuleiro[linhaOrig - 1][colunaOrig + 1] === "DB") {
        totalPecasBrancas--;
      } else {
        totalPecasPretas--;
      }
      posicaoEliminar[0] = linhaOrig - 1;
      posicaoEliminar[1] = colunaOrig + 1;
    }
    //Foi pra baixo
  } else if (linhaOrig - linhaDest == -2) {
    //Esquerda inferior
    if (colunaOrig - colunaDest == 2) {
      if (tabuleiro[linhaOrig + 1][colunaOrig - 1] === "B" || tabuleiro[linhaOrig + 1][colunaOrig - 1] === "DB") {
        totalPecasBrancas--;
      } else {
        totalPecasPretas--;
      }
      posicaoEliminar[0] = linhaOrig + 1;
      posicaoEliminar[1] = colunaOrig - 1;
      //Direita inferior
    } else if (colunaOrig - colunaDest == -2) {
      if (tabuleiro[linhaOrig + 1][colunaOrig + 1] === "B" || tabuleiro[linhaOrig + 1][colunaOrig + 1] === "DB") {
        totalPecasBrancas--;
      } else {
        totalPecasPretas--;
      }
      posicaoEliminar[0] = linhaOrig + 1;
      posicaoEliminar[1] = colunaOrig + 1;
    }
    //Dama foi pra cima
  } else if (linhaOrig - linhaDest > 2) {
    //Dama foi pra esquerda superior
    if (colunaOrig - colunaDest > 2) {
      if (tabuleiro[linhaDest + 1][colunaDest + 1] === "B" || tabuleiro[linhaDest + 1][colunaDest + 1] === "DB") {
        totalPecasBrancas--;
        posicaoEliminar[0] = linhaDest + 1;
        posicaoEliminar[1] = colunaDest + 1;
      } else if (tabuleiro[linhaDest + 1][colunaDest + 1] === "P" || tabuleiro[linhaDest + 1][colunaDest + 1] === "DP") {
        totalPecasPretas--;
        posicaoEliminar[0] = linhaDest + 1;
        posicaoEliminar[1] = colunaDest + 1;
      }
      //Dama foi pra direita superior
    } else if (colunaOrig - colunaDest < -2) {
      if (tabuleiro[linhaDest + 1][colunaDest - 1] === "B" || tabuleiro[linhaDest + 1][colunaDest - 1] === "DB") {
        totalPecasBrancas--;
        posicaoEliminar[0] = linhaDest + 1;
        posicaoEliminar[1] = colunaDest - 1;
      } else if (tabuleiro[linhaDest + 1][colunaDest - 1] === "P" || tabuleiro[linhaDest + 1][colunaDest - 1] === "DP") {
        totalPecasPretas--;
        posicaoEliminar[0] = linhaDest + 1;
        posicaoEliminar[1] = colunaDest - 1;
      }
    }
    //Dama foi pra baixo
  } else if (linhaOrig - linhaDest < -2) {
    //Dama foi pra esquerda inferior
    if (colunaOrig - colunaDest > 2) {
      if (tabuleiro[linhaDest - 1][colunaDest + 1] === "B" || tabuleiro[linhaDest - 1][colunaDest + 1] === "DB") {
        totalPecasBrancas--;
        posicaoEliminar[0] = linhaDest - 1;
        posicaoEliminar[1] = colunaDest + 1;
      } else if (tabuleiro[linhaDest - 1][colunaDest + 1] === "P" || tabuleiro[linhaDest - 1][colunaDest + 1] === "DP") {
        totalPecasPretas--;
        posicaoEliminar[0] = linhaDest - 1;
        posicaoEliminar[1] = colunaDest + 1;
      }
      //Dama foi pra direita inferior
    } else if (colunaOrig - colunaDest < - 2) {
      if (tabuleiro[linhaDest - 1][colunaDest - 1] === "B" || tabuleiro[linhaDest - 1][colunaDest - 1] === "DB") {
        totalPecasBrancas--;
        posicaoEliminar[0] = linhaDest - 1;
        posicaoEliminar[1] = colunaDest - 1;
      } else if (tabuleiro[linhaDest - 1][colunaDest - 1] === "P" || tabuleiro[linhaDest - 1][colunaDest - 1] === "DP") {
        totalPecasPretas--;
        posicaoEliminar[0] = linhaDest - 1;
        posicaoEliminar[1] = colunaDest - 1;
      }
    }
  }
  console.log('posicaoEliminar:', posicaoEliminar);
  return posicaoEliminar;
}

//Transforma a peça em dama em caso da condição ser verdadeira
function transformaDama(linha, coluna, jogadorAtual) {
  if (jogadorAtual == "B") {
    tabuleiro[linha][coluna] = "DB";

  } else if (jogadorAtual == "P") {
    tabuleiro[linha][coluna] = "DP";
  }
}

//Envia os dados pro servidor 
function enviaDadosServer(posicaoEliminada, destino, origem, totalPretas, totalBrancas, jogadorAtual, resultado, forcaMaior, capturaSucessiva) {
  let linhaEliminada;
  let colunaEliminada;
  if (posicaoEliminada.length == 0) {
    linhaEliminada = 'O';
    colunaEliminada = 'O';
  } else {
    linhaEliminada = posicaoEliminada[0];
    colunaEliminada = posicaoEliminada[1];
  }

  let jogadorPeca = jogadorAtual[0];
  let jogadorDama = jogadorAtual[1];

  var url = '/tratar/' + linhaEliminada + '/' + colunaEliminada + '/' + destino + '/' + origem + '/' + totalPretas + '/' + totalBrancas + '/' + jogadorPeca + '/' + jogadorDama + '/' + resultado + '/' + forcaMaior + '/' + capturaSucessiva;
  window.location.replace(url);
}

function condicaoSucessiva(apoio) {
  //20 lances sucessivos de Dama
  if (apoio == "DB" || apoio == "DP") {
    return true;
  }
  return false;
}

//Condição de empate ('Maior força')
function condicaoMaiorForca(array, jogadorAtual) {
  let contDamaBranca = 0;
  let contDamaPreta = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] == "DB") {
        contDamaBranca++;
      } else if (array[i][j] == "DP") {
        contDamaPreta++;
      }
    }
  }

  if (contDamaBranca - contDamaPreta >= 2) {
    return 'BM';
  } else if (contDamaPreta - contDamaBranca >= 2) {
    return 'PM';
  } else {
    return 'O';
  }
}

//Percorre o tabuleiro e verifica quantas peças afogadas existem
function verificaPecasAfogadas(jogadorAtual) {
  for (let i = 0; i < tabuleiro.length; i++) {
    for (let j = 0; j < tabuleiro[i].length; j++) {
      let supEsq;
      let supDir;
      let infEsq;
      let infDir;

      if ((tabuleiro[i][j] == "B" || tabuleiro[i][j] == "DB") && jogadorAtual.indexOf(tabuleiro[i][j]) != -1) {
        supEsq = verificaSupEsquerdo(i, j, tabuleiro[i][j]);
        supDir = verificaSupDireito(i, j, tabuleiro[i][j]);
        infEsq = verificaInfEsquerdo(i, j, tabuleiro[i][j]);
        infDir = verificaInfDireito(i, j, tabuleiro[i][j]);

        if (supEsq == false && supDir == false && infDir == false && infEsq == false) {
          afogadas++;
        }
      } else if ((tabuleiro[i][j] == "P" || tabuleiro[i][j] == "DP") && jogadorAtual.indexOf(tabuleiro[i][j]) != -1) {
        supEsq = verificaSupEsquerdo(i, j, tabuleiro[i][j]);
        supDir = verificaSupDireito(i, j, tabuleiro[i][j]);
        infEsq = verificaInfEsquerdo(i, j, tabuleiro[i][j]);
        infDir = verificaInfDireito(i, j, tabuleiro[i][j]);

        if (supEsq == false && supDir == false && infDir == false && infEsq == false) {
          afogadas++;
        }
      }
    }
  }
  return afogadas;
}

//Função de desistência que é chamada caso o botão seja apertado
function desistir() {
  if (jogadorAtual[0] == "B") {
    alert('As Pretas ganharam por desistência!');
  } else {
    alert('As Brancas ganharam por desistência!');
  }
  document.getElementsByClassName('tabuleiro')[0].classList.add('naoClicavel');
}