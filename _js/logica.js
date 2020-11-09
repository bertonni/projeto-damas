
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
var gambi = false;

if (jogPos.length > 0 && jogPos[0] != "") {
    gambi = true
    contador = 1;
    document.getElementById(destino).style.backgroundColor = "red";
    for (let i = 0; i < jogPos.length; i++) {
        document.getElementById(jogPos[i]).style.backgroundColor= "#49cc37";
    }
    for(let i = 0; i < tabuleiro.length ;i++){
        for(let j = 0; j < tabuleiro[i].length; j++){
            if(jogPos.indexOf(i + "-" + j) == -1){
                document.getElementById(i + "-" + j).classList.add('naoClicavel');
            }
        }
    }
}

if (jogadorAtual[0] == "B") {
    document.getElementById("vez").setAttribute("src", "pecaBranca.png");
} else if (jogadorAtual[0] == "P") {
    document.getElementById("vez").setAttribute("src", "pecaPreta.png");
}

if (contDamas == 20) {
    alert("Empate por limite de jogadas sucessivas de damas sem captura!")
    document.getElementsByClassName("tabuleiro")[0].classList.add("naoClicavel");
}

if (contForca == 20) {
    alert('Empate por jogador com maior número de damas não venceu em vinte lances!');
    document.getElementsByClassName("tabuleiro")[0].classList.add("naoClicavel");
}

// var pecasAfogadas = verificaPecasAfogadas(jogadorAtual);

// if (pecasAfogadas == totalPecasBrancas) {
//     alert('As brancas não possuem jogadas válidas!');
//     document.getElementsByClassName("tabuleiro")[0].classList.add("naoClicavel");
// } else if (pecasAfogadas == totalPecasPretas) {
//     alert('As pretas não possuem jogadas válidas!');
//     document.getElementsByClassName("tabuleiro")[0].classList.add("naoClicavel");
// }

if (totalPecasBrancas == 0) {
    alert("O preto ganhou!");
    document.getElementsByClassName("tabuleiro")[0].classList.add("naoClicavel");
} else if (totalPecasPretas == 0) {
    alert("O branco ganhou!");
    document.getElementsByClassName("tabuleiro")[0].classList.add("naoClicavel");
}

document.getElementById("quantPecasBrancas").innerHTML = totalPecasBrancas;
document.getElementById("quantPecasPretas").innerHTML = totalPecasPretas;

function getPeca(linha, coluna) {


    for (var i = 0; i < jogadasPossiveis.length; i++) {
        elemento = document.getElementById(jogadasPossiveis[i]);
        elemento.style.backgroundColor = "initial";
    }

    jogadasPossiveis = [];

    oponente[0] = jogadorAtual[0] == "B" ? "P" : "B";
    oponente[1] = jogadorAtual[1] == "DB" ? "DP" : "DB";


    if (oponente.indexOf(tabuleiro[linha][coluna]) != -1) {
        return;
    }
    if (tabuleiro[linha][coluna] == "X") {
        return;
    }

    caracterAtual = tabuleiro[linha][coluna];

    if (caracterAtual != " ") {
        apoio = caracterAtual;
    }

    if (contador == 1) {
        if (tabuleiro[linha][coluna] == " ") {
            var gambi2 = false;
            if(gambi){
                ultimaJogada = destino;
                gambi2 = true;
            }
            var stringDividida = ultimaJogada.split("-");
            var ultimaLinha = stringDividida[0];
            var ultimaColuna = stringDividida[1];
            var jogadaAtual = linha + "-" + coluna;
            var resultado = condicaoSucessiva(apoio);
            var forcaMaior = condicaoMaiorForca(tabuleiro, jogadorAtual);
            pecaEliminada = eliminarPeca(linha, coluna, ultimaLinha, ultimaColuna, tabuleiro);

            if(pecaEliminada.length > 0){
                capturaSucessiva = true;
            }
            if(gambi2){
                enviaDadosServer(pecaEliminada, jogadaAtual, ultimaJogada, totalPecasPretas, totalPecasBrancas, jogadorAtual, resultado, forcaMaior);
            }
            if (indicesjogadasPossiveis.indexOf(linha + "-" + coluna) == -1) {
                document.getElementById(ultimaJogada).style.backgroundColor = "initial";
                return;
            }



           
            enviaDadosServer(pecaEliminada, jogadaAtual, ultimaJogada, totalPecasPretas, totalPecasBrancas, jogadorAtual, resultado, forcaMaior);
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
    } else if (contador == 0) {
        if (tabuleiro[linha][coluna] == " ") {
            return;
        }

        document.getElementById(linha + "-" + coluna).style.backgroundColor = "red";

        verificaSupEsquerdo(linha, coluna, caracterAtual);
        verificaSupDireito(linha, coluna, caracterAtual);
        verificaInfEsquerdo(linha, coluna, caracterAtual);
        verificaInfDireito(linha, coluna, caracterAtual);

        contador++
        ultimaJogada = linha + "-" + coluna;
    }
    indicesjogadasPossiveis = [];
    for (var i = 0; i < jogadasPossiveis.length; i++) {
        elemento = document.getElementById(jogadasPossiveis[i]);
        elemento.style.backgroundColor = "#49cc37";
        indicesjogadasPossiveis.push(jogadasPossiveis[i]);
    }
}

function verificaSupEsquerdo(linha, coluna, caracterAtual) {

    let oponentes = [];
    if (caracterAtual == "B" || caracterAtual == "DB") {
        oponentes = ["P", "DP"];
    } else {
        oponentes = ["B", "DB"];
    }

    if ((linha - 1) < 0 || (coluna - 1) < 0 || jogadorAtual.indexOf(tabuleiro[linha - 1][coluna - 1]) != -1 || oponentes.indexOf(tabuleiro[linha][coluna]) != -1 && oponentes.indexOf(tabuleiro[linha - 1][coluna - 1]) != -1) {
        return false;
    } else if (caracterAtual == "P" && oponentes.indexOf(tabuleiro[linha - 1][coluna - 1]) != -1 && tabuleiro[linha - 2][coluna - 2] == " ") {
        jogadasPossiveis.push((linha - 2) + "-" + (coluna - 2));
        return true;
    } else if (caracterAtual != "P") {
        if (tabuleiro[linha - 1][coluna - 1] == " ") {
            jogadasPossiveis.push((linha - 1) + "-" + (coluna - 1));
            if (caracterAtual != "DB" && caracterAtual != "DP" || oponentes.indexOf(tabuleiro[linha][coluna]) != -1) {
                return;
            }
        }
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

    if ((linha - 1) < 0 || (coluna + 1) > 7 || jogadorAtual.indexOf(tabuleiro[linha - 1][coluna + 1]) != -1 || oponentes.indexOf(tabuleiro[linha][coluna]) != -1 && oponentes.indexOf(tabuleiro[linha - 1][coluna + 1]) != -1) {
        return false;
    } else if (caracterAtual == "P" && oponentes.indexOf(tabuleiro[linha - 1][coluna + 1]) != -1 && tabuleiro[linha - 2][coluna + 2] == " ") {
        jogadasPossiveis.push((linha - 2) + "-" + (coluna + 2));
        return true;
    } else if (caracterAtual != "P") {
        if (tabuleiro[linha - 1][coluna + 1] == " ") {
            jogadasPossiveis.push((linha - 1) + "-" + (coluna + 1));
            if (caracterAtual != "DB" && caracterAtual != "DP" || oponentes.indexOf(tabuleiro[linha][coluna]) != -1) {
                return;
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

    if ((linha + 1) > 7 || (coluna - 1) < 0 || jogadorAtual.indexOf(tabuleiro[linha + 1][coluna - 1]) != -1 || oponentes.indexOf(tabuleiro[linha][coluna]) != -1 && oponentes.indexOf(tabuleiro[linha + 1][coluna - 1]) != -1) {
        return false;
    } else if (caracterAtual == "B" && oponentes.indexOf(tabuleiro[linha + 1][coluna - 1]) != -1 && tabuleiro[linha + 2][coluna - 2] == " ") {
        jogadasPossiveis.push((linha + 2) + "-" + (coluna - 2));
        return true;
    } else if (caracterAtual != "B") {
        if (tabuleiro[linha + 1][coluna - 1] == " ") {
            jogadasPossiveis.push((linha + 1) + "-" + (coluna - 1));
            if (caracterAtual != "DB" && caracterAtual != "DP" || oponentes.indexOf(tabuleiro[linha][coluna]) != -1) {
                return;
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

    if ((linha + 1) > 7 || (coluna + 1) > 7 || jogadorAtual.indexOf(tabuleiro[linha + 1][coluna + 1]) != -1 || oponentes.indexOf(tabuleiro[linha][coluna]) != -1 && oponentes.indexOf(tabuleiro[linha + 1][coluna + 1]) != -1) {
        return false;
    } else if (caracterAtual == "B" && oponentes.indexOf(tabuleiro[linha + 1][coluna + 1]) != -1 && tabuleiro[linha + 2][coluna + 2] == " ") {
        jogadasPossiveis.push((linha + 2) + "-" + (coluna + 2));
        return true;
    } else if (caracterAtual != "B") {
        if (tabuleiro[linha + 1][coluna + 1] == " ") {
            jogadasPossiveis.push((linha + 1) + "-" + (coluna + 1));
            if (caracterAtual != "DB" && caracterAtual != "DP" || oponentes.indexOf(tabuleiro[linha][coluna]) != -1) {
                return;
            }
        }
        return verificaInfDireito((linha + 1), (coluna + 1), caracterAtual);

    }
}

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
            } else {
                totalPecasPretas--;
            }
            posicaoEliminar[0] = linhaDest + 1;
            posicaoEliminar[1] = colunaDest + 1;
            //Dama foi pra direita superior
        } else if (colunaOrig - colunaDest < -2) {
            if (tabuleiro[linhaDest + 1][colunaDest - 1] === "B" || tabuleiro[linhaDest + 1][colunaDest - 1] === "DB") {
                totalPecasBrancas--;
            } else {
                totalPecasPretas--;
            }
            posicaoEliminar[0] = linhaDest + 1;
            posicaoEliminar[1] = colunaDest - 1;
        }
        //Dama foi pra baixo
    } else if (linhaOrig - linhaDest < -2) {
        //Dama foi pra esquerda inferior
        if (colunaOrig - colunaDest > 2) {
            if (tabuleiro[linhaDest - 1][colunaDest + 1] === "B" || tabuleiro[linhaDest - 1][colunaDest + 1] === "DB") {
                totalPecasBrancas--;
            } else {
                totalPecasPretas--;
            }
            posicaoEliminar[0] = linhaDest - 1;
            posicaoEliminar[1] = colunaDest + 1;
            //Dama foi pra direita inferior
        } else if (colunaOrig - colunaDest < - 2) {
            if (tabuleiro[linhaDest - 1][colunaDest - 1] === "B" || tabuleiro[linhaDest - 1][colunaDest - 1] === "DB") {
                totalPecasBrancas--;
            } else {
                totalPecasPretas--;
            }
            posicaoEliminar[0] = linhaDest - 1;
            posicaoEliminar[1] = colunaDest - 1;
        }
    }
    return posicaoEliminar;
}

function transformaDama(linha, coluna, jogadorAtual) {
    if (jogadorAtual == "B") {
        tabuleiro[linha][coluna] = "DB";

    } else if (jogadorAtual == "P") {
        tabuleiro[linha][coluna] = "DP";
    }
}

function enviaDadosServer(posicaoEliminada, destino, origem, totalPretas, totalBrancas, jogadorAtual, resultado, forcaMaior) {
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

    var url = '/jogar?lineEli=' + linhaEliminada + '&colEli=' + colunaEliminada + '&dest=' + destino + '&orig=' + origem + '&totP=' + totalPretas + '&totB=' + totalBrancas + '&playerP=' + jogadorPeca + '&playerD=' + jogadorDama + '&resul=' + resultado + '&for=' + forcaMaior + '&capSuc=' + capturaSucessiva;
    window.location.replace(url);
}

function condicaoSucessiva(apoio) {
    //20 lances sucessivos de Dama
    if (apoio == "DB" || apoio == "DP") {
        return true;
    }
    return false;
}

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

// function verificaPecasAfogadas(jogadorAtual) {

//     for (let i = 0; i < tabuleiro.length; i++) {
//         for (let j = 0; j < tabuleiro[i].length; j++) {
//             let supEsq = verificaSupEsquerdo(i, j, tabuleiro[i][j]);
//             let supDir = verificaSupDireito(i, j, tabuleiro[i][j]);
//             let infEsq = verificaInfEsquerdo(i, j, tabuleiro[i][j]);
//             let infDir = verificaInfDireito(i, j, tabuleiro[i][j]);

//             if ((tabuleiro[i][j] == "B" || tabuleiro[i][j] == "DB") && jogadorAtual.indexOf(tabuleiro[i][j] != -1)) {
//                 if (supEsq == false && supDir == false && infDir == false && infEsq == false) {
//                     afogadas++;
//                 }
//             } else if ((tabuleiro[i][j] == "P" || tabuleiro[i][j] == "DP") && jogadorAtual.indexOf(tabuleiro[i][j] != -1)) {
//                 if (supEsq == false && supDir == false && infDir == false && infEsq == false) {
//                     afogadas++;
//                 }
//             }
//         }
//     }
//     return afogadas;
// }
