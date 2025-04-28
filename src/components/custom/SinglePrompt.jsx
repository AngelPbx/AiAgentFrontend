import React from "react";
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

const SinglePrompt = () => {
  return (
    <div className="h-full w-full flex gap-3 mt-2">
      {/* prompt section */}
      <div className="w-2/4 h-full bg-neutral-900 rounded-md px-5 pt-5 flex flex-col gap-3">
        <div className="gap-2 flex flex-col">
          <Label htmlFor="prompt">Universal prompt</Label>
          <Textarea
            id="prompt"
            className={"h-[400px]"}
            placeholder="Type in a universal prompt for your agent, such as it's role, conversational style, objective, etc."
          />
          <p className="text-xs text-muted-foreground">
            Use &#123;&#123; _ &#125;&#125; to add variables. (Learn more)
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="welcome-message">Welcome Message</Label>
          <Select>
            <SelectTrigger id="welcome-message" className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple" className={"cursor-pointer"}>
                  Apple
                </SelectItem>
                <SelectItem value="banana" className={"cursor-pointer"}>
                  Banana
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* prompt config section */}
      <div className="w-1/4 h-full bg-neutral-900 rounded-md px-5 pt-2 overflow-y-auto">
        <ScrollArea className="w-full h-[750px]">
          <GlobalSettings />
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
