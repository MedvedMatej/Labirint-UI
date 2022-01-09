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

        let min = Infinity;

        for (let nextNode = 0; nextNode < this.searchGraph[curNode].length; nextNode++) {
            if (this.searchGraph[curNode][nextNode] != 0) {
                if (!(this.path.includes(nextNode))) {
                    this.path.unshift(nextNode);
                    let res = this.search(parseInt(gScore) + parseInt(this.searchGraph[curNode][nextNode]), bound);
                    if (this.found) {
                        return res;
                    }
                    if (res < min) {
                        min = res;
                    }
                    this.path.shift();
                }
            }
        }
        return min;
    }

    find(graph, startNode, endNodes) {
        let hCost = Array(graph.length).fill(0);
        this.searchGraph = graph;
        this.searchEndNodes = endNodes;
        this.searchHeurCost = hCost;

        this.path = [];
        this.path.push(startNode);
        this.found = false;

        let bound = this.searchHeurCost[startNode];

        while (true) {
            let res = this.search(0, bound);

            if (this.found) {
                let finish = this.path[0];
                let index = endNodes.indexOf(this.path[0]);
                endNodes.splice(index,1);
                return [this.path[0], endNodes, this.path];
            }

            if (res == Infinity) {
                break;
            }

            bound = res;
        }
    }

}