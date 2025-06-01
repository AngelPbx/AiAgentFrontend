import React, { useState } from "react";
import GlobalSettings from "./ReactFlow/customFeatures/NodeEditSection/GlobalSettings";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Info, MessageCircle, Mic, Phone, PhoneOff } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const SinglePrompt = ({
  defaultName,
  newAgent,
  saveClicked,
  agentData,
  llmData,
}) => {
  const [begin_message, setBeginMessage] = useState("");
  const [general_prompt, setGeneralPrompt] = useState("");
  return (
    <div className="h-full w-full flex gap-3 mt-2">
      {/* prompt section */}
      <div className="w-2/4 h-full bg-neutral-900 rounded-md px-5 pt-5 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="welcome-message">Welcome Message</Label>
          <Textarea
            id="prompt"
            className={"h-[50px]"}
            placeholder="Type the message that will be sent to the user when the agent is started."
            value={begin_message}
            onChange={(e) => setBeginMessage(e.target.value)}
          />
        </div>
        <div className="gap-2 flex flex-col">
          <Label htmlFor="prompt">General prompt</Label>
          <Textarea
            id="prompt"
            value={general_prompt}
            onChange={(e) => setGeneralPrompt(e.target.value)}
            className={"h-[400px]"}
            placeholder="Type in a universal prompt for your agent, such as it's role, conversational style, objective, etc."
          />
        </div>
      </div>
      {/* prompt config section */}
      <div className="w-1/4 h-full bg-neutral-900 rounded-md px-5 pt-2 overflow-y-auto">
        <ScrollArea className="w-full h-[750px]">
          <GlobalSettings
            defaultName={defaultName}
            generalPrompt={general_prompt}
            beginMessage={begin_message}
            newAgent={newAgent}
            saveClicked={saveClicked}
            agentData={agentData}
            llmData={llmData}
            setBeginMessage={setBeginMessage}
            setGeneralPrompt={setGeneralPrompt}
          />
        </ScrollArea>
      </div>
      {/* agent test section */}
      <div className="w-1/4 h-full bg-neutral-900 rounded-md flex  justify-center">
        <Tabs defaultValue="test-audio" className={"w-full h-full"}>
          <TabsList className={"w-full"}>
            <TabsTrigger value="test-audio">
              <span className=" flex items-center justify-center w-full cursor-pointer">
                <Phone />
                Test Audio
              </span>
            </TabsTrigger>
            <TabsTrigger value="test-llm">
              <span className=" flex items-center justify-center w-full cursor-pointer">
                <MessageCircle />
                Test LLM
              </span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="test-audio">
            {/* dummy UI  */}
            {/* <div className="w-full h-full flex flex-col item-center justify-center mx-auto">
              <div className="w-full flex items-center justify-center ">
              <Mic className="w-10 h-10 cursor-pointer text-muted-foreground" />
              </div>
              <div className="flex-items-center justify-center flex-row items-center">
                <p>Test your agent</p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-white cursor-pointer ml-2" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to library</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center justify-center mt-2">
                <Button variant="outline" className={"w-20 cursor-pointer"}>Text</Button>
                </div>
            </div> */}
            <div className="h-full w-full flex items-start justify-center">
              <div className="w-full items-center justify-center flex flex-col">
                <div className="w-full h-full flex justify-center items-center">
                  <div className="w-full max-w-md mt-10 p-4 rounded-lg shadow-md ">
                    <div className="space-y-2 flex flex-col">
                      <ScrollArea className="w-full h-[600px]">
                        {messages.map((msg, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg w-3/4 ${
                              msg.sender === "left"
                                ? " self-start"
                                : "bg-blue-500 text-white self-end"
                            }`}
                          >
                            {msg.text}
                          </div>
                        ))}
                      </ScrollArea>
                    </div>
                  </div>
                </div>
                <Separator className={"mb-2"} />
                <Button
                  variant={"outline"}
                  className={"text-red-800 hover:text-red-600 cursor-pointer"}
                >
                  <PhoneOff />
                  End the call
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="test-llm"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SinglePrompt;

const messages = [
  { text: "Hello!", sender: "left" },
  { text: "Hi! How are you?", sender: "right" },
  { text: "I'm good, thanks!", sender: "left" },
  { text: "Glad to hear that!", sender: "right" },
   { text: "Hello!", sender: "left" },
  { text: "Hi! How are you?", sender: "right" },
  { text: "I'm good, thanks!", sender: "left" },
  { text: "Glad to hear that!", sender: "right" },
   { text: "Hello!", sender: "left" },
  { text: "Hi! How are you?", sender: "right" },
  { text: "I'm good, thanks!", sender: "left" },
  { text: "Glad to hear that!", sender: "right" },
   { text: "Hello!", sender: "left" },
  { text: "Hi! How are you?", sender: "right" },
  { text: "I'm good, thanks!", sender: "left" },
  { text: "Glad to hear that!", sender: "right" },
   { text: "Hello!", sender: "left" },
  { text: "Hi! How are you?", sender: "right" },
  { text: "I'm good, thanks!", sender: "left" },
  { text: "Glad to hear that!", sender: "right" },
   { text: "Hello!", sender: "left" },
  { text: "Hi! How are you?", sender: "right" },
  { text: "I'm good, thanks!", sender: "left" },
  { text: "Glad to hear that!", sender: "right" },
   { text: "Hello!", sender: "left" },
  { text: "Hi! How are you?", sender: "right" },
  { text: "I'm good, thanks!", sender: "left" },
  { text: "Glad to hear that!", sender: "right" },
   { text: "Hello!", sender: "left" },
  { text: "Hi! How are you?", sender: "right" },
  { text: "I'm good, thanks!", sender: "left" },
  { text: "Glad to hear that!", sender: "right" },
   { text: "Hello!", sender: "left" },
  { text: "Hi! How are you?", sender: "right" },
  { text: "I'm good, thanks!", sender: "left" },
  { text: "Glad to hear that!", sender: "right" },

];
