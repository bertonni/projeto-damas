const fs = require('fs'); //file system
const express = require('express');
const hbs = require('hbs');
const app = express();

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
var totalPecasPretas = 12;
var jogadorAtual = ["B", "DB"];
var destino = null;
var origem = null;

var dados = {
    tabuleiro: tabuleiro,
    totalBrancas: totalPecasBrancas,
    totalPretas: totalPecasPretas,
    jogadorAtual: jogadorAtual,
    destino: destino,
    origem: origem
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
    fs.readFile('_html/jogar.html', 'utf-8', function(err,data){
 
        console.log(__dirname)

        var quadrado = ``;

        for(var i = 0; i <= 7; i++){ 
            for(var j = 0; j <= 7; j++){
                if(tabuleiro[i][j] == "B"){
                    quadrado += `<div class="casa pecaBranca"  id ="${i}-${j}" onclick="getPeca(${i} , ${j})"></div>`
                } else if(tabuleiro[i][j] == "P"){
                    quadrado += `<div class="casa pecaPreta"  id ="${i}-${j}" onclick="getPeca(${i} , ${j})"></div>`
                } else{
                    quadrado += `<div class="casa"  id ="${i}-${j}" onclick="getPeca(${i} , ${j})"></div>`
                }
            }
        }

        data = quadrado
        res.render('jogar', {data,dados});
    });
});

app.listen(3000); 






