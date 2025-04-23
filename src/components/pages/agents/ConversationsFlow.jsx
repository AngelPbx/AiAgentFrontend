import Reactflow from "@/components/custom/ReactFlow/Reactflow";
import Simulations from "@/components/custom/Simulations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChartPie, Copy, Dot } from "lucide-react";

export default function ConversationsFlow() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Conversation Flow</h1>
          <div className="text-muted-foreground flex items-center text-xs">
            <p className="flex gap-2">
              Agent ID: ag...9df <Copy className="h-4 w-4 cursor-pointer" />
            </p>
            <Dot />
            <p className="flex gap-2">
              Conversation Flow ID: co...07e
              <Copy className="h-4 w-4 cursor-pointer" />
            </p>
            <Dot />
            <p className="flex gap-2">
              $0.12/min
              {/* <ChartPie className="h-4 w-4 cursor-pointer" /> */}
              <Tooltip>
                <TooltipTrigger className="cursor-pointer">
                  <ChartPie className="h-4 w-4 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent className="relative bg-zinc-900 text-white text-sm rounded-md p-3 shadow-lg w-64">
                  <div className="font-semibold flex justify-between mb-1">
                    <span>Cost per minute</span>
                    <span className="text-white/90">$0.12/min</span>
                  </div>
                  <div className="text-white/80 space-y-1">
                    <div className="flex justify-between">
                      <span>- Voice Engine: 11labs</span>
                      <span>$0.07/min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>- LLM: gpt-4o</span>
                      <span>$0.05/min</span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </p>
            <Dot />
            <p className="flex gap-2">
              2920-3250ms latency
              <Tooltip>
                <TooltipTrigger asChild>
                  <ChartPie className="h-4 w-4 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent
                  className={
                    "bg-zinc-900 text-white text-sm rounded-md p-3 shadow-lg w-64"
                  }
                >
                  <div className="font-semibold flex justify-between mb-1">
                    <span>Cost per minute</span>
                    <span className="text-white/90">$0.12/min</span>
                  </div>
                  <div className="text-white/80 space-y-1">
                    <div className="flex justify-between">
                      <span>- Voice Engine: 11labs</span>
                      <span>$0.07/min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>- LLM: gpt-4o</span>
                      <span>$0.05/min</span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </p>
            <Dot />
            <p className="flex gap-2">Auto saved at 16:06</p>
          </div>
        </div>
        {/* <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Create New Flow
        </button> */}
      </div>
      <div className="flex items-center justify-center">
        <Tabs defaultValue="create" className="w-full">
          <div className="flex items-center justify-center w-full">
            <TabsList className="grid grid-cols-2 !bg-transparent w-[400px] text-center">
              <TabsTrigger
                value="create"
                className="text-xl cursor-pointer rounded-none !bg-transparent border-0 !border-b-2 border-transparent data-[state=active]:!bg-transparent data-[state=active]:!shadow-none data-[state=active]:!border-white hover:!bg-transparent"
              >
                Create
              </TabsTrigger>
              <TabsTrigger
                value="simulation"
                className="text-xl cursor-pointer rounded-none !bg-transparent border-0 !border-b-2 border-transparent data-[state=active]:!bg-transparent data-[state=active]:!shadow-none data-[state=active]:!border-white hover:!bg-transparent"
              >
                Simulation
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="create">
            <div className="grid gap-4 min-h-200">
              {/* Sample Flow Cards */}
              <Reactflow />
            </div>
          </TabsContent>
          <TabsContent value="simulation">
            <Simulations />
          </TabsContent>
        </Tabs>
      </div>

      {/* <div className="grid gap-4 min-h-200"> */}
      {/* Sample Flow Cards */}
      {/* <Reactflow />
      </div> */}
    </div>
  );
}
