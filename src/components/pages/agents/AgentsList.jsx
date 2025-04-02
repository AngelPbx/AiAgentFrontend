import {
  ArrowRightLeft,
  Bot,
  BotIcon,
  Brackets,
  ChevronDown,
  CloudUpload,
  Copy,
  EllipsisVertical,
  Link,
  RotateCcwSquare,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../../ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import CreateAgentDialog from "../../custom/createAgentDialog";

const agents = [
  {
    id: 1,
    agent_name: "Agent 1",
    agent_type: "Agent 1 Type",
    voice: "Voice 1",
    voice_face_url: "https://avatar.iran.liara.run/public/boy?username=Ash",
    phone: "",
    edited_date: "2023-01-01",
    status: "Active",
  },
  {
    id: 2,
    agent_name: "Agent 2",
    agent_type: "Agent 2 Type",
    voice: "Voice 2",
    voice_face_url: "https://avatar.iran.liara.run/public/boy?username=Bip",
    phone: "1234567892",
    edited_date: "2023-01-01",
    status: "Active",
  },
  {
    id: 3,
    agent_name: "Agent 3",
    agent_type: "Agent 3 Type",
    voice: "Voice 3",
    voice_face_url: "https://avatar.iran.liara.run/public/girl?username=Na",
    phone: "",
    edited_date: "2023-01-01",
    status: "Deleted",
  },
];

const AgentsList = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="opacity-50">
          <Bot className="mr-1 inline" />
          <span className="sr-only" /> Agents
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full md:w-sm"
          />
          <div className="mt-4 md:mt-0">
            {/* Upload a new agnet  */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="cursor-pointer w-25 me-3" variant="outline">
                  Import
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Upload an agent</DialogTitle>
                  <div className="grid w-full max-w-xl items-center gap-1.5 py-4">
                    <Label
                      htmlFor="fileInput"
                      className="group relative flex cursor-pointer flex-col justify-center rounded-lg border-2 border-dashed transition-colors dark:border-white/20 dark:hover:bg-black/20 border-stroke-soft-200 hover:border-primary hover:bg-bg-weak-50 h-[150px] items-center"
                    >
                      <CloudUpload />
                      <p className="mb-1 text-sm text-gray-900 dark:text-white">
                        Choose a file or drag &amp; drop it here
                      </p>
                      <p className="text-xs text-text-sub-600 dark:text-white/70">
                        Only Defined Agent format files are supported
                      </p>
                    </Label>
                    <Input
                      id="fileInput"
                      accept=".json"
                      className="hidden"
                      type="file"
                    />
                  </div>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div>
          <Table>
            <TableCaption>A list of your recent created agents.</TableCaption>
            <TableHeader className="bg-zinc-800">
              <TableRow className="h-10">
                <TableHead>Agent Name</TableHead>
                <TableHead>Agent Type</TableHead>
                <TableHead>Voice</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Edited By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium flex items-center">
                    <span className="p-1 bg-zinc-600 rounded-sm mr-3 opacity-40">
                      <BotIcon className="w-5 h-5" />
                    </span>{" "}
                    {agent?.agent_name ? agent.agent_name : "-"}
                  </TableCell>
                  <TableCell>
                    {agent?.agent_type ? (
                      <Badge variant="secondary">{agent.agent_name}</Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="flex items-center">
                    <span className="mr-3">
                      <Avatar>
                        <AvatarImage
                          src={
                            agent?.voice_face_url ? agent.voice_face_url : ""
                          }
                          alt={agent?.voice ? agent.voice : "-"}
                        />
                      </Avatar>
                    </span>
                    {agent?.voice ? agent.voice : "-"}
                  </TableCell>
                  <TableCell>{agent?.phone ? agent.phone : "-"}</TableCell>
                  <TableCell>
                    {agent?.edited_date ? agent.edited_date : "-"}
                  </TableCell>
                  <TableCell>
                    {agent?.status ? (
                      <Badge
                        variant={
                          agent?.status === "Active" ? "success" : "destructive"
                        }
                      >
                        {agent.status}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-8 h-8 hover:rounded-sm hover:bg-zinc-800 opacity-50 cursor-pointer"
                        >
                          <EllipsisVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer">
                          <Copy /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <ArrowRightLeft />
                          Export
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          className="cursor-pointer"
                        >
                          <Trash2 />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AgentsList;
