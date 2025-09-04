"use client"
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { doctorAgent } from '../../_components/ui/DoctorAgentCard';
import { Circle, Loader2, PhoneCallIcon, PhoneOff } from 'lucide-react';
import Image from 'next/image';
import Vapi from "@vapi-ai/web";
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

 export type SessionDetail={
  id: number,
  notes: string,
  sessionId: string,
  report: report,
  selectedDoctor: doctorAgent,
  createdOn: string,
  
}

type report={
  sessionId: string,
  agent: string,
  user: string,
  timestamp: string,
  chiefComplaint: string,
  summary: string,
  symptoms: string,
  duration: string,
  severity: string,
  medicationsMentioned: string,
  recommendations: string,
};

type messages={
  role: string,
  text: string
}
function MedicalAgent() {

  const {sessionId} = useParams();
const [sessionDetail,setSessionDetail] = useState<SessionDetail>();
console.log(sessionDetail);
const [callStarted, setCallStarted] = useState(false);
const [vapiInstance, setVapiInstance] = useState<any>();
const [currentRole, setCurrentRole] = useState<string|null>()
   const [liveTranscript, setLiveTranscript] = useState<string>();
const [messages, setMessages] = useState<messages[]>([])
   const [pending, setPending] = useState(false)
   const router = useRouter()
   //useState(false)
useEffect(() => {
if (sessionId) {GetSessionDetails()}
  },[sessionId]);

  const GetSessionDetails =  async() => {
  try {
    const result = await axios.get(`/api/session-chat?sessionId=${sessionId}`);
    setSessionDetail(result.data);
    console.log(result.data)
  } catch (error) {
    console.error(error);
  }
};


 const handleCallStart = () => {
  console.log("Call started");
  setCallStarted(true);
  setPending(false);
};

const handleCallEnd = async () => {
  console.log("Call ended");
  setCallStarted(false);
  await endCall();
};

const handleMessage = (message: any) => {
  if (message.type === "transcript") {
    const { role, transcriptType, transcript } = message;
    if (transcriptType === "partial") {
      setLiveTranscript(transcript);
      setCurrentRole(role);
    } else if (transcriptType === "final") {
      setMessages((prev) => [...prev, { role, text: transcript }]);
      setLiveTranscript("");
      setCurrentRole(null);
    }
  }
};


const StartCall =   () => {
   if (sessionDetail && sessionDetail.selectedDoctor && sessionDetail.selectedDoctor.voiceId) {
  

  setPending(true);

  const vapi = new Vapi( process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);
  console.log(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  setVapiInstance(vapi); // keep for later use like endCall()
const assistant = ({
  name: "AI-powered Medical Assistant",
  firstMessage: "Hello, I am your AI-powered medical assistant. What is your reason for a call ?",
  model: {
    provider: "openai",
    model: "gpt-4o",
    temperature: 0.7,
    messages: [{
      role: "system",
      content: sessionDetail?.selectedDoctor?.agentPrompt
    }]
  },
  voice: {
    provider: "11labs",
    voiceId: sessionDetail?.selectedDoctor?.voiceId
  }
});

//@ts-ignore
  vapi.start(assistant);

  console.log(
    assistant,
  );
  vapi.on("call-start", handleCallStart);
  vapi.on("call-end", handleCallEnd);
  vapi.on("message", handleMessage);

  vapi.on("speech-start", () => setCurrentRole("assistant"));
  vapi.on("speech-end", () => setCurrentRole("user"));

  setVapiInstance(vapi); // only after listeners are set
};
}
const endCall = async () => {
 if (!vapiInstance) return;
  setPending(true);

  vapiInstance.stop();

  // Properly remove listeners with the same references
  vapiInstance.off("call-start", handleCallStart);
  vapiInstance.off("call-end", handleCallEnd);
  vapiInstance.off("message", handleMessage);

  setCallStarted(false);
  setVapiInstance(null);

  // Generate report
  try {
    const result = await axios.post("/api/medical-report", {
      messages: messages,
      sessionDetail: sessionDetail,
      sessionId: sessionId,
    });
    console.log("Generated report:", result.data);
    toast.success("Your report is generated successfully!");
    router.push("/dashboard");
  } catch (error) {
    console.error("Report generation failed", error);
    toast.error("Failed to generate report");
  } finally {
    setPending(false);
  }
};





     return (
<div className='p-5 border rounded-3xl bg-secondary'>
  <div>
      <div className='flex justify-between items-center'>
        <h2 className={`p-1 px-2 border rounded-md flex gap-2 items-center ${callStarted ? "text-green-500" : "text-gray-400"}` }><Circle className={`w-4 h-4 rounded-full ${callStarted ? "bg-green-500" : "text-gray-400"}`}/>{callStarted ? 
        "Connected..." : "Not Connected"}</h2>
        <h2 className='font-bold text-xl text-gray-400'>00:00  </h2>
      </div> 
         
      <div className='flex items-center flex-col mt-10'>
       <Image src={sessionDetail?.selectedDoctor?.image ? sessionDetail?.selectedDoctor?.image : ""} alt={sessionDetail?.selectedDoctor?.specialist ? sessionDetail?.selectedDoctor?.specialist : ""} width={120} height={120} className='h-[100px] w-[100px] object-cover rounded-full'/>
     
      <h2 className='mt-2 text-lg'>{sessionDetail?.selectedDoctor.specialist}</h2>
  <p className='text-sm text-gray-400'>Your AI-powered Medical assistant</p>
  <div className='mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-20 lg:px-52 xl:px-72'>
    {messages?.slice(-4).map((message:messages, index)=> (
      <div key={index}>
         <h2 className='text-gray-400 p-2'>{message.role} {message.text}</h2>
      </div>
    ))}
   
       {liveTranscript &&liveTranscript?.length > 0 && <h2 className='text-lg '>{currentRole} : {liveTranscript}</h2>}
     {!callStarted ? (
   
   
    
    <Button className="mt-20" onClick={StartCall} disabled={ pending || !sessionDetail?.selectedDoctor?.voiceId && !sessionDetail?.selectedDoctor?.agentPrompt}>
    { pending ? <Loader2 className='animate-spin'/> : <PhoneCallIcon /> } Start Call  
    </Button>
  
) : (
  <Button variant="destructive" onClick={endCall} disabled={pending}>
   { pending ? <Loader2 className='animate-spin'/> : <PhoneOff />} End Call
  </Button>
)}
  </div>

 
   </div>

    </div>
</div>
  )

}
export default MedicalAgent;