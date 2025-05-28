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

const SinglePrompt = ({defaultName}) => {
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
          <GlobalSettings defaultName={defaultName} generalPrompt={general_prompt} beginMessage={begin_message} />
        </ScrollArea>
      </div>
      {/* agent test section */}
      <div className="w-1/4 h-full bg-neutral-900 rounded-md flex items-center justify-center">
        <p>Agent Testing UI</p>
      </div>
    </div>
  );
};

export default SinglePrompt;
