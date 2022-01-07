import {BFS} from "./Algorithms/BFS.js"
import {DFS} from "./Algorithms/DFS.js"
import {IDDFS} from "./Algorithms/IDDFS.js"

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
    let vrstice = data.split("\r\n");
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

function drawDAWAY(path,size){

    let j = (path % (size-2))+1
    let i = Math.floor(path / (size-2))+1
    ctx.beginPath();
    ctx.rect(j* (canvas.width/size), i* (canvas.height/size),(canvas.width/size),(canvas.width/size));
    ctx.fill();
    
}

function matrixToGraph(matrix){
    //console.log(matrix.length, matrix[0].length)
    let graph = Array((matrix.length-2) * (matrix[0].length-2)).fill();
    let findNodes = []
    let startNode;
    let endNode;
    for(let i = 1; i < matrix.length-1; i++){
        
        for(let j = 1; j< matrix[i].length-1; j++){
            let vozlisce = Array((matrix.length-1) * (matrix[i].length-1)).fill(0);
            
            if(matrix[i][j] == -1){
                graph[(i-1)*(matrix[i].length-2)+j-1] = vozlisce;
                continue;
            }
            if(matrix[i][j-1] != -1) vozlisce[(i-1)*(matrix[i].length-2)+ (j-1) -1] = 1; //levo
            if(matrix[i][j+1] != -1) vozlisce[(i-1)*(matrix[i].length-2)+ (j-1) +1] = 1; //desno
            if(matrix[i-1][j] != -1) vozlisce[(i-1-1)*(matrix[i].length-2)+ (j-1)] = 1;  //gor
            if(matrix[i+1][j] != -1) vozlisce[(i)*(matrix[i].length-2)+ (j-1)] = 1;      //dol
            graph[(i-1)*(matrix[i].length-2)+j-1] = vozlisce;

            if(matrix[i][j] == -2){
                startNode = (i-1)*(matrix[i].length-2)+j-1
            }
            if(matrix[i][j] == -3){
                findNodes.unshift((i-1)*(matrix[i].length-2)+j-1);
            }
            if(matrix[i][j] == -4){
                endNode = (i-1)*(matrix[i].length-2)+j-1;
            }
        }
    }
    return [graph, findNodes, startNode, endNode];
}

function changeColor(){
    barve.unshift(barve.pop());
    ctx.fillStyle = barve[0];
}

function main(timeStamp){

    if(timeStamp - previousTimeStamp > 500/(matrix.length/2)){
        if(previousTimeStamp == 0){
            drawMatrix(matrix);
            changeColor();
        }
        previousTimeStamp = timeStamp;
        if(pot[0].length == 0){
            if(pot.length != 0){
                pot.shift();
                changeColor();
            }
        }
        if(pot.length == 0){
            return;
        }
        drawDAWAY(pot[0].pop(),matrix.length);
    }


    window.requestAnimationFrame(main);
}

let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");

let text = readTextFile("./labyrinths/labyrinth_1.txt");
let matrix = stringToMatrix(text);




let graph = matrixToGraph(matrix);
let nodes = graph[1];
let startNode = graph[2];
let endNode = graph[3];
graph = graph[0];
let vrnjeno = [startNode, JSON.parse(JSON.stringify(nodes))]


let pot = []
let previousTimeStamp = 0;
let barve = ["pink","red","orange","dodgerblue","darkgreen","blue"]

let algo = new DFS();
for(let i = 0 ; i < nodes.length+1; i++){
    vrnjeno = algo.search(graph,vrnjeno[0],vrnjeno[1])
    pot.push(vrnjeno[2]);
    if(vrnjeno[1].length == 0){
        vrnjeno[1].push(endNode);
    }
}

main();







