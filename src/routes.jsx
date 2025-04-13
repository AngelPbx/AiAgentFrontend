import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/components/pages/Dashboard";
import AgentsLayout from "@/components/pages/agents/AgentsLayout";
import AgentsList from "@/components/pages/agents/AgentsList";
import ConversationsFlow from "@/components/pages/agents/ConversationsFlow";
import SinglePrompt from "@/components/pages/agents/SinglePrompt";
import MultiPrompt from "@/components/pages/agents/MultiPrompt";
import Agentflow from "./components/pages/Agentflow";
import KnowledgeBase from "./components/pages/KnowledgeBase";
import PhoneNumber from "./components/pages/PhoneNumber";
import CallHistory from "./components/pages/CallHistory";
import Billing from "./components/pages/Billing";
// import CustomLLM from "@/components/pages/agents/CustomLLM";

export function AppRoutes() {
  return (
    <Routes>
      {/* Redirect root to agents/list */}
      <Route path="/" element={<Navigate to="/agents/list" replace />} />

      <Route path="/" element={<Dashboard />}>
        {/* Agents Routes */}
        <Route path="agents" element={<AgentsLayout />}>
          <Route path="list" element={<AgentsList />} />
          <Route path="conversations-flow" element={<ConversationsFlow />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />
          <Route path="phone-numbers" element={<PhoneNumber />} />
          <Route path="call-history" element={<CallHistory />} />
          <Route path="billing" element={<Billing />} />
          <Route path="single-prompt" element={<SinglePrompt />} />
          <Route path="multi-prompt" element={<MultiPrompt />} />
          {/* 
          <Route path="custom-llm" element={<CustomLLM />} /> */}
        </Route>

        {/* Models Routes */}
        {/* <Route path="models" element={<ModelsLayout />}>
          <Route path="genesis" element={<Genesis />} />
          <Route path="explorer" element={<Explorer />} />
          <Route path="quantum" element={<Quantum />} />
        </Route> */}
      </Route>
    </Routes>
  );
}
