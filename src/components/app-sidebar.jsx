import * as React from "react";
import {
  AudioWaveform,
  Book,
  BookOpen,
  BookUser,
  Bot,
  BotMessageSquare,
  Box,
  Brackets,
  ChartPie,
  Command,
  Frame,
  GalleryVerticalEnd,
  History,
  Key,
  Link,
  Map,
  Network,
  NotepadText,
  Phone,
  PieChart,
  Pyramid,
  RotateCcwSquare,
  Settings2,
  SquareTerminal,
  Waypoints,
  Workflow,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "AngexPBX",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Agents",
      url: "/agents",
      icon: BotMessageSquare,
      isActive: true,
      items: [
        {
          title: "All Agents",
          url: "/agents/list",
          icon: Bot,
        },
        {
          title: "Conversations Flow",
          url: "/agents/conversations-flow",
          icon: Waypoints,
        },
        {
          title: "Knowledge Base",
          url: "/agents/knowledge-base",
          icon: BookUser,
        },
        {
          title: "Phone Numbers",
          url: "/agents/phone-numbers",
          icon: Phone,
        },
        {
          title: "Single Prompt",
          url: "/agents/single-prompt",
          icon: Workflow,
        },
        {
          title: "Multi Prompt",
          url: "/agents/multi-prompt",
          icon: Network,
        },
        {
          title: "Custom LLM",
          url: "/agents/custom-llm",
          icon: Link,
        },
      ],
    },
    {
      title: "Models",
      url: "/models",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "/models/genesis",
        },
        {
          title: "Explorer",
          url: "/models/explorer",
        },
        {
          title: "Quantum",
          url: "/models/quantum",
        },
      ],
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "/docs/introduction",
        },
        {
          title: "Get Started",
          url: "/docs/get-started",
        },
        {
          title: "Tutorials",
          url: "/docs/tutorials",
        },
        {
          title: "Changelog",
          url: "/docs/changelog",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
        {
          title: "Team",
          url: "/settings/team",
        },
        {
          title: "Billing",
          url: "/settings/billing",
        },
        {
          title: "Limits",
          url: "/settings/limits",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Agents",
      url: "/agents",
      icon: Bot,
    },
    {
      name: "Knowledge Base",
      url: "#",
      icon: Book,
    },
    {
      name: "Phone Numbers",
      url: "#",
      icon: BookUser,
    },
    {
      name: "Batch Call",
      url: "#",
      icon: Phone,
    },
    {
      name: "Call History",
      url: "#",
      icon: History,
    },
    {
      name: "Analytics",
      url: "#",
      icon: ChartPie,
    },
    {
      name: "Billing",
      url: "#",
      icon: NotepadText,
    },
    {
      name: "API Keys",
      url: "#",
      icon: Key,
    },
    {
      name: "Webhooks",
      url: "#",
      icon: Box,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarTrigger className="-ml-1" />
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
