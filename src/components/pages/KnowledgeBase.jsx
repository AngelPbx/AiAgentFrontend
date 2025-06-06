import {
  CloudUpload,
  Copy,
  Download,
  File,
  FolderClosed,
  Info,
  Loader2,
  Pencil,
  Plus,
  Trash,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { requiredValidator } from "../../validation/valication";
import {
  generalDeleteFunction,
  generalGetFunction,
  generalPostFunction,
} from "@/globalFunctions/globalFunction";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const KnowledgeBase = () => {
  const [currentTab, setCurrentTab] = useState("webPage");
  const [addedFiles, setAddedFiles] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      webPageUrl: "",
      uploadFile: "",
      addTextName: "",
      addTextContent: "",
    },
  });

  // initial fetch data
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const res = await generalGetFunction("/knowledgebase/all");
      if (res.status) {
        setInitialData(res?.knowledgeBaseResponses);
        setActiveFile(
          res?.knowledgeBaseResponses?.length > 0
            ? res?.knowledgeBaseResponses[0]
            : null
        );
      }
    } catch (error) {
      console.error("Error fetching initial data: ", error);
    }
  };

  const validateForm = async () => {
    const formValid = await form.trigger();
    if (!formValid) return false;

    const values = form.getValues();

    // Common validation for name
    if (!values.name?.trim()) {
      form.setError("name", { message: "Name is required" });
      return false;
    }

    // Validate based on current tab
    if (currentTab === "webPage") {
      const url = values.webPageUrl?.trim();
      if (!url) {
        form.setError("webPageUrl", { message: "Web page URL is required" });
        return false;
      }

      try {
        new URL(url); // Throws if invalid
      } catch {
        form.setError("webPageUrl", { message: "Please enter a valid URL" });
        return false;
      }
    } else if (currentTab === "uploadFile") {
      if (!values.uploadFile) {
        form.setError("uploadFile", { message: "File is required" });
        return false;
      }
    } else if (currentTab === "addText") {
      if (!values.addTextName?.trim() || !values.addTextContent?.trim()) {
        if (!values.addTextName?.trim()) {
          form.setError("addTextName", { message: "File name is required" });
        }
        if (!values.addTextContent?.trim()) {
          form.setError("addTextContent", { message: "Content is required" });
        }
        return false;
      }
    }

    return true;
  };
  const handleFileAdd = async () => {
    if (!(await validateForm())) return;

    const values = form.getValues();
    let displayName = "";
    let data = null;

    if (currentTab === "webPage") {
      try {
        const url = new URL(values.webPageUrl);
        displayName = url.hostname;
        data = values.webPageUrl;
      } catch (error) {
        displayName = values.webPageUrl;
        data = values.webPageUrl;
        console.error("Invalid URL:", error);
      }
    } else if (currentTab === "uploadFile") {
      displayName = values.uploadFile?.name || "Unnamed File";
      data = values.uploadFile;
    } else {
      displayName = values.addTextName;
      data = { name: values.addTextName, content: values.addTextContent };
    }

    const newFile = {
      id: Date.now(),
      name: values.name,
      displayName,
      type: currentTab,
      date: new Date().toISOString(),
      data,
    };

    setAddedFiles((prev) => [newFile, ...prev]);
    setIsValid(true);

    // Reset form while keeping the name
    const currentName = values.name;
    form.reset();
    form.setValue("name", currentName);
  };

  const handleRemoveFile = (id) => {
    setAddedFiles((prev) => {
      const newFiles = prev.filter((file) => file.id !== id);
      setIsValid(newFiles.length > 0);
      return newFiles;
    });
  };

  const handleSaveChanges = async () => {
    if (!isValid || addedFiles.length === 0) return;

    // toast.loading("Saving files...");
    setLoading(true);
    const name = form.getValues("name").trim();
    const texts = [];
    const urls = [];
    const files = [];

    // Organize added files
    addedFiles.forEach((file) => {
      if (file.type === "webPage") {
        urls.push(file.data);
      } else if (file.type === "uploadFile") {
        if (Array.isArray(file.data)) {
          file.data.forEach((f) => files.push(f)); // support multiple files
        } else {
          files.push(file.data); // single File object
        }
      } else if (file.type === "addText") {
        texts.push({ title: file.data.name, text: file.data.content });
      }
    });

    // Create form data
    const formData = new FormData();
    formData.append("name", name);

    if (urls.length > 0) {
      formData.append("urls", JSON.stringify(urls));
    }

    if (texts.length > 0) {
      formData.append("texts", JSON.stringify(texts));
    }

    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("file", file);
      });
    }

    try {
      const res = await generalPostFunction("/knowledgebase/store", formData);

      if (res.status) {
        toast.success("Knowledge base saved successfully");
        setLoading(false);
        setIsValid(false);
        setAddedFiles([]);
        form.reset();
        fetchInitialData();
      } else {
        toast.error("Failed to save knowledge base");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error saving knowledge base:", error);
      toast.error("Failed to save knowledge base");
      setLoading(false);
    }
  };

  const handleDeleteKnowledgeBase = async () => {
    if (!activeFile) {
      toast.error("No knowledge base selected for deletion");
      return;
    }

    setLoading(true);
    try {
      const res = await generalDeleteFunction(
        `/knowledgebase/delete/${activeFile?.knowledge_base_id}`
      );

      if (res.status) {
        toast.success("Knowledge base deleted successfully");
        setLoading(false);
        setShowDeleteDialog(false);
        setActiveFile(null);
        fetchInitialData(); // Refresh the list after deletion
      } else {
        toast.error("Failed to delete knowledge base");
        setLoading(false);
        setShowDeleteDialog(false);
      }
    } catch (error) {
      console.error("Error deleting knowledge base: ", error);
      toast.error("Failed to delete knowledge base");
      setLoading(false);
      setShowDeleteDialog(false);
    }
  };

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
              <Separator className="my-2 bg-zinc-500" />{" "}
              <div className="flex flex-col gap-2">
                {" "}
                {initialData &&
                  initialData.map((file) => (
                    <div
                      key={file.knowledge_base_id}
                      className={cn(
                        "flex items-center justify-between p-2 border rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer"
                      )}
                      onClick={() => {
                        setActiveFile(file);
                      }}
                      style={
                        activeFile?.knowledge_base_id ===
                        file?.knowledge_base_id
                          ? { backgroundColor: "#f3f4f6", color: "black" }
                          : {}
                      }
                    >
                      <span className="flex flex-col">
                        <span className="flex items-center gap-2">
                          <FolderClosed className="w-5 h-5 text-muted-foreground" />
                          <span className="font-medium">
                            {file.knowledge_base_name}
                          </span>
                        </span>
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500">
                          Added on{" "}
                          {new Date(
                            file.user_modified_timestamp
                          ).toLocaleDateString()}
                        </span>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            {/* Show all the uploaded files and edit panels */}
            <div className="bg-white dark:bg-zinc-800 rounded-md shadow-md p-4 flex-1 w-full h-full">
              <div className="flex items-center justify-between mb-2">
                <h1 className="font-bold text-2xl">
                  {activeFile?.knowledge_base_name}
                </h1>
                <p className="text-xs text-muted-foreground">
                  Last update on:{" "}
                  {new Date(
                    activeFile?.user_modified_timestamp
                  ).toLocaleDateString()}
                </p>
              </div>
              <span className="text-sm text-muted-foreground flex items-center justify-between gap-2 mb-2">
                <span className="flex items-center gap-2 italic">
                  ID:{" "}
                  <span className="underline-offset-2 underline">
                    {activeFile?.knowledge_base_id}
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        asChild
                        onClick={() => {
                          navigator.clipboard.writeText(
                            activeFile?.knowledge_base_id || ""
                          );
                        }}
                      >
                        <Copy className="w-4 h-4 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to copy</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
                <span className="flex items-center gap-3 pe-3">
                  {/* <Button className="cursor-pointer">
                    <Pencil /> Edit
                  </Button> */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer text-red-800 hover:text-red-600 hover:text-lg"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash className="size-5 font-bold" />
                  </Button>
                </span>
              </span>
              <Separator className="my-2 bg-zinc-500" />
              {/* All the available files will be show here  */}
              {activeFile &&
                activeFile?.knowledge_base_sources?.map((data) => (
                  <div className="flex flex-col gap-2" key={data?.source_id}>
                    <div className="flex items-center justify-between p-2 border rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer border-zinc-600">
                      <span className="flex items-center gap-2">
                        <i className="fa-solid fa-file-pdf fa-xl text-muted-foreground" />
                        <span className="flex flex-col">
                          <span className="text-sm font-bold">
                            {(data?.type === "text" && data.title) ||
                              (data?.type === "url" &&
                                new URL(data?.url).hostname) ||
                              (data?.type === "document" && data?.filename)}
                          </span>
                          <span className="text-xs text-zinc-500 pt-0.5">
                            {data?.type.toUpperCase()} | 3MB
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
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    data?.type === "text" && data?.content_url
                                  ) ||
                                    (data?.type === "url" && data?.url) ||
                                    (data?.type === "document" &&
                                      data?.file_url);
                                }}
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
                          onClick={() => {
                            const url =
                              data?.type === "text"
                                ? data?.content_url
                                : data?.type === "url"
                                ? data?.url
                                : data?.file_url;
                            if (url) {
                              window.open(url, "_blank");
                            } else {
                              toast.error("No URL available for this file");
                            }
                          }}
                        >
                          <Download className="text-green-800 hover:text-green-600 hover:text-lg" />
                        </Button>
                      </span>
                    </div>
                  </div>
                ))}
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFileAdd)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                rules={requiredValidator}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter a name for your knowledge base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <Tabs
                defaultValue="webPage"
                className="sm:max-w-[550px]"
                onValueChange={setCurrentTab}
              >
                <TabsList className="grid w-full grid-cols-3 bg-zinc-700">
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

                {/* Added Files List */}
                {addedFiles.length > 0 && (
                  <div className="mt-4 border rounded-lg p-3 space-y-2 max-h-[200px] overflow-y-auto">
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">
                      Added Files
                    </h3>
                    {addedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-2 border rounded-md bg-muted/30"
                      >
                        <span className="flex flex-col">
                          <span className="flex items-center gap-2">
                            <File className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              {/* {file.name} */}
                              {file.displayName}
                            </span>
                          </span>
                          {/* <span className="text-xs text-muted-foreground ml-6">
                            {file.displayName}
                          </span> */}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFile(file.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-transparent cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <TabsContent value="webPage">
                  <FormField
                    control={form.control}
                    name="webPageUrl"
                    rules={requiredValidator}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Web Page URL</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter a web page url"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="uploadFile">
                  {" "}
                  <FormField
                    control={form.control}
                    name="uploadFile"
                    rules={requiredValidator}
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Upload File</FormLabel>
                        <FormControl>
                          <div className="grid w-full max-w-xl items-center gap-1.5 py-4">
                            <Label
                              htmlFor="file-upload"
                              className="group relative flex cursor-pointer flex-col justify-center rounded-lg border-2 border-dashed transition-colors dark:border-white/20 dark:hover:bg-black/20 border-stroke-soft-200 hover:border-primary hover:bg-bg-weak-50 h-[150px] items-center"
                            >
                              <CloudUpload />
                              <p className="mb-1 text-sm text-gray-900 dark:text-white">
                                Choose a file or drag & drop it here
                              </p>
                              <p className="text-xs text-text-sub-600 dark:text-white/70">
                                Only Defined Agent format files are supported
                              </p>
                              {value?.name && (
                                <p className="mt-2 text-sm text-blue-600">
                                  Selected: {value.name}
                                </p>
                              )}
                            </Label>
                            <Input
                              id="file-upload"
                              type="file"
                              className="hidden"
                              accept=".pdf,.docx,.txt,.md"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  onChange(file);
                                }
                              }}
                              // Remove the spread of field to prevent the value being set on the input
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="addText">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="addTextName"
                      rules={requiredValidator}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>File Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter a file name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="addTextContent"
                      rules={requiredValidator}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Enter text"
                              className="min-h-[300px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
              </Tabs>{" "}
              <div className="flex justify-between items-center gap-4 mt-4">
                <div>
                  <Button type="submit" className="cursor-pointer">
                    <Plus className="mr-2" />
                    Add File
                  </Button>
                </div>
                <div className="flex gap-2">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      type="button"
                      className="cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={handleSaveChanges}
                    disabled={!isValid || addedFiles.length === 0 || loading}
                    className="cursor-pointer"
                    type="button"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" />
                        Submitting...{" "}
                      </>
                    ) : (
                      <>
                        {/* <Book className="mr-2" /> */}
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Separate Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Info className="w-6 h-6 text-red-700 mr-2" />
              Delete Knowledge Base
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this knowledge base? This action
              cannot be reversed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="mr-2 cursor-pointer"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="cursor-pointer"
              onClick={handleDeleteKnowledgeBase}
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin mr-2" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KnowledgeBase;
