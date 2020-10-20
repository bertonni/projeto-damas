const fs = require('fs'); //file system
const express = require('express');

const app = express();

app.get('/',function(req,res){
    fs.readFile('../_html/jogar.html', 'utf-8', function(err,data){
 
        var quadrado = `
        <square class="quadrado" onclick = "getPeca(0,0)"></square>
        `;

        data = data.replace(/_QUADRADO_/, quadrado)
        res.send(data)
    });
});

app.listen(3000); 

function getPeca(linha,coluna){

}


