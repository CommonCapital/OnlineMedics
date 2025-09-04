
import { AIDoctorAgents } from "@/app/shared/list";
import { GemmaModel } from "@/config/GemmaModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {notes} = await req.json();
    try {
        const completion = await GemmaModel.chat.completions.create({
    model: "google/gemma-3-27b-it:free",
   messages: [
    {role: "system", content:JSON.stringify(AIDoctorAgents)},
{role: "user", content: "User Notes/Symptoms:"+notes+"Depends on user notes and symptoms, you should provide list of doctors that are available (no more than 3). Return Object in JSON only with specialist, description, image, agentPrompt, and voiceId."}
   ],
  
        });
         console.log(completion.choices[0].message)
        const rawResponse=completion.choices[0].message || '';
        //@ts-ignore
        const response =rawResponse.content.trim().replace('```json','').replace('```','')
       const JSONresponse=JSON.parse(response)
       console.log(JSONresponse)
        return NextResponse.json(JSONresponse);
    } catch (error) {
      return NextResponse.json(error);  
    }
}