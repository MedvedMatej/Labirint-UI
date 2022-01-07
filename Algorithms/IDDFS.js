export class IDDFS {
    search(graph, startNode, endNodes) {
        for (let depthLimit = 0; depthLimit < graph.length; depthLimit++) {
            //console.log("Globina iskanja je " + depthLimit);
            let marked = Array(graph.length).fill(false);
            let from = Array(graph.length).fill(-1);

            let stack = [];
            marked[startNode] = true;
            stack.push(startNode);
            while (stack.length > 0) {
                let curNode = stack[stack.length - 1];

                let finish = curNode;
                let path = [curNode];
                if (endNodes.includes(curNode)) {
                    console.log("Pot: " + curNode);
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

                let found = false;
                if (stack.length <= depthLimit) {
                    for (let nextNode = 0; nextNode < graph[curNode].length; nextNode++) {
                        if (graph[curNode][nextNode] == 1 && !marked[nextNode]) {
                            marked[nextNode] = true;
                            from[nextNode] = curNode;
                            stack.push(nextNode);
                            //console.log("Polagam na sklad vozlisce " + nextNode);
                            found = true;
                            break;
                        }
                    }
                }

                if (!found) {
                    stack.pop();
                }
            }
        }
    }
}