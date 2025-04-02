import { Card, CardHeader } from "@/components/ui/card";
import { Handle, Position } from "@xyflow/react";
import React from "react";

const PaymentCountry = ({ data }) => {
  return (
    <>
      <Card>
        <CardHeader className="w-[250px]">
          <h1>{data.country}</h1>
        </CardHeader>
      </Card>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </>
  );
};

export default PaymentCountry;
