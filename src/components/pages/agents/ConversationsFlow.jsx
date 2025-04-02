import Reactflow from "@/components/custom/ReactFlow/Reactflow";

export default function ConversationsFlow() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Conversations Flow</h1>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Create New Flow
        </button>
      </div>

      <div className="grid gap-4 min-h-200">
        {/* Sample Flow Cards */}
        <Reactflow />
      </div>
    </div>
  );
}
