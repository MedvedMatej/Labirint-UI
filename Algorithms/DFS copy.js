export class DFS {
    search(graph, startNode, endNodes) {
        let marked = new Array(graph.length).fill(false);
        let from = new Array(graph.length).fill(-1);

        let stack = [startNode];
        marked[startNode] = true;

        while (stack.length > 0) {
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
            let options = [];
            for (let nextNode = 0; nextNode < graph[curNode].length; nextNode++) {
                if (graph[curNode][nextNode] == 1 && !marked[nextNode]) {
                    options.push(nextNode);
                    //marked[nextNode] = true;
                    //from[nextNode] = curNode;
                    //stack.push(nextNode);
                    //found = true;
                    //break;
                }
            }
            let m = Infinity;
            let idx = -1;
            let size = Math.sqrt(graph.length);

            let treasure;
            for(let o in options){
                for(let t of endNodes){
                    let xt = (t % (size)) + 1;
                    let yt = Math.floor(t / (size)) + 1;
                    
                    let xo = (options[o] % (size)) + 1;
                    let yo = Math.floor(options[o] / (size)) + 1;
                    
                    let d = Math.sqrt( (xt-xo)**2 + (yt-yo)**2 );
                    if(m >= d){
                        idx = o;
                        m = d;
                        treasure = t;
                    }
                }
            }
            
            if(idx != -1){
                //console.log(options, curNode, treasure, options[idx])
                marked[options[idx]] = true;
                from[options[idx]] = curNode;
                stack.push(options[idx]);
            }
            else {
                stack.pop();
            }
        }
    }
}