const fs = require('fs'); //file system
const express = require('express'); //módulo express
const hbs = require('hbs'); //handlebars
const app = express();
const porta = 3000; //Define a porta a ser usada no localhost

//Inclui os diretórios na "raiz" do servidor
app.use(express.static(__dirname + '/_css'));
app.use(express.static(__dirname + '/_img'));
app.use(express.static(__dirname + '/_js'));

//Define o tipo de view(hbs)
app.set('view engine', 'hbs');
app.set('views', __dirname + '/_html');


//Define o tabuleiro 
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

//Declaração de variáveis
var totalPecasBrancas = 12;
var totalPecasPretas = 12;
var jogadorAtual = ["B", "DB"];
var contadorDamas = 0;
var contDamas = 0;
var contadorForca = 0;
var contForca = 0;
var jogadasPossiveis = [];
var destino = 'x';
var hasWinner = false;
var hasDraw = false;
var giveUp = false;

var winner = {
  name: null,
  condition: null
}

var draw = {
  condition: null
}

var giveup = {
  winner: null,
  condition: null
}

//Criação de um objeto dados que vai ser retornado ao cliente
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

//Rota principal que vai para o jogar.html
app.get('/', function (req, res) {
  fs.readFile('index.html', 'utf-8', function (err, data) {
    //Seta o tabuleiro 
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
    //Reseta dados para seu estado original
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
    //Envia os dados pro cliente
    res.send(data);
  });
});

//Rota para a página de regras
app.get('/regras', function (req, res) {
  fs.readFile('_html/regras.html', 'utf-8', function (err, data) {
    res.send(data)
  });
});

//Rota para a página sobre
app.get('/sobre', function (req, res) {
  fs.readFile('_html/sobre.html', 'utf-8', function (err, data) {
    res.send(data)
  });
});

//Rota para a página de configurações
app.get('/configuracoes', function (req, res) {
  fs.readFile('_html/configuracoes.html', 'utf-8', function (err, data) {
    res.send(data)
  });
});

//Carrega o conteúdo do iframe que está na página de regras
app.get('/iframe', function (req, res) {
  fs.readFile('_html/iframe_regras.html', 'utf-8', function (err, data) {
    res.send(data)
  });
});

//Rota de reset do tabuleiro e suas variáveis
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

  hasWinner = false;
  hasDraw = false;
  giveUp = false;

  winner = {
    name: null,
    condition: null
  }

  draw = {
    condition: null
  }

  giveup = {
    winner: null,
    condition: null
  }

  //Redireciona para a rota jogar
  res.redirect('/jogar')
});

app.get('/giveup/:currentPlayer', function (req, res) {
  giveUp = true;
  giveup = {
    winner: req.params.currentPlayer === "B" ? "As peças Pretas venceram o jogo! Parabéns!" : "As peças Brancas venceram o jogo! Parabéns!",
    condition: "O adversário desistiu do jogo!"
  }
  res.redirect('/jogar');
})

app.get('/afogadas/:player', function (req, res) {
  hasWinner = true;
  winner = {
    name: req.params.player === "B" ? "As peças Pretas venceram o jogo! Parabéns!" : "As peças Brancas venceram o jogo! Parabéns!",
    condition: "O adversário não possuia jogadas válidas!"
  }
  res.redirect('/jogar');
});

//Rota jogar onde teremos o tabuleiro e o jogo
app.get('/jogar', function (req, res) {

  //Criação das div's do tabuleiro
  var quadrado = hasWinner || hasDraw || giveUp ? `<div class="tabuleiro naoClicavel">` : `<div class="tabuleiro">`;
  var currentPlayer = ``;

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
  quadrado += `</div>`;

  let giveupButton = hasWinner || hasDraw || giveUp ? `<a id='desistir' class='naoClicavel' href='#' onclick='desistir();'>Desistir</a>` : `<a id='desistir' href='#' onclick="desistir();">Desistir</a>`;

  currentPlayer = dados.jogadorAtual[0] === "B" ? `<img src="pecaBranca.png" alt="" height="45px" width="45px" id="vez" />` : `<img src="pecaPreta.png" alt="" height="45px" width="45px" id="vez" />`;


  let board = quadrado
  //Renderiza a view passando as váriaveis para o template 'jogar'
  res.render('jogar', { board, dados, currentPlayer, hasWinner, hasDraw, giveUp, winner, draw, giveup, giveupButton });
});

//Recebe os dados do cliente (quando há uma jogada) e tratar esses dados
app.get('/tratar/:lineEli/:colEli/:dest/:orig/:totP/:totB/:playerP/:playerD/:result/:for/:capSuc', function (req, res) {
  //Se lineEli for diferente de undefined houve uma requisição do cliente
  if (req.params.lineEli != undefined) {
    //Recebimento de variáveis do servidor para variáveis para uso 
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
    //Jogador atual
    let atual = []
    atual[0] = req.params.playerP;
    atual[1] = req.params.playerD;

    //Condição empate (20 lances de Dama sucessivos)
    if (req.params.result == "true") {
      contDamas++;
    } else {
      contDamas = 0;
    }

    if (contDamas == 20) {
      hasDraw = true;
      draw = {
        condition: "20 jogadas de damas sucessivas sem captura"
      };
    }

    if (totalBrancas == 0) {
      hasWinner = true;
      winner = {
        name: "Pretas",
        condition: "Todas as peças adversárias foram capturadas"
      }
    }

    if (totalPretas == 0) {
      hasWinner = true;
      winner = {
        name: "Brancas",
        condition: "Todas as peças adversárias foram capturadas"
      }
    }

    //Condicão empate (Força Maior)
    if (req.params.for == 'BM' && totalPretas != 0) {
      contForca++;
    } else if (req.params.for == 'PM' && totalBrancas != 0) {
      contForca++;
    } else if (req.params.for == 'O') {
      contForca = 0;
    }

    if (contForca == 20) {
      hasDraw = true;
      draw = {
        condition: "20 jogadas com 2 ou mais damas de vantagem para o adversário sem encerrar o jogo"
      }
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






