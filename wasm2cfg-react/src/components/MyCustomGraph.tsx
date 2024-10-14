import React, { useEffect, useState } from 'react';
import { Digraph, Node, Edge, EdgeTargetTuple, attribute as _, toDot } from 'ts-graphviz';
import { Graphviz } from 'graphviz-react';

const MyCustomGraph = () => {
    const [dotString, setDotString] = useState('');

    useEffect(() => {
        // Define custom Digraph, Node, and Edge classes
        class MyCustomDigraph extends Digraph {
            constructor() {
                super('G', {
                    [_.label]: 'This is Custom Digraph',
                });
            }
        }

        class MyCustomNode extends Node {
            constructor(id: string) {
                super(`node_${id}`, {
                    [_.label]: `This is Custom Node ${id}`,
                });
            }
        }

        class MyCustomEdge extends Edge {
            constructor(targets: EdgeTargetTuple) {
                super(targets, {
                    [_.label]: 'This is Custom Edge',
                });
            }
        }

        // Create graph, nodes, and edges
        const digraph = new MyCustomDigraph();
        const node1 = new MyCustomNode('A');
        const node2 = new MyCustomNode('B');
        const edge = new MyCustomEdge([node1, node2]);

        // Add nodes and edges to the graph
        digraph.addNode(node1);
        digraph.addNode(node2);
        digraph.addEdge(edge);

        // Convert the graph to DOT format
        const dot = toDot(digraph);
        setDotString(dot);
    }, []);

    return (
        <div>
            {dotString ? (
                <Graphviz dot={dotString} />
            ) : (
                <p>Loading graph...</p>
            )}
        </div>
    );
};

export default MyCustomGraph;
