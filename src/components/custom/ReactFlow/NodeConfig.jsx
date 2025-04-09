import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const NodeConfig = () => {
  return (
    <div className="w-[400px] min-h-[600px] overflow-y-auto">
      <Tabs defaultValue="nodeSettings">
        <TabsList className="grid grid-cols-2 w-full gap-1 bg-slate-600 text-muted-foreground">
          <TabsTrigger
            value="nodeSettings"
            className="bg-slate-900 cursor-pointer"
          >
            Node Settings
          </TabsTrigger>
          <TabsTrigger value="testFlow" className="bg-slate-900 cursor-pointer">
            Test Flow
          </TabsTrigger>
        </TabsList>
        <Separator className="my-2" />
        <TabsContent value="nodeSettings">
          <h1>This is node settings</h1>
        </TabsContent>
        <TabsContent value="testFlow">
          <h1>This is test flow</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NodeConfig;
