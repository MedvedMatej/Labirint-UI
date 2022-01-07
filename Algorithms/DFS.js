export class DFS {
    search(graph, startNode, endNodes) {
        let marked = new Array(graph.length).fill(false);
        let from = new Array(graph.length).fill(0);

        let stack = [];

        from[startNode] = -1;
        marked[startNode] = true;
        stack.push(startNode);

        while (!(stack.length == 0)) {
            let curNode = stack[stack.length - 1];

            if (endNodes.includes(curNode)) {
                let finish = curNode;
                let path = [curNode];
                while (true) {
                    curNode = from[curNode];
                    if (curNode != -1) {
                        path.push(curNode)
                    }
                    else {
                        let index = endNodes.indexOf(finish);
                        endNodes.splice(index, 1)
                        return [finish, endNodes, path];
                    }
                }
            }
            //najdi neobiskanega naslednjika
            let found = false;
            for (let nextNode = 0; nextNode < graph[curNode].length; nextNode++) {
                if (graph[curNode][nextNode] == 1 && !marked[nextNode]) {
                    marked[nextNode] = true;
                    from[nextNode] = curNode;
                    stack.push(nextNode);

                    found = true;
                    break;
                }
            }

            if (!found) {
                stack.pop();
            }
        }
    }
}