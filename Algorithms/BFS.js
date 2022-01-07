export class BFS {
    search(graph, startNode, endNodes) {
        let marked = Array(graph.length).fill(false);
        let from = Array(graph.length).fill(-1);

        let queue = [];

        marked[startNode] = true;

        queue.push(startNode);
        //console.log("Dajem v vrsto vozlisce " + startNode);

        while (queue.length > 0) {
            let curNode = queue.shift();
            //console.log("Odstranjujem iz vrste vozlisce " + curNode);

            if (endNodes.includes(curNode)) {
                //console.log("Resitev BFS v vozliscu " + curNode);
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
                        endNodes.splice(index, 1)
                        return [finish, endNodes, path];
                    }
                }

            }

            for (let nextNode = 0; nextNode < graph[curNode].length; nextNode++) {
                if (graph[curNode][nextNode] == 1 && !marked[nextNode]) {
                    marked[nextNode] = true;
                    from[nextNode] = curNode;
                    queue.push(nextNode);
                    //console.log("Dajem v vrsto vozlisce "+ nextNode);
                }
            }
        }
    }
}