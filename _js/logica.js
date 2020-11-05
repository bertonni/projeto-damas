
var contador = 0;
var ultimaJogada = "";
var jogadorAtual = playerAtual
var caracterAtual = "";
var oponente = [];
var elemento;
var totalPecasBrancas = totalBrancas;
var totalPecasPretas = totalPretas;

var jogadasPossiveis = [];
var indicesjogadasPossiveis = [];

var tabuleiro = array;

    document.getElementById("quantPecasBrancas").innerHTML=totalPecasBrancas;
    document.getElementById("quantPecasPretas").innerHTML=totalPecasPretas;

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
             if (indicesjogadasPossiveis.indexOf(linha + "-" + coluna) == -1){
                 document.getElementById(ultimaJogada).style.backgroundColor = "initial";
                 return;
            }
     
            var stringDividida = ultimaJogada.split("-");
            var ultimaLinha = stringDividida[0];
            var ultimaColuna = stringDividida[1];
            var temp = tabuleiro[linha][coluna];
            tabuleiro[linha][coluna] = tabuleiro[ultimaLinha][ultimaColuna];
            tabuleiro[ultimaLinha][ultimaColuna] = temp;
            
            eliminarPeca(linha, coluna, ultimaLinha, ultimaColuna, tabuleiro);
            

            if (linha == 0 && jogadorAtual[0] == "B") {
                transformaDama(linha, coluna, jogadorAtual[0]);
            } else if (linha == 7 && jogadorAtual[0] == "P") {
                transformaDama(linha, coluna, jogadorAtual[0]);
            }
            
            atualizaTabuleiro(tabuleiro);

            if(totalPecasBrancas == 0){
                alert("O preto ganhou!");
            } else if(totalPecasPretas == 0){
                alert("O branco ganhou!");
            }
            contador = 0;

            document.getElementById(ultimaJogada).style.backgroundColor = "initial";

            jogadorAtual[0] = oponente[0];
            jogadorAtual[1] = oponente[1];

            if(jogadorAtual[0]== "B"){
                document.getElementById("vez").setAttribute("src" , "pecaBranca.png");
            } else if(jogadorAtual[0]== "P"){
                document.getElementById("vez").setAttribute("src" , "pecaPreta.png");
            }

            return;

        } else if (jogadorAtual.indexOf(tabuleiro[linha][coluna]) != -1) {
            document.getElementById(ultimaJogada).style.backgroundColor = "initial";
            document.getElementById(linha + "-" + coluna).style.backgroundColor = "red";

            verificaSupEsquerdo(linha,coluna,caracterAtual);
            verificaSupDireito(linha,coluna,caracterAtual);
            verificaInfEsquerdo(linha,coluna,caracterAtual);
            verificaInfDireito(linha,coluna,caracterAtual);

            ultimaJogada = linha + "-" + coluna;
        } else {
            //contador = 0;
        }

    } else if (contador == 0) {
        if (tabuleiro[linha][coluna] == " ") {
            return;
        }

        document.getElementById(linha + "-" + coluna).style.backgroundColor = "red";

            verificaSupEsquerdo(linha,coluna,caracterAtual);
            verificaSupDireito(linha,coluna,caracterAtual);
            verificaInfEsquerdo(linha,coluna,caracterAtual);
            verificaInfDireito(linha,coluna,caracterAtual);

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
    let amigos = [];
    if (caracterAtual == "B" || caracterAtual == "DB") {
        oponentes = ["P", "DP"];
    } else {
        oponentes = ["B", "DB"];
    }

    if((linha - 1) < 0 || (coluna - 1) < 0 || jogadorAtual.indexOf(tabuleiro[linha - 1][coluna - 1]) != -1 || oponentes.indexOf(tabuleiro[linha][coluna]) != -1 && oponentes.indexOf(tabuleiro[linha - 1][coluna - 1]) != -1){
        return;
    } else {
        if(tabuleiro[linha - 1][coluna - 1] == " "){
            jogadasPossiveis.push((linha - 1) + "-" + (coluna - 1));
            if(caracterAtual != "DB" && caracterAtual != "DP" || oponentes.indexOf(tabuleiro[linha][coluna]) != -1){
                return;
            }
        }
        return verificaSupEsquerdo((linha - 1) , (coluna - 1) , caracterAtual);

    }
}

function verificaSupDireito(linha, coluna, caracterAtual) {
    let oponentes = [];
    if (caracterAtual == "B" || caracterAtual == "DB") {
        oponentes = ["P", "DP"];
    } else {
        oponentes = ["B", "DB"];
    }

    if((linha - 1) < 0 || (coluna + 1) > 7 || jogadorAtual.indexOf(tabuleiro[linha - 1][coluna + 1]) != -1 || oponentes.indexOf(tabuleiro[linha][coluna]) != -1 && oponentes.indexOf(tabuleiro[linha - 1][coluna + 1]) != -1){
        return;
    } else {
        if(tabuleiro[linha - 1][coluna + 1] == " "){
            jogadasPossiveis.push((linha - 1) + "-" + (coluna + 1));
            if(caracterAtual != "DB" && caracterAtual != "DP" || oponentes.indexOf(tabuleiro[linha][coluna]) != -1){
                return;
            }
        }
        return verificaSupDireito((linha - 1) , (coluna + 1) , caracterAtual);
    }
}

function verificaInfEsquerdo(linha, coluna, caracterAtual) {
    let oponentes = [];
    if (caracterAtual == "B" || caracterAtual == "DB") {
        oponentes = ["P", "DP"];
    } else {
        oponentes = ["B", "DB"];
    }

    if((linha + 1) > 7 || (coluna - 1) < 0 || jogadorAtual.indexOf(tabuleiro[linha + 1][coluna - 1]) != -1 || oponentes.indexOf(tabuleiro[linha][coluna]) != -1 && oponentes.indexOf(tabuleiro[linha + 1][coluna - 1]) != -1){
        return;
    } else {
        if(tabuleiro[linha + 1][coluna - 1] == " "){
            jogadasPossiveis.push((linha + 1) + "-" + (coluna - 1));
            if(caracterAtual != "DB" && caracterAtual != "DP" || oponentes.indexOf(tabuleiro[linha][coluna]) != -1){
                return;
            }
        }
        return verificaInfEsquerdo((linha + 1) , (coluna - 1) , caracterAtual);

    }
}

function verificaInfDireito(linha, coluna, caracterAtual) {
    let oponentes = [];
    if (caracterAtual == "B" || caracterAtual == "DB") {
        oponentes = ["P", "DP"];
    } else {
        oponentes = ["B", "DB"];
    }

    if((linha + 1) > 7 || (coluna + 1) > 7 || jogadorAtual.indexOf(tabuleiro[linha + 1][coluna + 1]) != -1 || oponentes.indexOf(tabuleiro[linha][coluna]) != -1 && oponentes.indexOf(tabuleiro[linha + 1][coluna + 1]) != -1){
        return;
    } else {
        if(tabuleiro[linha + 1][coluna + 1] == " "){
            jogadasPossiveis.push((linha + 1) + "-" + (coluna + 1));
            if(caracterAtual != "DB" && caracterAtual != "DP" || oponentes.indexOf(tabuleiro[linha][coluna]) != -1){
                return;
            }
        }
        return verificaInfDireito((linha + 1) , (coluna + 1) , caracterAtual);

    }
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
        if (colunaOrig - colunaDest == 2 ) {
            //Foi pra esquerda superior
            if (tabuleiro[linhaOrig - 1][colunaOrig - 1] === "B" || tabuleiro[linhaOrig - 1][colunaOrig - 1] === "DB") {
                totalPecasBrancas--;
            } else {
                totalPecasPretas--;
            }
            tabuleiro[linhaOrig - 1][colunaOrig - 1] = " ";
            //Foi pra direita superior
        } else if (colunaOrig - colunaDest == -2) {
            if (tabuleiro[linhaOrig - 1][colunaOrig + 1] === "B" || tabuleiro[linhaOrig - 1][colunaOrig + 1] === "DB") {
                totalPecasBrancas--;
            } else {
                totalPecasPretas--;
            }
            tabuleiro[linhaOrig - 1][colunaOrig + 1] = " "
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
            tabuleiro[linhaOrig + 1][colunaOrig - 1] = " ";
            //Direita inferior
        } else if (colunaOrig - colunaDest == -2) {
            if (tabuleiro[linhaOrig + 1][colunaOrig + 1] === "B" || tabuleiro[linhaOrig + 1][colunaOrig + 1] === "DB") {
                totalPecasBrancas--;
            } else {
                totalPecasPretas--;
            }
            tabuleiro[linhaOrig + 1][colunaOrig + 1] = " ";
        }
        //Dama foi pra cima
    } else if(linhaOrig - linhaDest > 2){
            //Dama foi pra esquerda superior
        if(colunaOrig - colunaDest > 2){
            if(tabuleiro[linhaDest + 1][colunaDest + 1] === "B" || tabuleiro[linhaDest + 1][colunaDest + 1] === "DB"){
                totalPecasBrancas--;
            } else {
                totalPecasPretas--;
            }
            tabuleiro[linhaDest + 1][colunaDest + 1] = " ";
            //Dama foi pra direita superior
        } else if(colunaOrig - colunaDest < -2){
            if(tabuleiro[linhaDest + 1][colunaDest - 1] === "B" || tabuleiro[linhaDest + 1][colunaDest - 1] === "DB"){
                totalPecasBrancas--;
            } else {
                totalPecasPretas--;
            }
            tabuleiro[linhaDest + 1][colunaDest - 1] = " ";
        }
        //Dama foi pra baixo
    } else if(linhaOrig - linhaDest < -2){
            //Dama foi pra esquerda inferior
        if(colunaOrig - colunaDest > 2){
            if(tabuleiro[linhaDest - 1][colunaDest + 1] === "B" || tabuleiro[linhaDest - 1][colunaDest + 1] === "DB"){
                totalPecasBrancas--;
            } else {
                totalPecasPretas--;
            }
            tabuleiro[linhaDest - 1][colunaDest + 1] = " ";
            //Dama foi pra direita inferior
        } else if(colunaOrig - colunaDest < - 2){
            if(tabuleiro[linhaDest - 1][colunaDest - 1] === "B" || tabuleiro[linhaDest - 1][colunaDest - 1] === "DB"){
                totalPecasBrancas--;
            } else {
                totalPecasPretas--;
            }
            tabuleiro[linhaDest - 1][colunaDest - 1] = " ";
        }
    }
    document.getElementById("quantPecasBrancas").innerHTML=totalPecasBrancas;
    document.getElementById("quantPecasPretas").innerHTML=totalPecasPretas;
}

function transformaDama(linha, coluna, jogadorAtual) {
    if (jogadorAtual == "B") {
        tabuleiro[linha][coluna] = "DB";

    } else if (jogadorAtual == "P") {
        tabuleiro[linha][coluna] = "DP";
    }
}