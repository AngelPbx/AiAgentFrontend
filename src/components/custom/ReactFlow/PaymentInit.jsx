import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Handle, Position } from "@xyflow/react";
import React from "react";

const PaymentInit = ({ data }) => {
  return (
    <>
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle>Payment Init</CardTitle>
          <CardDescription>{data.amount}</CardDescription>
        </CardHeader>
      </Card>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default PaymentInit;
