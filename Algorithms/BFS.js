export class BFS {
    search(graph, startNode, endNodes) {
        let marked = Array(graph.length).fill(false);
        let from = Array(graph.length).fill(-1);

        let queue = [];

        marked[startNode] = true;

        queue.push(startNode);

        while (queue.length > 0) {
            let curNode = queue.shift();

            if (endNodes.includes(curNode)) {
                let finish = curNode;
                let path = [curNode];
                while (true) {
                    curNode = from[curNode];
                    if (curNode != -1) {
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
                }
            }
        }
    }
}