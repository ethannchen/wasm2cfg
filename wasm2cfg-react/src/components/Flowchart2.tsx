import React from 'react';
import { Graphviz } from 'graphviz-react';
import {
    Digraph, Node, Edge, EdgeTargetTuple, attribute as _, toDot,
} from 'ts-graphviz';

class MyCustomDigraph extends Digraph {
    constructor() {
        super('CFG');
    }
}

class EntryNode extends Node {
    constructor(id: string, label: string) {
        super(id, {
            [_.label]: label,
            [_.shape]: 'ellipse',
            [_.fillcolor]: 'green',
            [_.style]: 'filled',
        });
    }
}

class ExitNode extends Node {
    constructor(id: string, label: string) {
        super(id, {
            [_.label]: label,
            [_.shape]: 'ellipse',
            [_.fillcolor]: 'red',
            [_.style]: 'filled',
        });
    }
}

class DataNode extends Node {
    constructor(id: string, label: string) {
        super(id, {
            [_.label]: label,
            [_.shape]: 'ellipse',
            [_.fillcolor]: 'yellow',
            [_.style]: 'filled',
        });
    }
}

class ControlNode extends Node {
    constructor(id: string, label: string) {
        super(id, {
            [_.label]: label,
            [_.shape]: 'diamond',
            [_.fillcolor]: 'orange',
            [_.style]: 'filled',
        });
    }
}

class ActionNode extends Node {
    constructor(id: string, label: string) {
        super(id, {
            [_.label]: label,
            [_.shape]: 'box',
            [_.fillcolor]: 'grey',
            [_.style]: 'filled',
        });
    }
}

class DataEdge extends Edge {
    constructor(targets: EdgeTargetTuple, label: string) {
        super(targets, {
            [_.label]: label,
            [_.style]: 'dashed',
        });
    }
}

class ActionEdge extends Edge {
    constructor(targets: EdgeTargetTuple, label: string) {
        super(targets, {
            [_.label]: label,
            [_.style]: 'solid',
        });
    }
}

const Flowchart2: React.FC = () => {
    const digraph = new MyCustomDigraph();

    const entryNode = new EntryNode('entry', 'Entry');
    const exitNode = new ExitNode('exit', 'Exit');

    const dataNodes = [
        { id: 'x', label: 'x' }, { id: 'y', label: 'y' }, { id: 'z', label: 'z' },
        { id: 'i', label: 'i' }, { id: 'a', label: 'a' }, { id: 'b', label: 'b' },
        { id: 'const_5', label: '5' }, { id: 'const_10', label: '10' },
        { id: 'const_1', label: '1' }, { id: 'const_3', label: '3' },
        { id: 'const_20', label: '20' }, { id: 'const_2', label: '2' }
    ].map(({ id, label }) => new DataNode(id, label));

    const controlNodes = [
        { id: 'while_cond', label: '<' },
        { id: 'if_cond', label: '>' },
        { id: 'for_cond', label: '<' }
    ].map(({ id, label }) => new ControlNode(id, label));

    const actionNodes = [
        { id: 'assign_x', label: '=' }, { id: 'assign_y', label: '=' },
        { id: 'add_x_1', label: '+' }, { id: 'sub_x_1', label: '-' },
        { id: 'assign_i', label: '=' }, { id: 'inc_i', label: '++' },
        { id: 'add_i_y', label: '+=' }, { id: 'add_2_y', label: '+=' },
        { id: 'call_add_func', label: 'Call: add_numbers' }, { id: 'print_result', label: 'Print' }
    ].map(({ id, label }) => new ActionNode(id, label));

    // Add nodes to the graph
    digraph.addNode(entryNode);
    digraph.addNode(exitNode);
    dataNodes.forEach((node) => digraph.addNode(node));
    controlNodes.forEach((node) => digraph.addNode(node));
    actionNodes.forEach((node) => digraph.addNode(node));

    const edges = [
        // Control Flow Edges (solid)
        new ActionEdge([entryNode, actionNodes[0]], ''),           // entry -> assign_x
        new ActionEdge([actionNodes[0], actionNodes[1]], ''),      // assign_x -> assign_y
        new ActionEdge([actionNodes[1], controlNodes[1]], ''),     // assign_y -> if_cond
        new ActionEdge([controlNodes[1], actionNodes[2]], 'True'), // if_cond -> add_x_1 (True)
        new ActionEdge([controlNodes[1], actionNodes[3]], 'False'),// if_cond -> sub_x_1 (False)
        new ActionEdge([actionNodes[2], actionNodes[1]], ''),      // add_x_1 -> assign_y
        new ActionEdge([actionNodes[3], actionNodes[1]], ''),      // sub_x_1 -> assign_y
        new ActionEdge([actionNodes[1], actionNodes[4]], ''),      // assign_y -> assign_i
        new ActionEdge([actionNodes[4], controlNodes[2]], ''),     // assign_i -> for_cond
        new ActionEdge([controlNodes[2], actionNodes[6]], 'i < 3'),// for_cond -> add_i_y
        new ActionEdge([actionNodes[6], actionNodes[5]], ''),      // add_i_y -> inc_i
        new ActionEdge([actionNodes[5], controlNodes[2]], ''),     // inc_i -> for_cond
        new ActionEdge([controlNodes[2], controlNodes[0]], 'i >= 3'),// for_cond -> while_cond
        new ActionEdge([controlNodes[0], actionNodes[7]], 'y < 20'),// while_cond -> add_2_y
        new ActionEdge([actionNodes[7], controlNodes[0]], ''),     // add_2_y -> while_cond
        new ActionEdge([controlNodes[0], actionNodes[8]], 'y >= 20'),// while_cond -> call_add_func
        new ActionEdge([actionNodes[8], actionNodes[9]], ''),      // call_add_func -> print_result
        new ActionEdge([actionNodes[9], exitNode], ''),            // print_result -> exit

        // Data Edges (dashed)
        new DataEdge([dataNodes[0], actionNodes[0]], ''),          // x -> assign_x
        new DataEdge([dataNodes[6], actionNodes[0]], ''),          // const_5 -> assign_x
        new DataEdge([actionNodes[0], dataNodes[0]], ''),          // assign_x -> x
        new DataEdge([dataNodes[7], actionNodes[1]], ''),          // const_10 -> assign_y
        new DataEdge([actionNodes[1], dataNodes[1]], ''),          // assign_y -> y
        new DataEdge([dataNodes[0], controlNodes[1]], ''),         // x -> if_cond
        new DataEdge([dataNodes[0], actionNodes[2]], ''),          // x -> add_x_1
        new DataEdge([dataNodes[8], actionNodes[2]], ''),          // const_1 -> add_x_1
        new DataEdge([dataNodes[0], actionNodes[3]], ''),          // x -> sub_x_1
        new DataEdge([dataNodes[8], actionNodes[3]], ''),          // const_1 -> sub_x_1
        new DataEdge([dataNodes[9], actionNodes[4]], ''),          // const_0 -> assign_i
        new DataEdge([actionNodes[4], dataNodes[3]], ''),          // assign_i -> i
        new DataEdge([dataNodes[3], controlNodes[2]], ''),         // i -> for_cond
        new DataEdge([dataNodes[9], controlNodes[2]], ''),         // const_3 -> for_cond
        new DataEdge([dataNodes[3], actionNodes[6]], ''),          // i -> add_i_y
        new DataEdge([actionNodes[6], dataNodes[1]], ''),          // add_i_y -> y
        new DataEdge([dataNodes[1], controlNodes[0]], ''),         // y -> while_cond
        new DataEdge([dataNodes[10], controlNodes[0]], ''),        // const_20 -> while_cond
        new DataEdge([dataNodes[2], actionNodes[8]], ''),          // z -> call_add_func
    ];

    // Add edges to the graph
    edges.forEach((edge) => digraph.addEdge(edge));

    const dot = toDot(digraph);

    return <div style={{ textAlign: 'center' }}>
        <Graphviz dot={dot} options={{ height: 600, width: 800, zoom: true }} />
    </div>;
};

export default Flowchart2;
