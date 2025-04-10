import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/components/pages/Dashboard";
import AgentsLayout from "@/components/pages/agents/AgentsLayout";
import AgentsList from "@/components/pages/agents/AgentsList";
import ConversationsFlow from "@/components/pages/agents/ConversationsFlow";
import SinglePrompt from "@/components/pages/agents/SinglePrompt";
import MultiPrompt from "@/components/pages/agents/MultiPrompt";
import Agentflow from "./components/pages/Agentflow";
import KnowledgeBase from "./components/pages/KnowledgeBase";
// import CustomLLM from "@/components/pages/agents/CustomLLM";

// // Models pages
// import ModelsLayout from "@/components/pages/models/ModelsLayout";
// import Genesis from "@/components/pages/models/Genesis";
// import Explorer from "@/components/pages/models/Explorer";
// import Quantum from "@/components/pages/models/Quantum";

// // Documentation pages
// import DocsLayout from "@/components/pages/docs/DocsLayout";
// import Introduction from "@/components/pages/docs/Introduction";
// import GetStarted from "@/components/pages/docs/GetStarted";
// import Tutorials from "@/components/pages/docs/Tutorials";
// import Changelog from "@/components/pages/docs/Changelog";

// // Settings pages
// import SettingsLayout from "@/components/pages/settings/SettingsLayout";
// import General from "@/components/pages/settings/General";
// import Team from "@/components/pages/settings/Team";
// import Billing from "@/components/pages/settings/Billing";
// import Limits from "@/components/pages/settings/Limits";

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
