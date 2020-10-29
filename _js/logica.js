
var contador = 0;
var ultimaJogada = "";
var jogadorAtual = ["B", "DB"];
var caracterAtual = "";
var oponente = [];
var ultimaPosicaoValidaSupDir = "";
var ultimaPosicaoValidaSupEsq = "";
var ultimaPosicaoValidaInfEsq = "";
var ultimaPosicaoValidaInfDir = "";
var elemento;
var totalPecasBrancas = 12;
var totalPecasPretas = 12;

var jogadasPossiveis = [];
var indicesjogadasPossiveis = [];

var tabuleiro = [
    ["X", "P", "X", "P", "X", "P", "X", "P"],
    ["P", "X", "P", "X", "P", "X", "P", "X"],
    ["X", "P", "X", "P", "X", "P", "X", "P"],
    [" ", "X", " ", "X", " ", "X", " ", "X"],
    ["X", " ", "X", " ", "X", " ", "X", " "],
    ["B", "X", "B", "X", "B", "X", "B", "X"],
    ["X", "B", "X", "B", "X", "B", "X", "B"],
    ["B", "X", "B", "X", "B", "X", "B", "X"],
]

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

    if (contador == 1) {

        if (tabuleiro[linha][coluna] == " ") {
            if (indicesjogadasPossiveis.indexOf(linha + "-" + coluna) == -1) {
                document.getElementById(ultimaJogada).style.backgroundColor = "initial";
                return;
            }
            var stringDividida = ultimaJogada.split("-");
            var ultimaLinha = stringDividida[0];
            var ultimaColuna = stringDividida[1];
            var temp = tabuleiro[linha][coluna];
            tabuleiro[linha][coluna] = tabuleiro[ultimaLinha][ultimaColuna];
            tabuleiro[ultimaLinha][ultimaColuna] = temp;

            if (linha == 0 && jogadorAtual[0] == "B") {
                transformaDama(linha, coluna, jogadorAtual[0]);
            } else if (linha == 7 && jogadorAtual[0] == "P") {
                transformaDama(linha, coluna, jogadorAtual[0]);
            }

            eliminarPeca(linha, coluna, ultimaLinha, ultimaColuna, tabuleiro);
            atualizaTabuleiro(tabuleiro);
            contador = 0;

            document.getElementById(ultimaJogada).style.backgroundColor = "initial";

            jogadorAtual[0] = oponente[0];
            jogadorAtual[1] = oponente[1];

            return;

        } else if (jogadorAtual.indexOf(tabuleiro[linha][coluna]) != -1) {
            document.getElementById(linha + "-" + coluna).style.backgroundColor = "red";
            document.getElementById(ultimaJogada).style.backgroundColor = "initial";

            if (verificaSupEsquerdo(linha, coluna, caracterAtual)) {
                if (tabuleiro[linha - 1][coluna - 1] == " ") {
                    jogadasPossiveis.push((linha - 1) + "-" + (coluna - 1));
                } else {
                    jogadasPossiveis.push((linha - 2) + "-" + (coluna - 2));
                }
            }

            if (verificaSupDireito(linha, coluna, caracterAtual)) {
                if (tabuleiro[linha - 1][coluna + 1] == " ") {
                    jogadasPossiveis.push((linha - 1) + "-" + (coluna + 1));
                } else {
                    jogadasPossiveis.push((linha - 2) + "-" + (coluna + 2));
                }
            }

            if (verificaInfEsquerdo(linha, coluna, caracterAtual)) {
                if (tabuleiro[linha + 1][coluna - 1] == " ") {
                    jogadasPossiveis.push((linha + 1) + "-" + (coluna - 1));
                } else {
                    jogadasPossiveis.push((linha + 2) + "-" + (coluna - 2));
                }
            }

            if (verificaInfDireito(linha, coluna, caracterAtual)) {
                if (tabuleiro[linha + 1][coluna + 1] == " ") {
                    jogadasPossiveis.push((linha + 1) + "-" + (coluna + 1));
                } else {
                    jogadasPossiveis.push((linha + 2) + "-" + (coluna + 2));
                }
            }
            ultimaJogada = linha + "-" + coluna;
        } else {
            //contador = 0;
        }

    } else if (contador == 0) {
        console.log("entrei aqui")
        if (tabuleiro[linha][coluna] == " ") {
            return;
        }
        console.log(linha + "-" + coluna)

        document.getElementById(linha + "-" + coluna).style.backgroundColor = "red";

        if (verificaSupEsquerdo(linha, coluna, caracterAtual)) {
            if (tabuleiro[linha - 1][coluna - 1] == " ") {
                jogadasPossiveis.push((linha - 1) + "-" + (coluna - 1));
            } else {
                jogadasPossiveis.push((linha - 2) + "-" + (coluna - 2));
            }
        }

        if (verificaSupDireito(linha, coluna, caracterAtual)) {
            if (tabuleiro[linha - 1][coluna + 1] == " ") {
                jogadasPossiveis.push((linha - 1) + "-" + (coluna + 1));
            } else {
                jogadasPossiveis.push((linha - 2) + "-" + (coluna + 2));
            }
        }

        if (verificaInfEsquerdo(linha, coluna, caracterAtual)) {
            if (tabuleiro[linha + 1][coluna - 1] == " ") {
                jogadasPossiveis.push((linha + 1) + "-" + (coluna - 1));
            } else {
                jogadasPossiveis.push((linha + 2) + "-" + (coluna - 2));
            }
        }

        if (verificaInfDireito(linha, coluna, caracterAtual)) {
            if (tabuleiro[linha + 1][coluna + 1] == " ") {
                jogadasPossiveis.push((linha + 1) + "-" + (coluna + 1));
            } else {
                jogadasPossiveis.push((linha + 2) + "-" + (coluna + 2));
            }
        }

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

    if (linha - 1 >= 0 && coluna - 1 >= 0) {
        if (caracterAtual != "P" || oponentes.indexOf(tabuleiro[linha - 1][coluna - 1]) != -1) {
            if (tabuleiro[linha - 1][coluna - 1] == jogadorAtual) {
                return false;
            }
            if (tabuleiro[linha - 1][coluna - 1] == " ") {
                return true;
            } else if (oponentes.indexOf(tabuleiro[linha - 1][coluna - 1]) != -1) {
                if (linha - 2 >= 0 && coluna - 2 >= 0) {
                    if (tabuleiro[linha - 2][coluna - 2] == " ") {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function verificaSupDireito(linha, coluna, caracterAtual) {
    let oponentes = [];
    if (caracterAtual == "B" || caracterAtual == "DB") {
        oponentes = ["P", "DP"];
    } else {
        oponentes = ["B", "DB"];
    }

    if (linha - 1 >= 0 && coluna + 1 <= 7) {
        if (caracterAtual != "P" || oponentes.indexOf(tabuleiro[linha - 1][coluna + 1]) != -1) {
            if (tabuleiro[linha - 1][coluna + 1] == jogadorAtual) {
                return false;
            }
            if (tabuleiro[linha - 1][coluna + 1] == " ") {
                return true;
            } else if (oponentes.indexOf(tabuleiro[linha - 1][coluna + 1]) != -1) {
                if (linha - 2 >= 0 && coluna + 2 <= 7) {
                    if (tabuleiro[linha - 2][coluna + 2] == " ") {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function verificaInfEsquerdo(linha, coluna, caracterAtual) {
    let oponentes = [];
    if (caracterAtual == "B" || caracterAtual == "DB") {
        oponentes = ["P", "DP"];
    } else {
        oponentes = ["B", "DB"];
    }

    if (linha + 1 <= 7 && coluna - 1 >= 0) {
        if (caracterAtual != "B" || oponentes.indexOf(tabuleiro[linha + 1][coluna - 1]) != -1) {
            if (tabuleiro[linha + 1][coluna - 1] == caracterAtual) {
                return false;
            }
            if (tabuleiro[linha + 1][coluna - 1] == " ") {
                return true;
            } else if (oponentes.indexOf(tabuleiro[linha + 1][coluna - 1]) != -1) {
                if (linha + 2 <= 7 && coluna - 2 >= 0) {
                    if (tabuleiro[linha + 2][coluna - 2] == " ") {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function verificaInfDireito(linha, coluna, caracterAtual) {
    let oponentes = [];
    if (caracterAtual == "B" || caracterAtual == "DB") {
        oponentes = ["P", "DP"];
    } else {
        oponentes = ["B", "DB"];
    }

    if (linha + 1 <= 7 && coluna + 1 <= 7) {
        if (caracterAtual != "B" || oponentes.indexOf(tabuleiro[linha + 1][coluna + 1]) != -1) {
            if (tabuleiro[linha + 1][coluna + 1] == jogadorAtual) {
                return false;
            }
            if (tabuleiro[linha + 1][coluna + 1] == " ") {
                return true;
            } else if (oponentes.indexOf(tabuleiro[linha + 1][coluna + 1]) != -1) {
                if (linha + 2 <= 7 && coluna + 2 <= 7) {
                    if (tabuleiro[linha + 2][coluna + 2] == " ") {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function atualizaTabuleiro(tabuleiro) {

    elemento = document.getElementsByClassName("casa");

    var contador = 0;

    for (var i = 0; i < tabuleiro.length; i++) {
        for (var j = 0; j < tabuleiro[i].length; j++) {
            if (tabuleiro[i][j] == "P") {
                elemento[contador].classList.add("pecaPreta");
            } else if (tabuleiro[i][j] == "B") {
                elemento[contador].classList.add("pecaBranca");
            } else if (tabuleiro[i][j] == "DB") {
                elemento[contador].classList.add("pecaDamaBranca");
            } else if (tabuleiro[i][j] == "DP") {
                elemento[contador].classList.add("pecaDamaPreta");
            } else {
                if (elemento[contador].classList.contains("pecaPreta")) {
                    elemento[contador].classList.remove("pecaPreta");
                } else if (elemento[contador].classList.contains("pecaBranca")) {
                    elemento[contador].classList.remove("pecaBranca");
                } else if (elemento[contador].classList.contains("pecaDamaBranca")) {
                    elemento[contador].classList.remove("pecaDamaBranca");
                } else {
                    elemento[contador].classList.remove("pecaDamaPreta");
                }
            }
            contador++;
        }
    }
}

function eliminarPeca(linhaDest, colunaDest, linhaOrig, colunaOrig, tabuleiro) {

    linhaDest = Number(linhaDest);
    colunaDest = Number(colunaDest);
    linhaOrig = Number(linhaOrig);
    colunaOrig = Number(colunaOrig);

    if (linhaOrig - linhaDest == 2) {
        //Foi pra cima
        if (colunaOrig - colunaDest == 2) {
            //Foi pra esquerda superior
            if (tabuleiro[linhaOrig - 1][colunaOrig - 1] === "B") {
                totalPecasBrancas--;
            } else {
                totalPecasPretas--;
            }
            tabuleiro[linhaOrig - 1][colunaOrig - 1] = " ";
            //Foi pra direita superior
        } else if (colunaOrig - colunaDest == -2) {
            if (tabuleiro[linhaOrig - 1][colunaOrig + 1] === "B") {
                totalPecasBrancas--;
            } else {
                totalPecasBrancas--;
            }
            tabuleiro[linhaOrig - 1][colunaOrig + 1] = " "
        }
        //Foi pra baixo
    } else if (linhaOrig - linhaDest == -2) {
        //Esquerda inferior
        if (colunaOrig - colunaDest == 2) {
            if (tabuleiro[linhaOrig + 1][colunaOrig - 1] === "B") {
                totalPecasBrancas--;
            } else {
                totalPecasPretas--;
            }
            tabuleiro[linhaOrig + 1][colunaOrig - 1] = " ";
            //Direita inferior
        } else if (colunaOrig - colunaDest == -2) {
            if (tabuleiro[linhaOrig + 1][colunaOrig + 1] === "B") {
                totalPecasBrancas--;
            } else {
                totalPecasPretas--;
            }
            tabuleiro[linhaOrig + 1][colunaOrig + 1] = " ";
        }
    }
}

function transformaDama(linha, coluna, jogadorAtual) {
    if (jogadorAtual == "B") {
        tabuleiro[linha][coluna] = "DB";

    } else if (jogadorAtual == "P") {
        tabuleiro[linha][coluna] = "DP";
    }
}