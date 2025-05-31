import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/components/pages/Dashboard";
import AgentsLayout from "@/components/pages/agents/AgentsLayout";
import AgentsList from "@/components/pages/agents/AgentsList";
import ConversationsFlow from "@/components/pages/agents/ConversationsFlow";
import KnowledgeBase from "./components/pages/KnowledgeBase";
import PhoneNumber from "./components/pages/PhoneNumber";
import CallHistory from "./components/pages/CallHistory";
import Billing from "./components/pages/Billing";
import Members from "./components/pages/Members";
import ProviderKeys from "./components/pages/ProviderKeys";
import Squads from "./components/pages/Squads";
import PhoneNumberRetell from "./components/pages/PhoneNumberRetell";
import BatchCall from "./components/pages/BatchCalls";
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
          <Route path="squads" element={<Squads />} />
          <Route path="phone-numbers" element={<PhoneNumber />} />
          <Route path="number-retell" element={<PhoneNumberRetell />} />
          <Route path="batch-calls" element={<BatchCall />} />
          <Route path="call-history" element={<CallHistory />} />
          <Route path="billing" element={<Billing />} />
          <Route path="keys" element={<ProviderKeys />} />
          {/* 
          <Route path="custom-llm" element={<CustomLLM />} /> */}
        </Route>
        <Route path="members" element={<Members />} />

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
