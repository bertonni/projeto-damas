const fs = require('fs'); //file system
const express = require('express');
const hbs = require('hbs');
const app = express();
const porta = 3000;

app.use(express.static(__dirname + '/_css'));
app.use(express.static(__dirname + '/_img'));
app.use(express.static(__dirname + '/_js'));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/_html');

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


var totalPecasBrancas = 12;
var totalPecasPretas = 12;
var jogadorAtual = ["B", "DB"];
var contadorDamas = 0;
var contDamas = 0;
var contadorForca = 0;
var contForca = 0;
var jogadasPossiveis = [];
var destino = 'x';

var dados = {
    tabuleiro: tabuleiro,
    totalBrancas: totalPecasBrancas,
    totalPretas: totalPecasPretas,
    jogadorAtual: jogadorAtual,
    contadorDamas: contadorDamas,
    contadorForca: contadorForca,
    jogadasPossiveis: jogadasPossiveis,
    destino: destino
}

app.get('/', function (req, res) {
    fs.readFile('index.html', 'utf-8', function (err, data) {
        tabuleiro = [
            ["X", "P", "X", "P", "X", "P", "X", "P"],
            ["P", "X", "P", "X", "P", "X", "P", "X"],
            ["X", "P", "X", "P", "X", "P", "X", "P"],
            [" ", "X", " ", "X", " ", "X", " ", "X"],
            ["X", " ", "X", " ", "X", " ", "X", " "],
            ["B", "X", "B", "X", "B", "X", "B", "X"],
            ["X", "B", "X", "B", "X", "B", "X", "B"],
            ["B", "X", "B", "X", "B", "X", "B", "X"],
        ]



        dados = {
            tabuleiro: tabuleiro,
            totalBrancas: totalPecasBrancas,
            totalPretas: totalPecasPretas,
            jogadorAtual: jogadorAtual,
            contadorDamas: contadorDamas,
            contadorForca: contadorForca,
            jogadasPossiveis: jogadasPossiveis,
            destino: destino
        }
        res.send(data);
    });
});

app.get('/regras', function (req, res) {
    fs.readFile('_html/regras.html', 'utf-8', function (err, data) {
        res.send(data)
    });
});

app.get('/sobre', function (req, res) {
    fs.readFile('_html/sobre.html', 'utf-8', function (err, data) {
        res.send(data)
    });
});

app.get('/configuracoes', function (req, res) {
    fs.readFile('_html/configuracoes.html', 'utf-8', function (err, data) {
        res.send(data)
    });
});

app.get('/iframe', function (req, res) {
    fs.readFile('_html/iframe_regras.html', 'utf-8', function (err, data) {
        res.send(data)
    });
});

app.get('/reset', function (req, res) {

    tabuleiro = [
        ["X", "P", "X", "P", "X", "P", "X", "P"],
        ["P", "X", "P", "X", "P", "X", "P", "X"],
        ["X", "P", "X", "P", "X", "P", "X", "P"],
        [" ", "X", " ", "X", " ", "X", " ", "X"],
        ["X", " ", "X", " ", "X", " ", "X", " "],
        ["B", "X", "B", "X", "B", "X", "B", "X"],
        ["X", "B", "X", "B", "X", "B", "X", "B"],
        ["B", "X", "B", "X", "B", "X", "B", "X"],
    ]

    dados = {
        tabuleiro: tabuleiro,
        totalBrancas: totalPecasBrancas,
        totalPretas: totalPecasPretas,
        jogadorAtual: jogadorAtual,
        contadorDamas: contadorDamas,
        contadorForca: contadorForca,
        jogadasPossiveis: jogadasPossiveis,
        destino: destino
    }

    res.redirect('/jogar')
});

app.get('/jogar', function (req, res) {

    var quadrado = ``;

    for (var i = 0; i <= 7; i++) {
        for (var j = 0; j <= 7; j++) {
            if (tabuleiro[i][j] == "B") {
                quadrado += `<div class="casa pecaBranca"  id ="${i}-${j}" onclick="getPeca(${i} , ${j})"></div>`
            } else if (tabuleiro[i][j] == "P") {
                quadrado += `<div class="casa pecaPreta"  id ="${i}-${j}" onclick="getPeca(${i} , ${j})"></div>`
            } else if (tabuleiro[i][j] == "DB") {
                quadrado += `<div class="casa pecaDamaBranca"  id ="${i}-${j}" onclick="getPeca(${i} , ${j})"></div>`
            } else if (tabuleiro[i][j] == "DP") {
                quadrado += `<div class="casa pecaDamaPreta"  id ="${i}-${j}" onclick="getPeca(${i} , ${j})"></div>`
            } else {
                quadrado += `<div class="casa"  id ="${i}-${j}" onclick="getPeca(${i} , ${j})"></div>`
            }
        }
    }
    data = quadrado


    res.render('jogar', { data, dados });
});

app.get('/tratar/:lineEli/:colEli/:dest/:orig/:totP/:totB/:playerP/:playerD/:result/:for/:capSuc', function (req, res) {
    console.log(req.params.colEli);
    if (req.params.lineEli != undefined) {
        jogadasPossiveis = [];
        let oponente = [];
        oponente[0] = req.params.playerP == "B" ? "P" : "B";
        oponente[1] = req.params.playerD == "DB" ? "DP" : "DB";
        let orig = req.params.orig.split("-");
        let dest = req.params.dest.split("-");
        dest[0] = Number(dest[0]);
        dest[1] = Number(dest[1]);
        let totalPretas = req.params.totP;
        let totalBrancas = req.params.totB;
        let playerP = oponente[0];
        let playerD = oponente[1];
        let lineEli = req.params.lineEli;
        let colEli = req.params.colEli;
        let player = [];
        // player[0] = playerP;
        // player[1] = playerD;
        let atual = []
        atual[0] = req.params.playerP;
        atual[1] = req.params.playerD;

        //Condição empate (20 lances de Dama sucessivo)
        if (req.params.resul == "true") {
            contDamas++;
        } else {
            contDamas = 0;
        }

        //Condicão empate (Força Maior)
        if (req.params.for == 'BM' && totalPretas != 0) {
            contForca++;
        } else if (req.params.for == 'PM' && totalBrancas != 0) {
            contForca++;
        } else if (req.params.for == 'O') {
            contForca = 0;
        }

        //Computa a jogada
        let temp = tabuleiro[orig[0]][orig[1]];
        tabuleiro[orig[0]][orig[1]] = tabuleiro[dest[0]][dest[1]];
        tabuleiro[dest[0]][dest[1]] = temp;

        if (dest[0] == 0 && req.params.playerP == "B") {
            tabuleiro[dest[0]][dest[1]] = "DB";
        } else if (dest[0] == 7 && req.params.playerP == "P") {
            tabuleiro[dest[0]][dest[1]] = "DP";
        }

        if (req.params.lineEli != 'O') {
            tabuleiro[lineEli][colEli] = " ";
        }

        if (req.params.capSuc == 'true') {
            if ((dest[0] - 2) >= 0 && (dest[1] - 2) >= 0) {
                //Sup Esquerdo
                if (oponente.indexOf(tabuleiro[dest[0] - 1][dest[1] - 1]) != -1 && tabuleiro[dest[0] - 2][dest[1] - 2] == " ") {
                    jogadasPossiveis.push((dest[0] - 2) + "-" + (dest[1] - 2));
                }
            }

            if ((dest[0] - 2) >= 0 && (dest[1] + 2) <= 7) {
                //Sup Direito
                if (oponente.indexOf(tabuleiro[dest[0] - 1][dest[1] + 1]) != -1 && tabuleiro[dest[0] - 2][dest[1] + 2] == " ") {
                    jogadasPossiveis.push((dest[0] - 2) + "-" + (dest[1] + 2));
                }
            }

            if ((dest[0] + 2) <= 7 && (dest[1] - 2) >= 0) {
                //Inf Esquerdo
                if (oponente.indexOf(tabuleiro[dest[0] + 1][dest[1] - 1]) != -1 && tabuleiro[dest[0] + 2][dest[1] - 2] == " ") {
                    jogadasPossiveis.push((dest[0] + 2) + "-" + (dest[1] - 2));
                }
            }

            if ((dest[0] + 2) <= 7 && (dest[1] + 2) <= 7) {
                //Inf Direito
                if (oponente.indexOf(tabuleiro[dest[0] + 1][dest[1] + 1]) != -1 && tabuleiro[dest[0] + 2][dest[1] + 2] == " ") {
                    jogadasPossiveis.push((dest[0] + 2) + "-" + (dest[1] + 2));
                }
            }

            if (jogadasPossiveis.length > 0) {
                player = atual;
            } else {
                player[0] = playerP;
                player[1] = playerD;
            }
        } else {
            player[0] = playerP;
            player[1] = playerD;
        }

        var atualizado = {
            tabuleiro: tabuleiro,
            totalBrancas: totalBrancas,
            totalPretas: totalPretas,
            jogadorAtual: player,
            contadorDamas: contDamas,
            contadorForca: contForca,
            jogadasPossiveis: jogadasPossiveis,
            destino: req.params.dest
        }

        dados = atualizado;
    }

    res.redirect('/jogar');
});



app.listen(porta, () => console.log('Escutando na porta', porta));






