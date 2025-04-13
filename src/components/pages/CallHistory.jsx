import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  ArrowUpFromLine,
  CalendarDays,
  CalendarIcon,
  Dot,
  Download,
  Headphones,
  History,
  Lightbulb,
  Phone,
  Plus,
  Settings,
  SquareCheck,
  Text,
  Trash,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

const calls = [
  {
    id: 1,
    time: "2023-01-01 15:21",
    call_duration: "00:05:00",
    type: "Incoming",
    cost: "0.048",
    call_id: "1234567890",
    disconnect_reason: "User hangup",
    call_status: "Completed",
    user_sentiment: "Positive",
    from: "",
    to: "",
    call_success: "Success",
    latency: "Low",
    question_1: "Yes",
    question_2: "None of the above",
    question_3: "Yes",
    question_4: "0",
  },
  {
    id: 2,
    time: "2023-01-02 10:15",
    call_duration: "00:05:00",
    type: "Outgoing",
    cost: "0.048",
    call_id: "1234567890",
    disconnect_reason: "User hangup",
    call_status: "Completed",
    user_sentiment: "Positive",
    from: "",
    to: "",
    call_success: "Success",
    latency: "Low",
    question_1: "Yes",
    question_2: "None of the above",
    question_3: "Yes",
    question_4: "0",
  },
];

const CallHistory = () => {
  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Call History</h1>
        <p className="text-gray-600">
          This is where you can view the call history.
        </p>
        {/* Add your call history table or component here */}
        <div className="flex justify-between items-center">
          {/* Button group */}
          <div className="flex gap-2 mb-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal cursor-pointer",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            {/* <Button variant="outline" className="cursor-pointer">
              <CalendarDays /> Date Range
            </Button> */}
            <Button variant="outline" className="cursor-pointer">
              <Plus /> Filter
            </Button>
            <Button variant="outline" className="cursor-pointer">
              <Settings /> Customize Fields
            </Button>
          </div>
          <div>
            <Button variant="outline" className="cursor-pointer">
              <ArrowUpFromLine /> Export
            </Button>
          </div>
        </div>

        {/* Call history table */}
        <Sheet>
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>A list of your recent calls.</TableCaption>
              <TableHeader className="bg-zinc-800">
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Call Duration</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Call ID</TableHead>
                  <TableHead>Disconnect Reason</TableHead>
                  <TableHead>Call Status</TableHead>
                  <TableHead>User Sentiment</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Call Success</TableHead>
                  <TableHead>Latency</TableHead>
                  <TableHead>Question 1</TableHead>
                  <TableHead>Question 2</TableHead>
                  <TableHead>Question 3</TableHead>
                  <TableHead>Question 4</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calls.map((call, index) => (
                  <>
                    <TableRow key={index}>
                      <TableCell>
                        <SheetTrigger>
                          {" "}
                          {call.time ? call.time : "-"}
                        </SheetTrigger>
                      </TableCell>
                      <TableCell>
                        {call.call_duration ? call.call_duration : "-"}
                      </TableCell>
                      <TableCell>{call.type ? call.type : "-"}</TableCell>
                      <TableCell>{call.cost ? call.cost : "-"}</TableCell>
                      <TableCell>{call.call_id ? call.call_id : "-"}</TableCell>
                      <TableCell>
                        {call.disconnect_reason ? call.disconnect_reason : "-"}
                      </TableCell>
                      <TableCell>
                        {call.call_status ? call.call_status : "-"}
                      </TableCell>
                      <TableCell>
                        {call.user_sentiment ? call.user_sentiment : "-"}
                      </TableCell>
                      <TableCell>{call.from ? call.from : "-"}</TableCell>
                      <TableCell>{call.to ? call.to : "-"}</TableCell>
                      <TableCell>
                        {call.call_success ? call.call_success : "-"}
                      </TableCell>
                      <TableCell>{call.latency ? call.latency : "-"}</TableCell>
                      <TableCell>
                        {call.question_1 ? call.question_1 : "-"}
                      </TableCell>
                      <TableCell>
                        {call.question_2 ? call.question_2 : "-"}
                      </TableCell>
                      <TableCell>
                        {call.question_3 ? call.question_3 : "-"}
                      </TableCell>
                      <TableCell>
                        {call.question_4 ? call.question_4 : "-"}
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </div>

          <SheetContent className="min-w-fit h-full overflow-y-auto px-3">
            <SheetHeader>
              <SheetTitle>Call history</SheetTitle>
              <SheetDescription>
                See all the details of this call history.
              </SheetDescription>
            </SheetHeader>
            <div className="flex justify-between items-center">
              <p className="text-sm">04/03/2025 15:21 web_call</p>
              <Trash className="cursor-pointer h-4 w-4" />
            </div>
            <p className="text-xs">
              Agent:{" "}
              <span className="hover:underline cursor-pointer">
                Patient Screening (from template)(age...b61)
              </span>
            </p>
            <p className="text-xs">
              Duration: 04/03/2025 15:21 - 04/03/2025 15:22
            </p>
            <p className="text-xs">Cost: $0.048</p>
            <div className="flex items-center mt-2">
              <audio controls className="w-[300px] h-10">
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
                Your browser does not support the audio element.
              </audio>
              <Button
                variant="outline"
                className="cursor-pointer ms-4"
                size="icon"
              >
                <Download />
              </Button>
            </div>
            <Separator />
            <p>Conversation Analysis</p>
            <p className="text-sm text-muted-foreground">Preset</p>
            <div class=" inline-flex items-start justify-start gap-2">
              <div class="mt-2 inline-flex w-[280px] flex-col items-start justify-start gap-2">
                <div class=" inline-flex items-center justify-start gap-2">
                  <div class="relative h-5 w-5 text-gray-500">
                    <SquareCheck className="h-4 w-4" />
                  </div>
                  <div class="text-sm font-normal leading-tight text-text-strong-950">
                    Call Successful
                  </div>
                </div>
                <div class=" inline-flex items-center justify-start gap-2">
                  <div class="relative h-5 w-5 text-gray-500">
                    <Headphones className="h-4 w-4" />
                  </div>
                  <div class="text-sm font-normal leading-tight text-text-strong-950">
                    Call Status
                  </div>
                </div>
                <div class=" inline-flex items-center justify-start gap-2">
                  <div class="relative h-5 w-5 text-gray-500">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div class="text-sm font-normal leading-tight text-text-strong-950">
                    User Sentiment
                  </div>
                </div>
                <div class=" inline-flex items-center justify-start gap-2">
                  <div class="relative h-5 w-5 text-gray-500">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div class="text-sm font-normal leading-tight text-text-strong-950">
                    Disconnection Reason
                  </div>
                </div>
              </div>
              <div class="mt-2 inline-flex w-[280px] flex-col items-start justify-start gap-2">
                <div class="inline-flex items-center justify-start gap-2">
                  <Dot className="h-6 w-6 text-red-500" />
                  <div class="text-sm font-normal leading-tight text-text-sub-600">
                    Unsuccessful
                  </div>
                </div>
                <div class=" inline-flex items-center justify-start gap-2">
                  <Dot className="h-6 w-6 text-white" />
                  <div class="text-sm font-normal leading-tight text-text-sub-600">
                    Ended
                  </div>
                </div>
                <div class=" inline-flex items-center justify-start gap-2">
                  <Dot className="h-6 w-6 text-blue-500" />
                  <div class="text-sm font-normal leading-tight text-text-sub-600">
                    Neutral
                  </div>
                </div>
                <div class=" inline-flex items-center justify-start gap-2">
                  <Dot className="h-6 w-6 text-green-500" />
                  <div class="text-sm font-normal leading-tight text-text-sub-600">
                    User_hangup
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-2 inline-flex w-[280px] flex-col items-start justify-start gap-2">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <div class="pt-5 text-xs font-normal text-gray-500">
                    Custom
                  </div>
                  <div class="inline-flex h-auto items-start justify-start gap-2">
                    <div class="inline-flex w-[280px] flex-col items-start justify-start gap-2">
                      <div class="inline-flex items-center justify-start gap-2">
                        <div class="relative h-5 w-5">
                          <Text className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div class="text-sm font-normal leading-tight text-text-strong-950">
                          _do you feel safe in your current living situation?
                        </div>
                      </div>
                    </div>
                    <div class="inline-flex w-[280px] flex-col items-start justify-start gap-2">
                      <div class="inline-flex items-center justify-start gap-2">
                        <div class="text-sm font-normal w-[248px] leading-tight text-text-sub-600">
                          Yes.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="inline-flex h-auto items-start justify-start gap-2">
                    <div class="inline-flex w-[280px] flex-col items-start justify-start gap-2">
                      <div class="inline-flex items-center justify-start gap-2">
                        <div class="relative h-5 w-5">
                          <Text className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div class="text-sm font-normal leading-tight text-text-strong-950">
                          _do you have problems with any of the following in
                          your home?
                        </div>
                      </div>
                    </div>
                    <div class="inline-flex w-[280px] flex-col items-start justify-start gap-2">
                      <div class="inline-flex items-center justify-start gap-2">
                        <div class="text-sm font-normal w-[248px] leading-tight text-text-sub-600">
                          None of the above.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="inline-flex h-auto items-start justify-start gap-2">
                    <div class="inline-flex w-[280px] flex-col items-start justify-start gap-2">
                      <div class="inline-flex items-center justify-start gap-2">
                        <div class="relative h-5 w-5">
                          <Text className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div class="text-sm font-normal leading-tight text-text-strong-950">
                          _do you currently have a steady place to live?
                        </div>
                      </div>
                    </div>
                    <div class="inline-flex w-[280px] flex-col items-start justify-start gap-2">
                      <div class="inline-flex items-center justify-start gap-2">
                        <div class="text-sm font-normal w-[248px] leading-tight text-text-sub-600">
                          Yes.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="inline-flex h-auto items-start justify-start gap-2">
                    <div class="inline-flex w-[280px] flex-col items-start justify-start gap-2">
                      <div class="inline-flex items-center justify-start gap-2">
                        <div class="relative h-5 w-5">
                          <Text className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div class="text-sm font-normal leading-tight text-text-strong-950">
                          _calculate the number of concerned questions
                        </div>
                      </div>
                    </div>
                    <div class="inline-flex w-[280px] flex-col items-start justify-start gap-2">
                      <div class="inline-flex items-center justify-start gap-2">
                        <div class="text-sm font-normal w-[248px] leading-tight text-text-sub-600">
                          0
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="inline-flex h-auto items-start justify-start gap-2">
                    <div class="inline-flex w-[280px] flex-col items-start justify-start gap-2">
                      <div class="inline-flex items-center justify-start gap-2">
                        <div class="relative h-5 w-5">
                          <Text className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div class="text-sm font-normal leading-tight text-text-strong-950">
                          _in the past 12 months, has lack of reliable
                          transportation prevented you from:
                        </div>
                      </div>
                    </div>
                    <div class="inline-flex w-[280px] flex-col items-start justify-start gap-2">
                      <div class="inline-flex items-center justify-start gap-2">
                        <div class="text-sm font-normal w-[248px] leading-tight text-text-sub-600">
                          None of the above.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="inline-flex h-auto items-start justify-start gap-2">
                    <div class="inline-flex w-[280px] flex-col items-start justify-start gap-2">
                      <div class="inline-flex items-center justify-start gap-2">
                        <div class="relative h-5 w-5">
                          <Text className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div class="text-sm font-normal leading-tight text-text-strong-950">
                          _within the past 12 months, have you worried about
                          running out of food before you had money to buy more?
                        </div>
                      </div>
                    </div>
                    <div class="inline-flex w-[280px] flex-col items-start justify-start gap-2">
                      <div class="inline-flex items-center justify-start gap-2">
                        <div class="text-sm font-normal w-[248px] leading-tight text-text-sub-600">
                          Never true.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="inline-flex h-auto items-start justify-start gap-2">
                    <div class="inline-flex w-[280px] flex-col items-start justify-start gap-2">
                      <div class="inline-flex items-center justify-start gap-2">
                        <div class="relative h-5 w-5">
                          <Text className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div class="text-sm font-normal leading-tight text-text-strong-950">
                          _are you currently employed?
                        </div>
                      </div>
                    </div>
                    <div class="inline-flex w-[280px] flex-col items-start justify-start gap-2">
                      <div class="inline-flex items-center justify-start gap-2">
                        <div class="text-sm font-normal w-[248px] leading-tight text-text-sub-600">
                          Yes, full-time.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div class="border-b border-stroke-sub-300-line p-4">
              <div class="text-sm font-medium leading-normal text-text-strong-950 mb-2">
                Summary
              </div>
              <div class="text-sm font-normal leading-tight text-text-strong-950 w-[500px]">
                The call was initiated by Anna, an AI representative from Retell
                Healthcare, to assist Evie Wang in accessing her health service
                portal. The conversation appears to be focused on providing
                support for health services.
              </div>
            </div>
            {/* <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter> */}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default CallHistory;
