// src/components/Flowchart.tsx

import React from 'react';
import { Graphviz } from 'graphviz-react';

const Flowchart: React.FC = () => {
    const dot = `
        digraph CFG {
            node [shape=box, style=filled, fillcolor=lightgrey];
            edge [color=black];
            
            // Entry and Exit nodes
            entry [label="Entry", shape=ellipse, fillcolor=green];
            exit [label="Exit", shape=ellipse, fillcolor=green];

            // data nodes
            x [label="x", shape=ellipse, fillcolor=lightyellow];
            y [label="y", shape=ellipse, fillcolor=lightyellow];
            z [label="z", shape=ellipse, fillcolor=lightyellow];
            i [label="i", shape=ellipse, fillcolor=lightyellow];
            a [label="a", shape=ellipse, fillcolor=lightyellow];
            b [label="b", shape=ellipse, fillcolor=lightyellow];

            const_5 [label="5", shape=ellipse, fillcolor=lightcyan];
            const_10 [label="10", shape=ellipse, fillcolor=lightcyan];
            const_1 [label="1", shape=ellipse, fillcolor=lightcyan];
            const_3 [label="3", shape=ellipse, fillcolor=lightcyan];
            const_20 [label="20", shape=ellipse, fillcolor=lightcyan];
            const_2 [label="2", shape=ellipse, fillcolor=lightcyan];

            // Action nodes (simplified to represent only operations)
            assign_x [label="="];
            assign_y [label="="];
            add_x_1 [label="+"];
            sub_x_1 [label="-"];
            assign_i [label="="];
            inc_i [label="++"];
            add_i_y [label="+="];
            add_2_y [label="+="];
            call_add_func [label="Call: add_numbers"];
            print_result [label="Print"];


            // control nodes 
            while_cond [label="<"];
            if_cond [label=">"];
            for_cond [label="<"];

            // Control Flow Edges
            entry -> assign_x;
            assign_x -> assign_y;
            assign_y -> if_cond;

            if_cond -> add_x_1 [label="True"];
            if_cond -> sub_x_1 [label="False"];

            add_x_1 -> assign_y;
            sub_x_1 -> assign_y;

            assign_y -> assign_i;

            assign_i -> for_cond;
            for_cond -> add_i_y [label="i < 3"];
            add_i_y -> inc_i;
            inc_i -> for_cond;
            for_cond -> while_cond [label="i >= 3"];

            while_cond -> add_2_y [label="y < 20"];
            add_2_y -> while_cond;
            while_cond -> call_add_func [label="y >= 20"];

            call_add_func -> print_result;

            print_result -> exit;

            // Data  Edges (Dashed)
            edge [style=dashed];

            x -> assign_x;
            const_5 -> assign_x;

            assign_x -> x;
            const_10 -> assign_y;
            assign_y -> y;

            x -> if_cond;

            x -> add_x_1;
            const_1 -> add_x_1;

            x -> sub_x_1;
            const_1 -> sub_x_1;

            add_x_1 -> assign_y;
            sub_x_1 -> assign_y;

            const_0 [label="0", shape=ellipse, fillcolor=lightcyan];
            const_0 -> assign_i;
            assign_i -> i;

            i -> for_cond;
            const_3 -> for_cond;

            i -> add_i_y;
            add_i_y -> y;

            y -> while_cond;
            const_20 -> while_cond;

            y -> add_2_y;
            const_2 -> add_2_y;

            add_2_y -> y;

            x -> call_add_func;
            y -> call_add_func;
            call_add_func -> z;

            // Subgraph for add_numbers function
            subgraph cluster_add_numbers {
                label = "Function: add_numbers";
                style = dashed;
                a -> add_a_b;
                b -> add_a_b;
                add_a_b [label="+"];
                add_a_b -> z [label="return"];
            }
        }
    `;

    return (
        <div style={{ textAlign: 'center' }}>
            <Graphviz dot={dot} options={{ height: 600, width: 800, zoom: true }} />
        </div>
    );
};

export default Flowchart;
