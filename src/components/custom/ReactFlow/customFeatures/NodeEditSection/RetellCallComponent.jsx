import { Button } from "@/components/ui/button";
import { generalPostFunction } from "@/globalFunctions/globalFunction";
import { cn } from "@/lib/utils";
import { PhoneOff, PhoneOutgoing } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";

const retellWebClient = new RetellWebClient();

const RetellCallComponent = ({ agentId, transcript, setTranscript }) => {
  console.log(agentId);

  const [isCalling, setIsCalling] = useState(false);
  //   const [transcript, setTranscript] = useState([]);
  const transcriptRef = useRef([]); // Holds the latest value always

  useEffect(() => {
    // Event listeners
    retellWebClient.on("call_started", () => {
      console.log("✅ Call started");
    });

    retellWebClient.on("call_ended", () => {
      console.log("📞 Call ended");
      setIsCalling(false);
    });

    retellWebClient.on("agent_start_talking", () => {
      console.log("🗣️ Agent started talking");
    });

    retellWebClient.on("agent_stop_talking", () => {
      console.log("🔇 Agent stopped talking");
    });

    retellWebClient.on("audio", (audio) => {
      console.log("🎧 Audio chunk received:", audio);
    });

    retellWebClient.on("update", (update) => {
      if (update.transcript) {
        // console.log("📝 Transcript update", update.transcript )
        // console.log(update.transcript[update.transcript.length - 1]);
        handleTranscript(
          update.transcript[update.transcript.length - 1].role,
          update.transcript[update.transcript.length - 1].content
        );
        // setTranscript((prev) => [...prev, ...update.transcript]);
      }
    });
    retellWebClient.on("metadata", (metadata) => {
      console.log("ℹ️ Metadata received:", metadata);
    });

    retellWebClient.on("error", (error) => {
      console.error("❌ Error:", error);
      retellWebClient.stopCall();
      setIsCalling(false);
    });
    
  }, []);

  const toggleConversation = async () => {
    if (isCalling) {
      retellWebClient.stopCall();
      setIsCalling(false);
    } else {
      try {
        const token = await registerCall(agentId);
        if (token) {
          await retellWebClient.startCall({ accessToken: token });
          setIsCalling(true);
        }
      } catch (err) {
        console.error("Failed to start call:", err);
      }
    }
  };

  const registerCall = async (agentId) => {
    try {
      const response = await generalPostFunction(`/call/create-web-call`, {
        agent_id: agentId,
      });
      if (response.status) {
        return response.data.access_token;
      } else {
        throw new Error("Failed to register call");
      }
    } catch (err) {
      console.error("Call registration failed:", err);
      return null;
    }
  };

  function handleTranscript(role, text) {
    const currentTranscript = transcriptRef.current;

    if (
      currentTranscript.length > 0 &&
      currentTranscript[currentTranscript.length - 1].role === role
    ) {
      const updatedTranscript = [...currentTranscript];
      updatedTranscript[updatedTranscript.length - 1].content = text;
      transcriptRef.current = updatedTranscript;
      setTranscript(updatedTranscript);
    } else {
      const newTranscript = [...currentTranscript, { role, content: text }];
      transcriptRef.current = newTranscript;
      setTranscript(newTranscript);
    }

    //   console.log("✅ handleTranscript", role, text, transcriptRef.current);
  }

  console.log("transcript", transcript);
  return (
      
      <Button
        onClick={toggleConversation}
        variant={"outline"}
        className={cn(isCalling ? "text-red-800 hover:text-red-600 " : "text-green-800 hover:text-green-600 ", "flex items-center justify-center w-full rounded-md cursor-pointer")}
        // disabled={isCalling && transcript.length > 0}
      >
        
        {isCalling ? <><PhoneOff className=""/> Stop</> : <><PhoneOutgoing className=""/> Start</>}
      </Button>
  );
};

export default RetellCallComponent;
