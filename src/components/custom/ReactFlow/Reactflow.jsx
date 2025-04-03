import React, { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Panel,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { initialEdges, initialNodes } from "./workflow.constants";
import CustomEdge from "./CustomEdge";
import CallBegin from "./customFeatures/CallBegin";
import Conversation from "./customFeatures/Conversation";
import Function from "./customFeatures/Function";
import TransferCall from "./TransferCall";
import CallEnd from "./customFeatures/CallEnd";
import ConversationOptions from "./ConversationOptions";
import CallTransfer from "./customFeatures/CallTransfer";
import PressDigit from "./customFeatures/PressDigit";
// import DatabaseSchemaDemo from "./Retail/DatabaseSchemaDemo";

const nodeType = {
  callBegin: CallBegin,
  callEnd: CallEnd,
  conversation: Conversation,
  function: Function,
  transferCall: TransferCall,
  callTransfer: CallTransfer,
  pressDigit: PressDigit,
};

const edgeType = {
  customEdge: CustomEdge,
};

const Reactflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `e${connection.source}-${connection.target}`,
        type: "customEdge",
      };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  return (
    <div className="w-full h-9/10">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className="text-black font-bold"
        nodeTypes={nodeType}
        edgeTypes={edgeType}
        fitView
      >
        <Panel
          position="top-left"
          className="bg-white rounded-lg shadow-lg p-4"
        >
          <div className="flex flex-col gap-4">
            <ConversationOptions />
            {/* <PaymentProviderSelect /> */}
          </div>
        </Panel>
        <Controls />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
};

export default Reactflow;
