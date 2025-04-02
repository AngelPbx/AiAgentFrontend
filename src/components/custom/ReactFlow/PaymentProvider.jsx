import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useReactFlow } from "@xyflow/react";
import { CircleX, Croissant } from "lucide-react";
import React from "react";

const PaymentProvider = ({ id, data }) => {
  const { setNodes } = useReactFlow();
  return (
    <>
      <Card className="w-[250px] text-center flex flex-row">
        <div>
          <CardTitle>
            <h1>{data.code}</h1>
          </CardTitle>
          <CardDescription>
            <p>{data.name}</p>
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id))
          }
        >
          <CircleX />
        </Button>
      </Card>
    </>
  );
};

export default PaymentProvider;
