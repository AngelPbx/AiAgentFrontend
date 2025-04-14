import Reactflow from "@/components/custom/ReactFlow/Reactflow";

export default function ConversationsFlow() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Conversation Flow</h1>
          <p className="text-gray-600">
            You can manage your conversation flow here.
          </p>
        </div>
        {/* <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Create New Flow
        </button> */}
      </div>

      <div className="grid gap-4 min-h-200">
        {/* Sample Flow Cards */}
        <Reactflow />
      </div>
    </div>
  );
}
