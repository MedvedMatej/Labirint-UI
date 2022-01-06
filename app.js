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

function matrixToGraph(matrix){
    //console.log(matrix.length, matrix[0].length)
    let graph = Array((matrix.length-2) * (matrix[0].length-2)).fill();
    let findNodes = []
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

            if(matrix[i][j] == -3){
                findNodes.unshift((i-1)*(matrix[i].length-2)+j-1);
            }
            if(matrix[i][j] == -4){
                findNodes.push((i-1)*(matrix[i].length-2)+j-1);
            }
        }
    }
    return [graph,findNodes];
}

function search(graph, startNode, endNodes){
    let marked = new Array(graph.length).fill(false);
    let from = new Array(graph.length).fill(0);
    
    let stack = [];

    from[startNode] = -1;
    marked[startNode] = true;
    stack.push(startNode);

    console.log("Polagam na sklad vozlisce " + startNode);

    while(!(stack.length == 0)){
        let curNode = stack[stack.length-1];

        if (endNodes.includes(curNode)){
            console.log("Resitev DFS v vozliscu " + curNode);
            console.log("Pot: " + curNode);

            while(true){
                curNode = from[curNode];
                if (curNode != -1) console.log(" <-- " + curNode);
                else break;
            }

            return;
        }
        //najdi neobiskanega naslednjika
        let found = false;
        for (let nextNode = 0; nextNode < graph[curNode].length; nextNode++){
            if (graph[curNode][nextNode] == 1 && !marked[nextNode]){
                marked[nextNode] = true;
                from[nextNode] = curNode;
                stack.push(nextNode);
                
                console.log("Polagam na sklad vozlisce " + nextNode);
                
                found = true;
                break;                
            }

        }

        if(!found){
            stack.pop();
            console.log("Odstranjum s sklada vozlisce " + curNode);
        }
    }
}

let canvas = document.getElementById("Canvas");
canvas.width = 800;
canvas.height = 800;
let ctx = canvas.getContext("2d");

let text = readTextFile("./labyrinths/labyrinth_1.txt");
let matrix = stringToMatrix(text);
//let visit_matrix = Array(matrix.length).fill().map(() => Array(matrix[0].length).fill(0));
//consolePrintMatrix(visit_matrix);
drawMatrix(matrix);

let nodes;
let graph = matrixToGraph(matrix);
nodes = graph[1];
graph = graph[0];

