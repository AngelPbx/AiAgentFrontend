import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  Ban,
  Binary,
  Book,
  Bot,
  Box,
  ChartLine,
  Headphones,
  List,
  Plus,
  Settings,
  ShieldCheck,
  Speech,
  Text,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const GlobalSettings = () => {
  return (
    <>
      <div className="w-full">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="agent-settings">
            <AccordionTrigger>
              <div className="flex items-center gap-3 font-bold text-sm cursor-pointer">
                <Bot className="w-5 h-5" />
                Agent Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <AgentSettings />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="knowsedge-base">
            <AccordionTrigger>
              <div className="flex items-center gap-3 font-bold text-sm cursor-pointer">
                <Book className="w-5 h-5" />
                Knoledge Base
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                <p className="text-sm font-normal mb-2">
                  {" "}
                  Add knowledge base to provide context to the agent.
                </p>

                <Select>
                  <SelectTrigger className="w-[180px] cursor-pointer">
                    <SelectValue placeholder="Select a knowledge base" />
                  </SelectTrigger>
                  <SelectContent className={"w-[250px] px-2"}>
                    <SelectGroup>
                      <SelectItem value="knowledge-1">Knowledge 1</SelectItem>
                      <SelectItem value="knowledge-2">Knowledge 2</SelectItem>
                    </SelectGroup>
                    <Separator className={"my-2"} />
                    <Link
                      to="/agents/knowledge-base"
                      target="_blank"
                      className="flex items-center justify-center gap-2"
                    >
                      <ArrowUpRight className="h-5 w-5" /> Create New
                    </Link>
                  </SelectContent>
                </Select>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="speech-settings">
            <AccordionTrigger>
              <div className="flex items-center gap-3 font-bold text-sm cursor-pointer">
                <Speech className="w-5 h-5" />
                Speech Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <SpeechSettings />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="call-settings">
            <AccordionTrigger>
              <div className="flex items-center gap-3 font-bold text-sm cursor-pointer">
                <Headphones className="w-5 h-5" />
                Call Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CallSettings />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="post-call-analysis">
            <AccordionTrigger>
              <div className="flex items-center gap-3 font-bold text-sm cursor-pointer">
                <ChartLine className="w-5 h-5" />
                Post-Call Analysis
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <PostCallAnalysis />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="security-fallback">
            <AccordionTrigger>
              <div className="flex items-center gap-3 font-bold text-sm cursor-pointer">
                <ShieldCheck className="w-5 h-5" />
                Security & Fallback Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <SecurityAndFallbackModel />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="webhook-settings">
            <AccordionTrigger>
              <div className="flex items-center gap-3 font-bold text-sm cursor-pointer">
                <Box className="w-5 h-5" />
                Webhook Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <WebhookSettings />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default GlobalSettings;

// Agent settings model content
const AgentSettings = () => {
  const countryData = [
    { language: "English", country: "United States", country_code: "US" },
    { language: "Spanish", country: "Spain", country_code: "ES" },
    { language: "Hindi", country: "India", country_code: "IN" },
    { language: "Mandarin", country: "China", country_code: "CN" },
    { language: "Arabic", country: "Saudi Arabia", country_code: "SA" },
    { language: "French", country: "France", country_code: "FR" },
    { language: "Portuguese", country: "Brazil", country_code: "BR" },
    { language: "German", country: "Germany", country_code: "DE" },
    { language: "Japanese", country: "Japan", country_code: "JP" },
    { language: "Russian", country: "Russia", country_code: "RU" },
    { language: "Italian", country: "Italy", country_code: "IT" },
    { language: "Korean", country: "South Korea", country_code: "KR" },
    { language: "Turkish", country: "Turkey", country_code: "TR" },
    { language: "Dutch", country: "Netherlands", country_code: "NL" },
    { language: "Swahili", country: "Kenya", country_code: "KE" },
  ];

  const [voiceModel, setVoiceModel] = useState("auto");
  const [voiceSpeed, setVoiceSpeed] = useState([40]);
  const [voiceTemprature, setVoiceTemprature] = useState([20]);
  const [voiceVolume, setVolume] = useState([60]);

  return (
    <div className="w-full">
      {/* voice and language  */}
      <div>
        <p className="mb-2">Voice & Language</p>
        <div className="text-sm text-muted-foreground flex items-center justify-between">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Language</SelectLabel>
                {countryData.map((country) => (
                  <SelectItem
                    key={country.country_code}
                    value={country.country_code}
                  >
                    <Avatar>
                      <AvatarImage
                        src={`https://flagsapi.com/${country.country_code}/flat/64.png`}
                        alt={`${country.language} - ${country.country}`}
                      />
                    </Avatar>
                    {`${country.language} - ${country.country}`}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className={"!border-r-0 max-w-[180px] cursor-pointer"}
                >
                  <Avatar>
                    <AvatarImage
                      src={`https://flagsapi.com/${countryData[0].country_code}/flat/64.png`}
                      alt={`${countryData[0].language} - ${countryData[0].country}`}
                    />
                  </Avatar>{" "}
                  Adam watson
                </Button>
              </DialogTrigger>
              <DialogContent className="min-w-2/3">
                <DialogHeader>
                  <DialogTitle>Select Voice</DialogTitle>
                </DialogHeader>
                <SelectVoice />
              </DialogContent>
            </Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="outline"
                  size={"icon"}
                  asChild
                  className={"cursor-pointer"}
                >
                  <Settings className="w-7 h-7" />
                </Button>
                <DropdownMenuContent className="w-fit">
                  <DropdownMenuLabel>Voice Model</DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={voiceModel}
                    onValueChange={setVoiceModel}
                  >
                    <DropdownMenuRadioItem
                      className="cursor-pointer"
                      value="auto"
                    >
                      <div className="flex flex-col">
                        <p>Auto(Elevenlabs Turbo V2)</p>
                        <p className="text-xs text-muted-foreground">
                          English only, fast, high quality
                        </p>
                      </div>
                    </DropdownMenuRadioItem>
                    <Separator />
                    <DropdownMenuRadioItem
                      className="cursor-pointer"
                      value="turbo-v2"
                    >
                      <div className="flex flex-col">
                        <p>Elevenlabs Turbo V2</p>
                        <p className="text-xs text-muted-foreground">
                          English only, fast, high quality
                        </p>
                      </div>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      className="cursor-pointer"
                      value="flash-v2"
                    >
                      <div className="flex flex-col">
                        <p>Elevenlabs Flash V2</p>
                        <p className="text-xs text-muted-foreground">
                          English only, fastest, medium quality
                        </p>
                      </div>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      className="cursor-pointer"
                      value="turbo-v2-5"
                    >
                      <div className="flex flex-col">
                        <p>Elevenlabs Turbo V2.5</p>
                        <p className="text-xs text-muted-foreground">
                          Multilingual, fast, high quality
                        </p>
                      </div>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      className="cursor-pointer"
                      value="flash-v2-5"
                    >
                      <div className="flex flex-col">
                        <p>Elevenlabs Flash V2.5</p>
                        <p className="text-xs text-muted-foreground">
                          Multilingual, fastest, medium quality
                        </p>
                      </div>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      className="cursor-pointer"
                      value="multilang-v2"
                    >
                      <div className="flex flex-col">
                        <p>Elevenlabs Multilingual v2</p>
                        <p className="text-xs text-muted-foreground">
                          Multilingual, slow, highest quality
                        </p>
                      </div>
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator />
                  <div className="px-2 mb-2">
                    <p>Voice Speed</p>
                    <div className="flex items-center justify-between">
                      <Slider
                        defaultValue={voiceSpeed}
                        max={100}
                        step={1}
                        className={cn("w-[80%]", "cursor-pointer")}
                        onValueChange={(value) => {
                          setVoiceSpeed(value);
                        }}
                        //   {...props}
                      />{" "}
                      {voiceSpeed}
                    </div>
                  </div>
                  <div className="px-2 mb-2">
                    <p>Voice Temperature</p>
                    <div className="flex items-center justify-between">
                      <Slider
                        defaultValue={voiceTemprature}
                        max={100}
                        step={1}
                        className={cn("w-[80%]", "cursor-pointer")}
                        onValueChange={(value) => {
                          setVoiceTemprature(value);
                        }}
                        //   {...props}
                      />{" "}
                      {voiceTemprature}
                    </div>
                  </div>
                  <div className="px-2 mb-2">
                    <p>Voice Volume</p>
                    <div className="flex items-center justify-between">
                      <Slider
                        defaultValue={voiceVolume}
                        max={100}
                        step={1}
                        className={cn("w-[80%]", "cursor-pointer")}
                        onValueChange={(value) => {
                          setVolume(value);
                        }}
                        //   {...props}
                      />{" "}
                      {voiceVolume}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <Button className="w-full cursor-pointer">Save</Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        </div>
        <p className="my-2">Global Prompt</p>
        <div className="flex">
          <Select>
            <SelectTrigger className="w-[180px] cursor-pointer">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="elevelabs">Elevenlabs</SelectItem>
              <SelectItem value="playht">PlayHT</SelectItem>
              <SelectItem value="openai">OpenAI</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant={"outline"} className={"cursor-pointer"}>
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"w-[350px] p-3"}>
              <div>
                <p className="text-xl">LLM Temperature</p>
                <p className="text-xs text-muted-foreground">
                  Lower value yields better function call results.
                </p>
                <div className="flex items-center justify-between">
                  <Slider
                    defaultValue={voiceTemprature}
                    max={100}
                    step={1}
                    className={cn("w-[80%]", "cursor-pointer")}
                    onValueChange={(value) => {
                      setVoiceTemprature(value);
                    }}
                    //   {...props}
                  />{" "}
                  {voiceTemprature}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xl">Structured Output</p>
                <p className="text-xs text-muted-foreground">
                  Always generate responses that adhere to your supplied JSON
                  Schema. This will make functions longer to save or update.
                </p>
                <div class="flex items-center justify-between">
                  <Switch className={"cursor-pointer mt-4"} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xl">High Priority</p>
                <p className="text-xs text-muted-foreground">
                  Use more dedicated resource pool to ensure lower and more
                  consistent latency. This feature incurs a higher cost.
                </p>
                <div class="flex items-center justify-between">
                  <Switch className={"cursor-pointer mt-4"} />
                </div>
              </div>
              <Separator className={"my-4"} />
              <Button className={"w-full"} disabled>
                Save
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

// select voice modal content
const SelectVoice = () => {
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
  ];
  return (
    <>
      <div>
        <Tabs defaultValue="elevelabs" className="w-full">
          <TabsList className="grid w-[400px] grid-cols-3">
            <TabsTrigger value="elevelabs" className={"cursor-pointer"}>
              Elevenlabs
            </TabsTrigger>
            {/* <TabsTrigger value="playht" className={"cursor-pointer"}>
              PlayHT
            </TabsTrigger>
            <TabsTrigger value="openai" className={"cursor-pointer"}>
              OpenAI
            </TabsTrigger> */}
          </TabsList>
          <TabsContent value="elevelabs">
            <div className="flex w-full flex-row justify-start gap-4">
              <Select>
                <SelectTrigger className="w-[180px] cursor-pointer">
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a voice</SelectLabel>
                    <SelectItem value="apple">All Gender</SelectItem>
                    <SelectItem value="banana">Male</SelectItem>
                    <SelectItem value="blueberry">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] cursor-pointer">
                  <SelectValue placeholder="All Accent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Accent List</SelectLabel>
                    <SelectItem value="apple">All Accent</SelectItem>
                    <SelectItem value="banana">American</SelectItem>
                    <SelectItem value="blueberry">British</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] cursor-pointer">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>All Types</SelectLabel>
                    <SelectItem value="apple">Types List</SelectItem>
                    <SelectItem value="banana">Retell Presets</SelectItem>
                    <SelectItem value="blueberry">Provider Presets</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input className="w-[400px]" placeholder="Search voice..." />
            </div>
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">
                        {invoice.invoice}
                      </TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        {invoice.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          {/* <TabsContent value="playht">
            <h2>pass</h2>
          </TabsContent>
          <TabsContent value="openai">
            <h2>pass</h2>
          </TabsContent> */}
        </Tabs>
      </div>
    </>
  );
};

// speech settings modal content
const SpeechSettings = () => {
  const [voiceSpeed, setVoiceSpeed] = useState([30]);
  return (
    <>
      <div className="w-full font-normal">
        <div>
          <p className="mb-2">Background Sound</p>
          <div className="flex items-center gap-3">
            <Select>
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Select a background sound" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  <SelectItem value="coffe-shop">Coffe Shop</SelectItem>
                  <SelectItem value="rain">Rain</SelectItem>
                  <SelectItem value="wind">Wind</SelectItem>
                  <SelectItem value="convention-hall">
                    Convention Hall
                  </SelectItem>
                  <SelectItem value="summer-outdoor">Summer Outdoor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant={"icon"}
                  size={"icon"}
                  className="w-5 h-5 cursor-pointer"
                  asChild
                >
                  <Settings />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={cn("w-56", "me-6")}>
                <div className="px-2 mb-2">
                  <p>Voice Speed</p>
                  <div className="flex items-center justify-between">
                    <Slider
                      defaultValue={voiceSpeed}
                      max={100}
                      step={1}
                      className={cn("w-[80%]", "cursor-pointer")}
                      onValueChange={(value) => {
                        setVoiceSpeed(value);
                      }}
                      //   {...props}
                    />{" "}
                    {voiceSpeed}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2 font-bold">Responsiveness</p>
          <p className="text-sm text-muted-foreground">
            Control how fast the agent responds after users finish speaking.
          </p>
          <div className="flex items-center justify-between">
            <Slider
              defaultValue={voiceSpeed}
              max={100}
              step={1}
              className={cn("w-[80%]", "cursor-pointer")}
              onValueChange={(value) => {
                setVoiceSpeed(value);
              }}
              //   {...props}
            />{" "}
            {voiceSpeed}
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2 font-bold">Interruption Sensitivity</p>
          <p className="text-sm text-muted-foreground">
            Control how sensitively AI can be interrupted by human speech.
          </p>
          <div className="flex items-center justify-between">
            <Slider
              defaultValue={voiceSpeed}
              max={100}
              step={1}
              className={cn("w-[80%]", "cursor-pointer")}
              onValueChange={(value) => {
                setVoiceSpeed(value);
              }}
              //   {...props}
            />{" "}
            {voiceSpeed}
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2 font-bold">Enable Backchanneling</p>
          <p className="text-sm text-muted-foreground">
            Enables the agent to use affirmations like 'yeah' or 'uh-huh' during
            conversations, indicating active listening and engagement.
          </p>
          <Switch className={"mt-2 cursor-pointer"} />
        </div>
        <div className="mt-4">
          <p className="mb-2 font-bold">Transcription Mode</p>
          <p className="text-sm text-muted-foreground">
            Balance between speed and accuracy.
          </p>
          <RadioGroup defaultValue="optimized-accuracy" className="mt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="optimized-speed"
                id="r1"
                className={"cursor-pointer border border-white"}
              />
              <p htmlFor="r1">Optimize for speed</p>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="optimized-accuracy"
                id="r2"
                className={"cursor-pointer border border-white"}
              />
              <p htmlFor="r2">Optimize for accuracy</p>
            </div>
          </RadioGroup>
        </div>
        <div className="mt-4">
          <p className="mb-2 font-bold">Boosted Keywords</p>
          <p className="text-sm text-muted-foreground">
            Provide a customized list of keywords to expand our models'
            vocabulary.
          </p>
          <Input
            className={"mt-2"}
            placeholder="Split by comma. Ex: hello, hi"
          />
        </div>
        <div className="mt-4">
          <p className="mb-2 font-bold">Enable Speech Normalization</p>
          <p className="text-sm text-muted-foreground">
            It converts text elements like numbers, currency, and dates into
            human-like spoken forms. (Learn more)
          </p>
          <Switch className={"mt-2 cursor-pointer"} />
        </div>
        <div className="mt-4">
          <p className="mb-2 font-bold">Enable Transcript Formatting</p>
          <p className="text-sm text-muted-foreground">
            Prevent agent errors like phone numbers being formatted as
            timestamps.
          </p>
          <Switch className={"mt-2 cursor-pointer"} />
        </div>
        <div className="mt-4">
          <p className="mb-2 font-bold">Reminder Message Frequency</p>
          <p className="text-sm text-muted-foreground">
            Control how often AI will send a reminder message.
          </p>
          <div className="flex items-center mt-2">
            <Input className={"w-12 mx-2"} defaultValue="5" /> seconds{" "}
            <Input className={"w-12 mx-2"} defaultValue="10" /> minutes
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2 font-bold">Pronunciation</p>
          <p className="text-sm text-muted-foreground">
            Guide the model to pronunce a word, name, or phrase in a specific
            way. (Learn more)
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className={"cursor-pointer mt-2"}>
                <Plus /> Add
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[500px]">
              <DialogHeader>
                <DialogTitle>Pronunciation</DialogTitle>
              </DialogHeader>
              <div className="">
                <div className="flex gap-2 flex-col w-full">
                  <Label htmlFor="word">Word</Label>
                  <Input type="text" id="word" placeholder="word" />
                </div>
                <div className="flex gap-2 flex-col w-full mt-4">
                  <Label htmlFor="pronunciation">Pronunciation</Label>
                  <Select>
                    <SelectTrigger className="w-full" id="pronunciation">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 flex-col w-full  mt-4">
                  <Label htmlFor="phoneme">Phoneme</Label>
                  <Input type="text" id="phoneme" placeholder="Phoneme" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline" className={"cursor-pointer"}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className={"cursor-pointer"} disabled>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

// call settings modal content
const CallSettings = () => {
  const [voiceSpeed, setVoiceSpeed] = useState([30]);

  return (
    <>
      <div className="w-full font-normal">
        <div className="mt-2">
          <p className="mb-2 font-bold">Voicemail Detection</p>
          <p className="text-sm text-muted-foreground">
            Hang up or leave a voicemail if a voicemail is detected.
          </p>
          <Switch className={"mt-2 cursor-pointer"} />
        </div>
        <div className="mt-4">
          <p className="mb-2 font-bold">End Call on Silence</p>
          <div className="flex items-center justify-between">
            <Slider
              defaultValue={voiceSpeed}
              max={100}
              step={1}
              className={cn("w-[80%]", "cursor-pointer")}
              onValueChange={(value) => {
                setVoiceSpeed(value);
              }}
              //   {...props}
            />{" "}
            {voiceSpeed}
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2 font-bold">Max Call Duration</p>
          <div className="flex items-center justify-between">
            <Slider
              defaultValue={voiceSpeed}
              max={100}
              step={1}
              className={cn("w-[80%]", "cursor-pointer")}
              onValueChange={(value) => {
                setVoiceSpeed(value);
              }}
              //   {...props}
            />{" "}
            {voiceSpeed}
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2 font-bold">Pause Before Speaking</p>
          <p className="text-sm text-muted-foreground">
            The duration before the assistant starts speaking at the beginning
            of the call.
          </p>
          <div className="flex items-center justify-between">
            <Slider
              defaultValue={voiceSpeed}
              max={100}
              step={1}
              className={cn("w-[80%]", "cursor-pointer")}
              onValueChange={(value) => {
                setVoiceSpeed(value);
              }}
              //   {...props}
            />{" "}
            {voiceSpeed}
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2 font-bold">Ring Duration</p>
          <p className="text-sm text-muted-foreground">
            The duration for which the phone will ring before the call is
            answered or terminated.
          </p>
          <div className="flex items-center justify-between">
            <Slider
              defaultValue={voiceSpeed}
              max={100}
              step={1}
              className={cn("w-[80%]", "cursor-pointer")}
              onValueChange={(value) => {
                setVoiceSpeed(value);
              }}
              //   {...props}
            />{" "}
            {voiceSpeed}
          </div>
        </div>
      </div>
    </>
  );
};

// post-call analysis modal content
const PostCallAnalysis = () => {
  return (
    <>
      <Dialog>
        <div className="w-full font-normal">
          <div className="mt-2">
            <p className="mb-2 font-bold">Post Call Data Retrieval</p>
            <p className="text-sm text-muted-foreground">
              Define the information that you need to extract from the call.
              (Learn more)
            </p>
            <div className="mt-2 flex items-center justify-evenly gap-3">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer border w-[100px] flex items-center gap-2 rounded-md py-2 px-3 bg-zinc-900">
                    <Plus /> Add
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={"w-full"}>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <DialogTrigger className="flex items-center gap-2 cursor-pointer">
                        <Text /> Text
                      </DialogTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <DialogTrigger className="flex items-center gap-2 cursor-pointer">
                        <List /> Selector
                      </DialogTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <DialogTrigger className="flex items-center gap-2 cursor-pointer">
                        <Ban /> Boolean
                      </DialogTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <DialogTrigger className="flex items-center gap-2 cursor-pointer">
                        <Binary /> Number
                      </DialogTrigger>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <Select defaultValue="gpt-4o">
                  <SelectTrigger className="w-[150px] cursor-pointer">
                    <Settings />
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Model</SelectLabel>
                      <SelectItem value="gpt-4o-mini">
                        GPT-4o Mini{" "}
                        <span className="text-xs text-muted-foreground">
                          (free)
                        </span>
                      </SelectItem>
                      <SelectItem value="gpt-4o">
                        GPT-4o{" "}
                        <span className="text-xs text-muted-foreground">
                          ($0.017/session)
                        </span>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className={"flex items-center gap-2"}>
                <Text />
                Text
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3 my-4"
                  placeholder="John Smith"
                />
              </div>
              <div className="items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  className="col-span-3 my-4 h-24"
                  placeholder="Enter a description"
                />
              </div>
              <div className="items-center gap-4 flex">
                <div className="flex flex-col w-full ">
                  <Label htmlFor="example" className="text-right">
                    Format Example (Optional)
                  </Label>
                  <Input
                    id="example"
                    className="w-full mt-4"
                    placeholder="Option value"
                  />
                </div>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className={
                    "mt-8 cursor-pointer text-red-800 hover:text-red-600"
                  }
                >
                  <Trash2 className="" />
                </Button>
              </div>
              <Button variant="outline" className={"mt-4 cursor-pointer"}>
                <Plus />
                Add
              </Button>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

// security and fallback model content
const SecurityAndFallbackModel = () => {
  return (
    <>
      <div className="w-full font-normal">
        <div className="mt-4">
          <p className="mb-2 font-bold">Opt Out Sensitive Data Storage</p>
          <p className="text-sm text-muted-foreground">
            Control whether Retell should store sensitive data. (Learn more)
          </p>
          <Switch className={"mt-2 cursor-pointer"} />
        </div>
        <div className="mt-4">
          <p className="mb-2 font-bold">Opt In Secure URLs</p>
          <p className="text-sm text-muted-foreground">
            Add security signatures to URLs. The URLs expire after 24 hours.
            (Learn more)
          </p>
          <Switch className={"mt-2 cursor-pointer"} />
        </div>
        <div className="mt-4">
          <p className="mb-2 font-bold">Fallback Voice ID</p>
          <p className="text-sm text-muted-foreground">
            If the current voice provider fails, assign a fallback voice to
            continue the call.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                className={" max-w-[180px] cursor-pointer mt-3"}
              >
                <Plus /> Add
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-2/3">
              <DialogHeader>
                <DialogTitle>Select Voice</DialogTitle>
              </DialogHeader>
              <SelectVoice />
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-4">
          <p className="mb-2 font-bold">Default Dynamic Variables</p>
          <p className="text-sm text-muted-foreground">
            Set fallback values for dynamic variables across all endpoints if
            they are not provided.
          </p>
          <Button
            variant={"outline"}
            className={" max-w-[180px] cursor-pointer mt-3"}
          >
            <Settings /> Set Up
          </Button>
        </div>
      </div>
    </>
  );
};

// webhook settings modal content
const WebhookSettings = () => {
  return (
    <>
      <div className="w-full font-normal">
        <div className="mt-4">
          <Label className="mb-2 font-bold" htmlFor="inbound-call">
            Inbound Call Webhook URL
          </Label>
          <p className="text-sm text-muted-foreground">
            The webhook has been migrated to phone level webhook. (Learn more).
          </p>
          <Input id="inbound-call" className={"mt-2"} />
        </div>
        <div className="mt-4">
          <Label className="mb-2 font-bold" htmlFor="agent-level">
            Agent Level Webhook URL
          </Label>
          <p className="text-sm text-muted-foreground">
            Webhook URL to receive events from Retell. (Learn more)
          </p>
          <Input id="agent-level" className={"mt-2"} />
        </div>
      </div>
    </>
  );
};
