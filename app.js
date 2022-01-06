function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var allText = "";
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}

function stringToMatrix(data){
    vrstice = data.split("\r\n");
    let matrix = [];
    for(let i = 0 ; i < vrstice.length;i++){
        let line = []

        for(let num of vrstice[i].split(",")){
            line.push(num);
        }
        if(line.length > 1)
            matrix.push(line)
    }
    return matrix;
}

function consolePrintMatrix(matrix){
    let print = ""
    for(let vrstica of matrix){
        let string_vrstica = ""
        for(let num of vrstica){
            if (num >= 0 && num < 10){
                string_vrstica +=" " + num;
            }
            else{
                string_vrstica +=num;
            }
        }
        print += string_vrstica + "\n";
    }
    console.log(print);
}

function drawMatrix(matrix){
    //ctx.clearRect(0,0, canvas.width, canvas.height);
    for(let i in matrix){
        for(let j in matrix[i]){
            if(matrix[i][j] >=0) ctx.fillStyle="#8c8c8c";
            else if(matrix[i][j] == -1) ctx.fillStyle="#000000";
            else if(matrix[i][j] == -2) ctx.fillStyle="#ff0000";
            else if(matrix[i][j] == -3) ctx.fillStyle="#ffff00";
            else if(matrix[i][j] == -4) ctx.fillStyle="#00ff00";
            ctx.beginPath();
            ctx.rect(j* (canvas.width/matrix[0].length), i* (canvas.height/matrix.length),(canvas.width/matrix[0].length),(canvas.width/matrix.length));
            ctx.fill();
        }
    }
}

let canvas = document.getElementById("Canvas");
canvas.width = 800;
canvas.height = 800;
let ctx = canvas.getContext("2d");

let text = readTextFile("./labyrinths/labyrinth_7.txt");
let matrix = stringToMatrix(text);
let visit_matrix = Array(matrix.length).fill().map(() => Array(matrix[0].length).fill(0));
consolePrintMatrix(visit_matrix);
drawMatrix(matrix);

