const fs = require('fs'); //file system
const express = require('express');
const hbs = require('hbs');
const app = express();
const porta = 3000;

app.use(express.static(__dirname + '/_css'));
app.use(express.static(__dirname + '/_img'));
app.use(express.static(__dirname + '/_js'));

app.set('view engine', 'hbs');
app.set('views' , __dirname + '/_html');

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
var totalPecasPretas = 8;
var jogadorAtual = ["B", "DB"];
var contadorDamas = 0;
var contDamas = 0;
var contadorForca = 0;
var contForca = 0;

var dados = {
    tabuleiro: tabuleiro,
    totalBrancas: totalPecasBrancas,
    totalPretas: totalPecasPretas,
    jogadorAtual: jogadorAtual,
    contadorDamas: contadorDamas,
    contadorForca: contadorForca
}

app.get('/',function(req,res){
    fs.readFile('index.html','utf-8', function(err,data){
        res.send(data)
    });
});    

app.get('/regras',function(req,res){
    fs.readFile('_html/regras.html','utf-8', function(err,data){
        res.send(data)
    });
});  

app.get('/sobre',function(req,res){
    fs.readFile('_html/sobre.html','utf-8', function(err,data){
        res.send(data)
    });
});  

app.get('/configuracoes',function(req,res){
    fs.readFile('_html/configuracoes.html','utf-8', function(err,data){
        res.send(data)
    });
});  

app.get('/iframe',function(req,res){
    fs.readFile('_html/iframe_regras.html','utf-8', function(err,data){
        res.send(data)
    });
});  

app.get('/jogar',function(req,res){

        var quadrado = ``;


        // lineEli= '&colEli='  '&dest='  '&orig='  '&totP='  '&totB='  '&playerP='  '&playerD=';
        
        
        if(req.query.lineEli != undefined ){
            let oponente = [];
            oponente[0] = req.query.playerP == "B" ? "P" : "B";
            oponente[1] = req.query.playerD == "DB" ? "DP" : "DB";
            let orig = req.query.orig.split("-");
            let dest = req.query.dest.split("-");
            let totalPretas = req.query.totP;
            let totalBrancas = req.query.totB;
            let playerP = oponente[0];
            let playerD = oponente[1];
            let lineEli = req.query.lineEli;
            let colEli = req.query.colEli;
            let player = [];
            player[0] = playerP;
            player[1] = playerD;

            //Condição empate (20 lances de Dama sucessivo)
            if(req.query.resul == "true"){
                contDamas++;
            } else {
                contDamas = 0;
            }

            //Condicão empate (Força Maior)
            if(req.query.for == 'BM' && totalPretas != 0){
                contForca++;
            } else if(req.query.for == 'PM' && totalBrancas !=0){
                contForca++;
            } else if(req.query.for == 'O'){
                contForca = 0;
            }

            //Computa a jogada
            let temp = tabuleiro[orig[0]][orig[1]];
            tabuleiro[orig[0]][orig[1]] = tabuleiro[dest[0]][dest[1]];
            tabuleiro[dest[0]][dest[1]] = temp;
            
            if(dest[0] == 4 && req.query.playerP == "B"){
                tabuleiro[dest[0]][dest[1]] = "DB";
            } else if(dest[0] == 3 && req.query.playerP == "P"){
                tabuleiro[dest[0]][dest[1]] = "DP";
            }

            if(req.query.lineEli != 'O'){
                tabuleiro[lineEli][colEli] = " ";
            }

            var atualizado = {
                tabuleiro: tabuleiro,
                totalBrancas: totalBrancas,
                totalPretas: totalPretas,
                jogadorAtual: player,
                contadorDamas: contDamas,
                contadorForca: contForca
            }

            dados = atualizado;
        }

        if(req.query.reset == 'true'){
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
                contadorForca: contadorForca
            }
        }

        for(var i = 0; i <= 7; i++){ 
            for(var j = 0; j <= 7; j++){
                if(tabuleiro[i][j] == "B"){
                    quadrado += `<div class="casa pecaBranca"  id ="${i}-${j}" onclick="getPeca(${i} , ${j})"></div>`
                } else if(tabuleiro[i][j] == "P"){
                    quadrado += `<div class="casa pecaPreta"  id ="${i}-${j}" onclick="getPeca(${i} , ${j})"></div>`
                } else if(tabuleiro[i][j]=="DB"){
                    quadrado += `<div class="casa pecaDamaBranca"  id ="${i}-${j}" onclick="getPeca(${i} , ${j})"></div>`
                } else if(tabuleiro[i][j] == "DP"){
                    quadrado += `<div class="casa pecaDamaPreta"  id ="${i}-${j}" onclick="getPeca(${i} , ${j})"></div>`
                } else{
                    quadrado += `<div class="casa"  id ="${i}-${j}" onclick="getPeca(${i} , ${j})"></div>`
                }
            }
        }
        data = quadrado

        
        res.render('jogar', {data,dados});
});

app.listen(porta, ()=>console.log('Escutando na porta',porta)); 






