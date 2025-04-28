import {
  ArrowRightLeft,
  Bot,
  BotIcon,
  Brackets,
  ChartCandlestick,
  ChevronDown,
  CloudUpload,
  Copy,
  EllipsisVertical,
  Link,
  PhoneOutgoing,
  Plus,
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
import { Card } from "@/components/ui/card";
import { DialogClose } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";
import {
  initialEdges,
  initialNodes,
} from "@/components/custom/ReactFlow/workflow.constants";
import { useDispatch } from "react-redux";

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
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-fu">
        <div>
          <h1 className="text-2xl font-bold">Agents</h1>
          <p className="text-gray-600">You can manage your agents here.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full md:w-sm"
          />
          <div className="mt-4 md:mt-0">
            {/* Create an agent */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="cursor-pointer w-25 me-3">
                  Create <ChevronDown />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2/4">
                <DialogHeader>
                  <DialogTitle>Select Template</DialogTitle>
                </DialogHeader>
                <CreateAgent />
              </DialogContent>
            </Dialog>
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

const CreateAgent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState("single-prompt");
  const [agentType, setAgentType] = useState("single-blank");

  const emptyInitialNodes = [
    {
      id: "7",
      position: { x: 275, y: 200 },
      type: "callBegin",
    },
  ];

  const emptyInitialEdges = [];

  const handleClick = () => {
    console.log("agentType", agentType);
    if (
      // agentType === "single-healthcare" ||
      agentType === "conversation-flow-patiend-screening"
    ) {
      dispatch({ type: "SET_INITIAL_NODES", payload: initialNodes });
      dispatch({ type: "SET_INITIAL_EDGES", payload: initialEdges });
    } else {
      dispatch({ type: "SET_INITIAL_NODES", payload: emptyInitialNodes });
      dispatch({ type: "SET_INITIAL_EDGES", payload: emptyInitialEdges });
      dispatch({ type: "CREATE_AGENT_TYPE", payload: "single" });
    }

    if (
      agentType === "conversation-flow-patiend-screening" ||
      agentType === "conversation-flow-blank"
    ) {
      dispatch({ type: "CREATE_AGENT_TYPE", payload: "multiple" });
    }

    navigate("/agents/conversations-flow");
  };

  return (
    <>
      <Dialog>
        <div className="w-full flex gap-2">
          {/* tab section  */}
          <div className="w-1/3 flex flex-col gap-4">
            <div
              className={`cursor-pointer border-2 border-transparent hover:border hover:bg-zinc-800 py-2 ps-2 rounded-md text-muted-foreground ${
                currentTab === "single-prompt" ? "bg-zinc-800 " : ""
              }`}
              onClick={() => {
                setCurrentTab("single-prompt");
              }}
            >
              <p>Single Prompt</p>
            </div>
            <div
              className={`cursor-pointer border-2 border-transparent hover:border hover:bg-zinc-800 py-2 ps-2 rounded-md text-muted-foreground ${
                currentTab === "conversation-flow" ? "bg-zinc-800 " : ""
              }`}
              onClick={() => {
                setCurrentTab("conversation-flow");
              }}
            >
              <p>Conversation Flow</p>
            </div>
          </div>

          {/* tab content section */}
          <div className="w-2/3">
            {currentTab === "single-prompt" && (
              <div className="grid grid-cols-2 gap-3">
                <DialogTrigger asChild>
                  <Card
                    className="col-span-1 min-h-[300px] cursor-pointer"
                    onClick={() => setAgentType("single-blank")}
                  >
                    <div className="h-full flex flex-col items-center justify-center">
                      <div className="border rounded-md flex items-center justify-center h-3/4 w-3/4 mx-auto">
                        <Plus className="w-20 h-20 text-muted-foreground" />
                      </div>
                      <p className="text-center mt-8 text-xl">
                        Start from blank
                      </p>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <Card
                    className="col-span-1 min-h-[300px] cursor-pointer"
                    onClick={() => setAgentType("single-healthcare")}
                  >
                    <div className="h-full flex flex-col items-center justify-center">
                      <div className="border rounded-md flex flex-col items-center justify-center h-3/4 w-3/4 mx-auto">
                        <div className="h-10 w-10 border rounded-full flex items-center justify-center text-muted-foreground">
                          <PhoneOutgoing />
                        </div>
                        <h2 className="mt-4">Healthcare Check-in</h2>
                        <p className="text-xs text-muted-foreground">
                          Transfer call
                        </p>
                      </div>
                      <p className="text-center mt-8 text-xl">
                        Healthcare Check-in
                      </p>
                      <p className="text-center mt-2 text-xs">
                        Ask questions to gather information, can transfer call.
                      </p>
                    </div>
                  </Card>
                </DialogTrigger>
              </div>
            )}

            {currentTab === "conversation-flow" && (
              <div className="grid grid-cols-2 gap-3">
                <DialogTrigger asChild>
                  <Card
                    className="col-span-1 min-h-[300px] cursor-pointer"
                    onClick={() => setAgentType("conversation-flow-blank")}
                  >
                    <div className="h-full flex flex-col items-center justify-center">
                      <div className="border rounded-md flex items-center justify-center h-3/4 w-3/4 mx-auto">
                        <Plus className="w-20 h-20 text-muted-foreground" />
                      </div>
                      <p className="text-center mt-8 text-xl">
                        Start from blank
                      </p>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <Card
                    className="col-span-1 min-h-[300px] cursor-pointer"
                    onClick={() =>
                      setAgentType("conversation-flow-patiend-screening")
                    }
                  >
                    <div className="h-full flex flex-col items-center justify-center">
                      <div className="border rounded-md flex items-center justify-center h-3/4 w-3/4 mx-auto">
                        <div className="relative flex h-full flex-row items-center justify-start">
                          <div className="absolute left-[-100px] top-[17px] inline-flex h-[90px] w-[100px] flex-col items-start justify-start gap-1 overflow-hidden rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-3 shadow-[0px_6px_12px_12px_rgba(0,0,0,0.02)]">
                            <div className="relative h-8 w-8">
                              <div className="absolute left-0 top-0 h-8 w-8 rounded-full border border-stroke-soft-200 bg-bg-white-0"></div>
                              <div className="absolute left-[8px] top-[8px] inline-flex h-4 w-4 items-center justify-center">
                                <Link />
                              </div>
                            </div>
                            <div className="self-stretch text-xs font-normal leading-tight text-text-strong-950">
                              Greetings
                            </div>
                          </div>
                          <div className="absolute left-[0px] top-[28px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="73"
                              viewBox="0 0 13 73"
                              fill="none"
                            >
                              <path
                                d="M12.3536 4.35355C12.5488 4.15829 12.5488 3.84171 12.3536 3.64645L9.17156 0.46447C8.9763 0.269211 8.65972 0.269211 8.46446 0.46447C8.2692 0.659737 8.2692 0.976318 8.46446 1.17158L11.2929 4L8.46447 6.82844C8.26921 7.0237 8.26921 7.34028 8.46447 7.53554C8.65974 7.7308 8.97632 7.7308 9.17158 7.53554L12.3536 4.35355ZM9.39991 4V4.5V4ZM1.39992 71.5H0L0 72.5H1.39992V71.5ZM12 3.5C11.2484 3.5 10.3203 3.5 9.39991 3.5V4.5C10.3203 4.5 11.2484 4.5 12 4.5L12 3.5ZM4.89992 8L4.89992 68H5.89992L5.89992 8H4.89992ZM9.39991 3.5C6.91463 3.5 4.89992 5.51472 4.89992 8H5.89992C5.89992 6.067 7.46692 4.5 9.39991 4.5V3.5ZM1.39992 72.5C3.8852 72.5 5.89992 70.4853 5.89992 68H4.89992C4.89992 69.933 3.33291 71.5 1.39992 71.5V72.5Z"
                                fill="#D2D6DB"
                              ></path>
                            </svg>
                          </div>
                          <div className="absolute left-[13px] top-[18px] inline-flex h-20 w-[100px] flex-col items-start justify-start gap-1 overflow-hidden rounded-xl border border-stroke-soft-200 bg-bg-white-0 p-3 shadow-[0px_6px_12px_12px_rgba(0,0,0,0.02)]">
                            <div className="relative h-8 w-8">
                              <div className="absolute left-0 top-0 h-8 w-8 rounded-full border border-stroke-soft-200 bg-bg-white-0"></div>
                              <div className="absolute left-[8px] top-[8px] inline-flex h-4 w-4 items-center justify-center">
                                <ChartCandlestick />
                              </div>
                            </div>
                            <div className="self-stretch text-sm font-normal leading-tight text-text-strong-950">
                              Screening
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-center mt-8 text-xl">
                        Patient Screening
                      </p>
                      <p className="text-center mt-2 text-xs">
                        Ask questions and log them in the post call analysis.
                      </p>
                    </div>
                  </Card>
                </DialogTrigger>
              </div>
            )}
          </div>
        </div>

        {/* dialog content */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a new agent</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Agent Name
              </Label>
              <Input
                id="name"
                type={"text"}
                placeholder="Enter a agent name"
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose>
              <Button variant={"outline"} className={"cursor-pointer"}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              className={"cursor-pointer"}
              onClick={handleClick}
              // onClick={() => navigate("/agents/conversations-flow")}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AgentsList;
