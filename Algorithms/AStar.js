export class AStar{
    search(graph, startNode, endNodes){
        let hCost = Array(graph.length).fill(0);
        let open = [];
        let closed = Array(graph.length).fill(false);
        let from = Array(graph.length).fill(-1);

        let gScore = Array(graph.length).fill(Infinity);
        let fScore = Array(graph.length).fill(Infinity);

        gScore[startNode] = 0;
        fScore[startNode] = hCost[startNode];
        
        open.push(startNode);

        while(open.length > 0){
            let minVal = Infinity;
            let minPos = 0;
            let curNode = 0;

            for(let i = 0; i< open.length; i++){
                let node = open[i];
                if(fScore[node] < minVal){
                    minVal = fScore[node];
                    minPos = i;
                    curNode = node;
                }
            }

            open.splice(minPos,1);
            closed[curNode] = true;

            if(endNodes.includes(curNode)){
                let finish = curNode;
                let path = [curNode];
                while(true){
                    curNode = from[curNode];
                    if(curNode != -1){
                        path.push(curNode);
                    }
                    else{
                        let index = endNodes.indexOf(finish);
                        endNodes.splice(index, 1)
                        return [finish,endNodes,path];
                    }
                }
            }

            for(let nextNode = 0; nextNode < graph[curNode].length; nextNode++){
                if(graph[curNode][nextNode] != 0 && !closed[nextNode]){
                    if(!open.includes(nextNode)){
                    }
                    open.push(nextNode);
                    let dist = parseInt(gScore[curNode]) + parseInt(graph[curNode][nextNode]);

                    console.log(dist, gScore[nextNode]);
                    if(dist < gScore[nextNode]){
                        from[nextNode] = curNode;
                        gScore[nextNode] = dist;
                        fScore[nextNode] = gScore[nextNode] + hCost[nextNode];
                    }
                }
            }
        }
        return "NIgger"
    }
}