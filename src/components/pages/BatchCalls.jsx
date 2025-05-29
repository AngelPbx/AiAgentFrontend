import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { DialogHeader } from "../ui/dialog";
import {
  CalendarIcon,
  CloudUpload,
  Download,
  Info,
  Trash2,
} from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import timeZone from "../../lib/timeZone.json";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Calendar } from "../ui/calendar";
import { DateTimePicker } from "../ui/date-time-picker";
import { toast } from "sonner";
import Papa from "papaparse";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ScrollArea } from "../ui/scroll-area";
// import templatecsv from "../../assets/template/template.csv";

const BatchCalls = () => {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full">
        <div>
          <h1 className="text-2xl font-bold">Batch Calls</h1>
          <p className="text-gray-600">You can manage your batch calls here.</p>
        </div>

        <div className="flex flex-col justify-between items-center">
          {/* Create batch calls button  */}
          <div className="flex items-center justify-end w-full">
            <Drawer>
              <DrawerTrigger asChild>
                <Button className={"cursor-pointer"}>
                  Create a batch call
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DialogHeader>
                  <DrawerTitle>Create a batch call</DrawerTitle>
                  <DrawerDescription>
                    <span className="flex items-center gap-2">
                      <Info className="size-4" /> Batch call cost $0.005 per
                      dial{" "}
                    </span>
                  </DrawerDescription>
                </DialogHeader>
                <BatchCallsConfig />
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
};

const BatchCallsConfig = () => {
  const [date, setDate] = useState(new Date());
  const [timeSchedule, setTimeSchedule] = useState("send-now");
  const [timeZoneValue, setTimeZoneValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);

  console.log("selectedFile: ", selectedFile);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const handleFileChange = (event) => {
    // check the file type csv and size under the 50 MB
    const file = event.target.files[0];

    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    // Check file type
    if (file.type !== "text/csv") {
      toast.error("Only CSV files are allowed.");
      return;
    }

    // Check file size (50MB = 50 * 1024 * 1024 bytes)
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size must be under 50MB.");
      return;
    }

    // Parse CSV file
    Papa.parse(file, {
      complete: (result) => {
        const rows = result.data;

        // Ensure first row contains headers
        const headers = rows[0];
        if (
          !headers.includes("phone number") ||
          !headers.includes("dynamic variable1") ||
          !headers.includes("dynamic variable2")
        ) {
          toast.error(
            "CSV format is incorrect. Required headers: phone number, dynamic variable1, dynamic variable2."
          );
          return;
        }

        // Extract data
        const formattedData = rows.slice(1).map((row) => ({
          phoneNumber: row[headers.indexOf("phone number")],
          dynamicVariable1: row[headers.indexOf("dynamic variable1")],
          dynamicVariable2: row[headers.indexOf("dynamic variable2")],
        }));

        setSelectedFile(formattedData);
      },
      error: (err) => {
        toast.error("Error parsing CSV file: " + err.message);
      },
      header: false, // Keep this `false` to process manually
    });

    setCurrentFile(file);
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full mt-4">
        <div className="h-full flex flex-col md:flex-row items-start justify-between gap-2">
          {/* All the input fields  */}
          <div className=" rounded-md shadow-md p-4 flex-1 max-w-2xl h-full">
            <div className="w-full h-full flex flex-col gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="batch-call">Batch Call Name</Label>
                <Input
                  type="text"
                  id="batch-call"
                  placeholder="Enter batch call name"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="from-number">From number</Label>
                <Select>
                  <SelectTrigger className="w-full" id="from-number">
                    <SelectValue placeholder="Select a number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select a number</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Upload Recipients</Label>
                <Button
                  variant={"outline"}
                  className={"cursor-pointer"}
                  // onClick={() => {
                  //   console.log("sample: ", templatecsv);
                  // }}
                >
                  <Download /> Download the template
                </Button>
                {currentFile ? (
                  <div className="w-full py-2 px-2 flex items-center justify-between rounded-md bg-zinc-800">
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-file-csv text-2xl text-red-400" />
                      <p className="text-sm text-muted-foreground">
                        {currentFile?.name}
                      </p>
                    </span>
                    <Button
                      variant={"ghost"}
                      className={
                        "cursor-pointer text-red-800 hover:text-red-600"
                      }
                      size={"icon"}
                      onClick={() => {
                        setSelectedFile(null);
                        setCurrentFile(null);
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                ) : (
                  <div className="grid w-full items-center gap-1.5 py-4">
                    <Label
                      htmlFor="fileInput"
                      className="group relative flex cursor-pointer flex-col justify-center rounded-lg border-2 border-dashed transition-colors dark:border-white/20 dark:hover:bg-black/20 border-stroke-soft-200 hover:border-primary hover:bg-bg-weak-50 h-[150px] items-center"
                    >
                      <CloudUpload />
                      <p className="mb-1 text-sm text-gray-900 dark:text-white">
                        Choose a file or drag &amp; drop it here
                      </p>
                      <p className="text-xs text-text-sub-600 dark:text-white/70">
                        Only CSV format files are supported
                      </p>
                      <p className="text-xs text-text-sub-600 dark:text-white/70">
                        Upto 50 MB
                      </p>
                    </Label>
                    <Input
                      id="fileInput"
                      accept=".csv"
                      className="hidden"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>When to send the calls</Label>
                <RadioGroup
                  value={timeSchedule}
                  onValueChange={setTimeSchedule}
                  className={"flex w-full"}
                >
                  <div className="flex items-center justify-between text-xl space-x-2 border rounded-md p-4 w-1/2">
                    <Label htmlFor="r1">Send Now</Label>
                    <RadioGroupItem
                      value="send-now"
                      id="r1"
                      className={"cursor-pointer"}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xl space-x-2 border rounded-md p-4 w-1/2">
                    <Label htmlFor="r2">Schedule</Label>
                    <RadioGroupItem
                      value="schedule"
                      id="r2"
                      className={"cursor-pointer"}
                    />
                  </div>
                </RadioGroup>
              </div>

              {timeSchedule === "schedule" && (
                <div className="grid grid-cols-2 items-center gap-1.5">
                  <div className="">
                    <DateTimePicker onChange={setDate} minDate={tomorrow} />
                  </div>
                  <div className="">
                    <Select
                      className="w-full"
                      value={timeZoneValue}
                      onValueChange={setTimeZoneValue}
                    >
                      <SelectTrigger className="w-full" id="from-number">
                        <SelectValue placeholder="Select a timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select a timezone</SelectLabel>
                          {timeZone?.map((time, index) => (
                            <SelectItem key={index} value={time.zone}>
                              {time.zone}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              <div className="">
                <Button
                  className={"cursor-pointer w-full"}
                  size={"lg"}
                  variant={"default"}
                  disabled
                >
                  Save
                </Button>
              </div>
            </div>
          </div>

          {/* Data table to show the imported batch calls  */}
          <div className="bg-white dark:bg-zinc-900 rounded-md shadow-md p-4 flex-1 w-full h-full flex">
            {selectedFile && (
              <div className="w-full min-h-full">
                <ScrollArea className={"w-full h-[500px]"}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>phone number</TableHead>
                        <TableHead>dynamic variable1</TableHead>
                        <TableHead>dynamic variable2</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedFile &&
                        selectedFile.map((item, index) => (
                          <TableRow>
                            <TableCell key={index}>{index}</TableCell>
                            <TableCell>{item.phoneNumber}</TableCell>
                            <TableCell>{item.dynamicVariable1}</TableCell>
                            <TableCell>{item.dynamicVariable2}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BatchCalls;
