import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Position, useReactFlow } from "@xyflow/react";
import { CircleX } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import CustomHandle from "./CustomHandle";

const TransferCall = ({ id, data }) => {
  const { setNodes } = useReactFlow();

  return (
    <>
      <Card className="w-[300px] text-center flex flex-col items-center">
        <div>
          <CardTitle className="flex justify-between">
            <h1>{data.label}</h1>
            <Button
              className="text-red-600 hover:bg-red-100 hover:text-red-600 cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={() =>
                setNodes((prevNodes) =>
                  prevNodes.filter((node) => node.id !== id)
                )
              }
            >
              <CircleX />
            </Button>
          </CardTitle>
          <CardDescription>
            <p>{data.description}</p>
          </CardDescription>
        </div>
      </Card>
      <CustomHandle type="source" position={Position.Right} />
      <CustomHandle type="target" position={Position.Left} />
    </>
  );
};

export default TransferCall;
