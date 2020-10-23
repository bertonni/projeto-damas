
var contador = 0;
var ultimaJogada = "";
var jogadorAtual = "B";
var oponente;
var ultimaPosicaoValidaSupDir = "";
var ultimaPosicaoValidaSupEsq = "";
var ultimaPosicaoValidaInfDir = "";
var ultimaPosicaoValidaInfEsq = "";


var tabuleiro = [
    ["X", "P", "X", "P", "X", "P", "X","P"],
    ["P","X", "P", "X", "P", "X", "P", "X"],
    ["X", "P", "X", "P", "X", "P", "X","P"],
    [" ","X", " ", "X", " ", "X", " ", "X"],
    ["X", " ", "X", " ", "X", " ", "X"," "],
    ["B","X", "B", "X", "B", "X", "B", "X"],
    ["X", "B", "X", "B", "X", "B", "X","B"],
    ["B","X", "B", "X", "B", "X", "B", "X"],
]

function getPeca(linha,coluna){
    if(tabuleiro[linha][coluna] == "X"){
        return;
    }
    if(contador == 1){
        if(tabuleiro[linha][coluna] == jogadorAtual){
            document.getElementById(ultimaJogada).style.backgroundColor="initial";
            document.getElementById(linha + "-" + coluna).style.backgroundColor="red";
            document.getElementById(ultimaPosicaoValidaSupEsq).style.backgroundColor="initial";
            document.getElementById(ultimaPosicaoValidaSupDir).style.backgroundColor="initial";
            verificaSupEsquerdo(linha,coluna,jogadorAtual);
            verificaSupDireito(linha,coluna,jogadorAtual);
            ultimaJogada = linha + "-" + coluna;
        } else {
            contador = 0;
        }
    } else if(contador == 0){
        if(tabuleiro[linha][coluna] == " "){
            return;
        }
        document.getElementById(linha + "-" + coluna).style.backgroundColor="red";
        verificaSupEsquerdo(linha,coluna,jogadorAtual);
        verificaSupDireito(linha,coluna,jogadorAtual);
        contador++
        ultimaJogada = linha + "-" + coluna;
    }

    console.log(contador)
    console.log(linha,coluna)

}

function verificaSupEsquerdo(linha,coluna,jogadorAtual){
    oponente = jogadorAtual == "B"? "P": "B";
    if(linha - 1 >= 0 && coluna - 1 >= 0){
        if(tabuleiro[linha - 1][coluna - 1] == " "){
            document.getElementById((linha - 1) + "-" + (coluna - 1)).style.backgroundColor="#49cc37";
            ultimaPosicaoValidaSupEsq = (linha-1) + "-" + (coluna-1);
            return true;
        } else if(tabuleiro[linha-1][coluna-1] == oponente){
            if(linha - 2 >= 0 && coluna - 2 >= 0){
                if(tabuleiro[linha - 2][coluna - 2] == " "){
                    document.getElementById((linha - 2) + "-" + (coluna - 2)).style.backgroundColor="#49cc37";
                    ultimaPosicaoValidaSupEsq = (linha-1) + "-" + (coluna-1);
                    return true;
                }
            }
        }
    } 
    return false;
}

function verificaSupDireito(linha,coluna,jogadorAtual){
    oponente = jogadorAtual == "B"? "P": "B";
    if(linha - 1 >= 0 && coluna + 1 <= 7){
        if(tabuleiro[linha - 1][coluna + 1] == " "){
            document.getElementById((linha - 1) + "-" + (coluna + 1)).style.backgroundColor="#49cc37";
            ultimaPosicaoValidaSupDir = (linha-1) + "-" + (coluna+1);
            return true;
        } else if(tabuleiro[linha-1][coluna+1] == oponente){
            if(linha - 2 >= 0 && coluna + 2 >= 0){
                if(tabuleiro[linha - 2][coluna + 2] == " "){
                    document.getElementById((linha - 2) + "-" + (coluna + 2)).style.backgroundColor="#49cc37";
                    ultimaPosicaoValidaSupDir = (linha-1) + "-" + (coluna+1);
                    return true;
                }
            }
        }
    } 
    return false;
}