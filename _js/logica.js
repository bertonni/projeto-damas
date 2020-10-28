
var contador = 0;
var ultimaJogada = "";
var jogadorAtual = "B";
var oponente;
var ultimaPosicaoValidaSupDir = "";
var ultimaPosicaoValidaSupEsq = "";
var ultimaPosicaoValidaInfEsq = "";
var ultimaPosicaoValidaInfDir = "";
var elemento;

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
    oponente = jogadorAtual == "B" ? "P" : "B";

    if (tabuleiro[linha][coluna] == oponente) {
        return;
    }
    if (tabuleiro[linha][coluna] == "X") {
        return;
    }

    if (contador == 1) {
        if (tabuleiro[linha][coluna] == " ") {
            if(indicesjogadasPossiveis.indexOf(linha + "-" + coluna) == -1){
                document.getElementById(ultimaJogada).style.backgroundColor = "initial";
                return;
            }
            var stringDividida = ultimaJogada.split("-");
            var ultimaLinha = stringDividida[0];
            var ultimaColuna = stringDividida[1];
            var temp = tabuleiro[linha][coluna];
            tabuleiro[linha][coluna] = tabuleiro[ultimaLinha][ultimaColuna];
            tabuleiro[ultimaLinha][ultimaColuna] = temp;
            
            atualizaTabuleiro(tabuleiro);
            document.getElementById(ultimaJogada).style.backgroundColor = "initial";
            jogadorAtual = oponente;
        } else if (tabuleiro[linha][coluna] == jogadorAtual) {
            document.getElementById(linha + "-" + coluna).style.backgroundColor = "red";
            document.getElementById(ultimaJogada).style.backgroundColor = "initial";

            if (verificaSupEsquerdo(linha, coluna, jogadorAtual)) {
                if (tabuleiro[linha - 1][coluna - 1] == " ") {
                    jogadasPossiveis.push((linha - 1) + "-" + (coluna - 1));
                } else {
                    jogadasPossiveis.push((linha - 2) + "-" + (coluna - 2));
                }
            }

            if (verificaSupDireito(linha, coluna, jogadorAtual)) {
                if (tabuleiro[linha - 1][coluna + 1] == " ") {
                    jogadasPossiveis.push((linha - 1) + "-" + (coluna + 1));
                } else {
                    jogadasPossiveis.push((linha - 2) + "-" + (coluna + 2));
                }
            }

            if (verificaInfEsquerdo(linha, coluna, jogadorAtual)) {
                if (tabuleiro[linha + 1][coluna - 1] == " ") {
                    jogadasPossiveis.push((linha + 1) + "-" + (coluna - 1));
                } else {
                    jogadasPossiveis.push((linha + 2) + "-" + (coluna - 2));
                }
            }

            if (verificaInfDireito(linha, coluna, jogadorAtual)) {
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
        if (tabuleiro[linha][coluna] == " ") {
            return;
        }

        document.getElementById(linha + "-" + coluna).style.backgroundColor = "red";

        if (verificaSupEsquerdo(linha, coluna, jogadorAtual)) {
            if (tabuleiro[linha - 1][coluna - 1] == " ") {
                jogadasPossiveis.push((linha - 1) + "-" + (coluna - 1));
            } else {
                jogadasPossiveis.push((linha - 2) + "-" + (coluna - 2));
            }
        }

        if (verificaSupDireito(linha, coluna, jogadorAtual)) {
            if (tabuleiro[linha - 1][coluna + 1] == " ") {
                jogadasPossiveis.push((linha - 1) + "-" + (coluna + 1));
            } else {
                jogadasPossiveis.push((linha - 2) + "-" + (coluna + 2));
            }
        }

        if (verificaInfEsquerdo(linha, coluna, jogadorAtual)) {
            if (tabuleiro[linha + 1][coluna - 1] == " ") {
                jogadasPossiveis.push((linha + 1) + "-" + (coluna - 1));
            } else {
                jogadasPossiveis.push((linha + 2) + "-" + (coluna - 2));
            }
        }

        if (verificaInfDireito(linha, coluna, jogadorAtual)) {
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

function verificaSupEsquerdo(linha, coluna, jogadorAtual) {
    oponente = jogadorAtual == "B" ? "P" : "B";
    if (linha - 1 >= 0 && coluna - 1 >= 0) {
        if (jogadorAtual != "P" || tabuleiro[linha - 1][coluna - 1] == oponente) {
            if (tabuleiro[linha - 1][coluna - 1] == jogadorAtual) {
                return false;
            }
            if (tabuleiro[linha - 1][coluna - 1] == " ") {
                return true;
            } else if (tabuleiro[linha - 1][coluna - 1] == oponente) {
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

function verificaSupDireito(linha, coluna, jogadorAtual) {
    oponente = jogadorAtual == "B" ? "P" : "B";
    if (linha - 1 >= 0 && coluna + 1 <= 7) {
        if (jogadorAtual != "P" || tabuleiro[linha - 1][coluna + 1] == oponente) {
            if (tabuleiro[linha - 1][coluna + 1] == jogadorAtual) {
                return false;
            }
            if (tabuleiro[linha - 1][coluna + 1] == " ") {
                return true;
            } else if (tabuleiro[linha - 1][coluna + 1] == oponente) {
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

function verificaInfEsquerdo(linha, coluna, jogadorAtual) {
    oponente = jogadorAtual == "B" ? "P" : "B";
    if (linha + 1 <= 7 && coluna - 1 >= 0) {
        if (jogadorAtual != "B" || tabuleiro[linha + 1][coluna - 1] == oponente) {
            if (tabuleiro[linha + 1][coluna - 1] == jogadorAtual) {
                return false;
            }
            if (tabuleiro[linha + 1][coluna - 1] == " ") {
                return true;
            } else if (tabuleiro[linha + 1][coluna - 1] == oponente) {
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

function verificaInfDireito(linha, coluna, jogadorAtual) {
    oponente = jogadorAtual == "B" ? "P" : "B";
    if (linha + 1 <= 7 && coluna + 1 <= 7) {
        if (jogadorAtual != "B" || tabuleiro[linha + 1][coluna + 1] == oponente) {
            if (tabuleiro[linha + 1][coluna + 1] == jogadorAtual) {
                return false;
            }
            if (tabuleiro[linha + 1][coluna + 1] == " ") {
                return true;
            } else if (tabuleiro[linha + 1][coluna + 1] == oponente) {
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
            } else {
                elemento[contador].classList.remove("pecaPreta", "pecaBranca");
            }
            contador++;
        }
    }
}