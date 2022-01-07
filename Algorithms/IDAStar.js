export class IDAStar {

    search(gScore, bound) {
        let curNode = this.path[0];
        let fScore = gScore + this.searchHeurCost[curNode];

        if (fScore > bound) {
            return fScore;
        }

        if (this.searchEndNodes.includes(curNode)) {
            this.found = true;
            return fScore;
        }

        let min = Number.MAX_SAFE_INTEGER;

        for (let nextNode = 0; nextNode < this.searchGraph[curNode].length; nextNode++) {
            if (this.searchGraph[curNode][nextNode] > 0) {
                if (!(this.path.includes(nextNode))) {
                    path.unshift(nextNode);
                    let res = search(gScore + this.searchGraph[curNode][nextNode], bound);
                    if (found) {
                        return res;
                    }
                    if (res < min) {
                        min = res;
                    }
                    path.shift();
                }
            }
        }
        return min;
    }

    find(graph, startNode, endNodes, hCost) {
        this.searchGraph = graph;
        this.searchEndNodes = endNodes;
        this.searchHeurCost = hCost;

        this.path = [];
        this.path.push(startNode);
        this.found = false;

        let bound = this.searchHeurCost[startNode];

        while (true) {
            let res = this.search(0, bound);

            if (found) {
                console.log("Pot: ");

                console.log(path[0])
                for (let i = 0; i < this.path.length; i++) {
                    console.log(" <-- " + path[i]);
                }
                break;
            }

            if (res == Number.MAX_SAFE_INTEGER) {
                break;
            }

            bound = res;
        }
    }

}