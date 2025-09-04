import OpenAI from "openai";



export const GemmaModel = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
     apiKey: process.env.GEMMA_ROUTER_API_KEY,
     
   
})
console.log(GemmaModel);