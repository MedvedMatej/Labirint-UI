export class AStar {
    search(graph, startNode, endNodes, hCost) {
        open = [];
        closed = new Array(graph.length).fill(false);
        from = new Array(graph.length).fill(-1);

        let gScore = new Array(graph.length).fill(Number.MAX_SAFE_INTEGER);
        let fScore = new Array(graph.length).fill(Number.MAX_SAFE_INTEGER);

        gScore[startNode] = 0;
        fScore[startNode] = hCost[startNode];

        open.push(startNode);
        console.log("Odpiram vozlisce " + startNode);

        while (open.length != 0) {
            let minVal = Number.MAX_SAFE_INTEGER;
            let minPos = 0;
            let curNode = 0;

            for (let i = 0; i < open.length; i++) {
                let node = open[i];
                if (fScore[node] < minVal) {
                    minVal = fScore[node];
                    minPos = i;
                    curNode = node;
                }
            }
            let index = open.indexOf(minPos);
            open.splice(index, 1);
            closed[curNode] = true;
            console.log("Zapiram vozlisce " + curNode);

            if (endNodes.includes(curNode)) {
                console.log("Resitev A* v vozliscu " + curNode);
                console.log("Pot: " + curNode);

                let finish = curNode;
                let path = [curNode];
                while (true) {
                    curNode = from[curNode];
                    if (curNode != -1) {
                        console.log(" <-- " + curNode);
                        path.push(curNode);
                    }
                    else {
                        let index = endNodes.indexOf(finish);
                        endNodes.splice(index, 1);
                        return [finish, endNodes, path];
                    }
                }
            }

            for (let nextNode = 0; nextNode < graph[curNode].length; nextNode++) {

                if (graph[curNode][nextNode] > 0 && !closed[nextNode]) {
                    if (!open.includes(nextNode)) {
                        console.log("Odpiram vozlisce " + nextNode);
                    }
                    open.push(nextNode);
                    let dist = gScore[curNode] + graph[curNode][nextNode];

                    if (dist < gScore[nextNode]) {
                        from[nextNode] = curNode;
                        gScore[nextNode] = dist;
                        fScore[nextNode] = gScore[nextNode] + hCost[nextNode];
                        console.log("Posodabljam vozlisce " + nextNode);
                    }
                }
            }
        }
    }
}