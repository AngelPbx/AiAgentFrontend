import {
  Book,
  CloudUpload,
  Copy,
  Download,
  File,
  Pencil,
  Plus,
  Trash,
  Trash2,
} from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";

const KnowledgeBase = () => {
  return (
    <>
      <Dialog>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full">
          <div>
            <h1 className="text-2xl font-bold">Knowledge Base</h1>
            <p className="text-gray-600">
              You can manage your knowledge base here.
            </p>
          </div>
          <div className="h-full flex flex-col md:flex-row items-center justify-between gap-2">
            {/* File uploaded panel  */}
            <div className="bg-white dark:bg-zinc-800 rounded-md shadow-md p-4 flex-1 max-w-sm h-full">
              <div className="flex items-center justify-between mb-2">
                <h1 className="font-bold text-2xl">Uploaded Files</h1>
                <DialogTrigger asChild>
                  <Button size="icon" className="cursor-pointer">
                    <Plus />
                  </Button>
                </DialogTrigger>
              </div>
              <Separator className="my-2 bg-zinc-500" />
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between p-2 border rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer">
                  <span className="flex items-center gap-2">
                    <File className="w-5 h-5 text-muted-foreground" />
                    File 1
                  </span>
                  <span className="text-xs text-zinc-500">
                    Uploaded on 2023-01-01
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer">
                  <span>File 2</span>
                  <span className="text-xs text-zinc-500">
                    Uploaded on 2023-01-02
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer">
                  <span>File 3</span>
                  <span className="text-xs text-zinc-500">
                    Uploaded on 2023-01-03
                  </span>
                </div>
              </div>
            </div>
            {/* Show all the uploaded files and edit panels */}
            <div className="bg-white dark:bg-zinc-800 rounded-md shadow-md p-4 flex-1 w-full h-full">
              <div className="flex items-center justify-between mb-2">
                <h1 className="font-bold text-2xl">File 1</h1>
                <p className="text-xs text-muted-foreground">
                  Last update on: 03-02-2025 09:26
                </p>
              </div>
              <span className="text-sm text-muted-foreground flex items-center justify-between gap-2 mb-2">
                <span className="flex items-center gap-2 italic">
                  Folder url:{" "}
                  <span className="underline-offset-2 underline">
                    {" "}
                    https://example.com/knowledge-base/upload/file-1
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Copy className="w-4 h-4 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to copy</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
                <span className="flex items-center gap-3 pe-3">
                  <Button className="cursor-pointer">
                    <Pencil /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer text-red-800 hover:text-red-600 hover:text-lg"
                  >
                    <Trash className="size-5 font-bold" />
                  </Button>
                </span>
              </span>
              <Separator className="my-2 bg-zinc-500" />
              {/* All the available files will be show here  */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between p-2 border rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer border-zinc-600">
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-file-pdf fa-xl text-muted-foreground" />
                    <span className="flex flex-col">
                      <span className="text-sm font-bold">File 1</span>
                      <span className="text-xs text-zinc-500 pt-0.5">
                        PDF | 3MB
                      </span>
                    </span>
                  </span>
                  <span className="flex gap-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer border-none !bg-transparent !hover:bg-transparent !focus:bg-transparent !active:bg-transparent"
                          >
                            <Copy />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy file url</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer !bg-transparent !hover:bg-transparent !focus:bg-transparent !active:bg-transparent  border-zinc-600"
                    >
                      <Download className="text-green-800 hover:text-green-600 hover:text-lg" />
                    </Button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dialog congent  */}
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add knowledge base for agent</DialogTitle>
            <DialogDescription>
              Choose any types of data that best suits for your agent
            </DialogDescription>
          </DialogHeader>
          {/* all the content  */}
          <div>
            <div className="grid w-full max-w-xl items-center gap-1.5 py-4">
              <Label htmlFor="knowledgebase">Name</Label>
              <Input
                id="knowledgebase"
                type="text"
                placeholder="Enter a name for your knowledge base"
                className="mt-1"
              />
            </div>
            {/* All the uploaded files show section  */}
            <div className="">
              <h1 className="mb-2 font-bold">Documents</h1>
              <div className="flex items-center justify-between mb-2 bg-white dark:bg-zinc-800 rounded-md h-[50px] p-3">
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-file-pdf fa-xl text-muted-foreground" />
                  <p className="ms-1">new_doc.pdf</p>
                </span>
                <Trash2 className="text-red-500 cursor-pointer hover:text-red-600 size-5" />
              </div>
            </div>
            <Separator className="my-2 bg-zinc-500" />
            {/* Upload new files section  */}
            <div>
              <Tabs defaultValue="webPage" className="sm:max-w-[550px]">
                <TabsList className="grid w-full grid-cols-3 bg-zinc-700 ">
                  <TabsTrigger value="webPage" className="cursor-pointer">
                    Web Page
                  </TabsTrigger>
                  <TabsTrigger value="uploadFile" className="cursor-pointer">
                    Upload File
                  </TabsTrigger>
                  <TabsTrigger value="addText" className="cursor-pointer">
                    Add Text
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="webPage">
                  <div className="grid w-full max-w-xl items-center gap-1.5 py-4">
                    <Label htmlFor="webPage">Web Page URL</Label>
                    <Input
                      id="webPage"
                      type="text"
                      placeholder="Enter a web page url"
                      className="mt-1"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="uploadFile">
                  <div className="grid w-full max-w-xl items-center gap-1.5 py-4">
                    <Label htmlFor="uploadFile">Upload File</Label>
                    <div className="grid w-full max-w-xl items-center gap-1.5 py-4">
                      <Label
                        htmlFor="uploadFile"
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
                        id="uploadFile"
                        // accept=".json"
                        className="hidden"
                        type="file"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="addText">
                  <div className="grid w-full max-w-xl items-center gap-1.5 py-4">
                    <Label htmlFor="addText">Add File Name</Label>
                    <Input
                      id="addText"
                      type="text"
                      placeholder="Enter a file name"
                      className="mt-1"
                    />
                    <Textarea
                      placeholder="Enter a text"
                      className="mt-1 min-h-[200px]"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button className="cursor-pointer" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KnowledgeBase;
