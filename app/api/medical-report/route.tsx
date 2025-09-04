import { db } from "@/config/db";
import { GemmaModel } from "@/config/GemmaModel";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
 const REPORT_GENERATION_PROMPT=`You are an Al Medical Voice Agent that just finished a voice conversation with a user. Based on the AI Doctor Agent Info and Conversation Info, generate a structured report with the following fields:
1. sessionid: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician Al")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user.  If there are more than one, provide a list in the order of column (e.g., • headache, • fever, • cough, and etc...), and separate them with a comma and metion the name of each symptom.
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe
10. medicationsMentioned: list of any medicines mentioned. If there are more than one, provide a list in the order of column (e.g., • morphine, • paracetamol, • ibuprofen, and etc...), and separate them with a comma and metion the name of each medication.
11. recommendations: list of Al suggestions (e.g., rest, see a doctor).  If there are more than one, provide a list in the order of column (e.g., • rest, • see a doctor, and etc...), and separate them with a comma and metion the name of each recommendation.
Return the result in this JSON format:
{
"sessionid": "string",
"agent": "string",
"user": "string",
"timestamp": "ISO Date string",
"chiefComplaint": "string",
"summary": "string",
"symptoms": "string",
"duration": "string",
"severity": "string",
"medicationsMentioned": "string",
"recommendations": "string",
}
Only include valid fields. Respond with nothing else.`;
export async function POST(req: NextRequest) {
    const {sessionId, sessionDetail, messages} = await req.json();
    console.log(messages)
    try {
        const UserInput ="AI Doctor Agent Info:"+ JSON.stringify(sessionDetail)+", Conversation Info:"+JSON.stringify(messages);
        console.log(UserInput)
          const completion = await GemmaModel.chat.completions.create({
            model: "google/gemma-3-27b-it:free",
           messages:  [
    { role: "system", content: REPORT_GENERATION_PROMPT },
    { role: "user", content: "Here is the session info:" },
    { role: "user", content: JSON.stringify(sessionDetail, null, 2) },
    { role: "user", content: "Here is the conversation:" },
    { role: "user", content: JSON.stringify(messages, null, 2) },
  ],
          
                });
                 console.log(completion.choices[0].message)
                const rawResponse=completion.choices[0].message || '';
                //@ts-ignore
                const response =rawResponse.content.trim().replace('```json','').replace('```','')
               const JSONresponse=JSON.parse(response);

const result = await db.update(SessionChatTable).set({
    report: JSONresponse,
    conversation: messages, 
    
}).where(eq(SessionChatTable.sessionId, sessionId)).returning()
console.log(result)
               return NextResponse.json(result[0]);
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}