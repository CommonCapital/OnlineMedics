"use client"
import { Button } from '@/components/ui/button'
import { IconArrowRight, IconHeadphones } from '@tabler/icons-react'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
export type doctorAgent={
id: number,
specialist: string,
description: string,
image?: string,
agentPrompt: string,
voiceId?: string,
}

type props={
    doctorAgent: doctorAgent
}

function DoctorAgentCard({doctorAgent}: props) {
   const [loading, setLoading] = useState(false);
   const router = useRouter()
  const imageSrc = doctorAgent?.image?.trim()
    ? doctorAgent.image
    : "/doctor1.png" // ✅ put a placeholder in /public
  
  
    const onStartConsultation = async () => {
  setLoading(true)
  try {
    const result = await axios.post('/api/session-chat', {
      notes: "New Query",
      selectedDoctor: doctorAgent,
    });
    console.log(result.data)
    if (result.data?.sessionId) {
      console.log(result.data.sessionId);
      router.push(`/dashboard/medical-agent/${result.data.sessionId}`)
    }
  } catch (error) {
    console.error(error)
  } finally {
    setLoading(false)
  }
}
  
    return (
    <div className=''>
     <Image  src={doctorAgent.image || imageSrc} alt={doctorAgent.specialist} width={200} height={300} className='w-full h-[250px] object-cover rounded-xl'/>
   <h2 className='font-bold'>{doctorAgent.specialist}</h2>
   <p className='line-clamp-2 mt-1 '>{doctorAgent.description}</p>
   <p className='line-clamp-2 mt-1 '>{doctorAgent.agentPrompt}</p>
   <p className='line-clamp-2 mt-1 '>{doctorAgent.voiceId}</p>
    <Button onClick={onStartConsultation} disabled={loading || !doctorAgent} className='w-full mt-2'> <IconHeadphones /> Call a Doctor  {loading ? <Loader2Icon className='animate-spin'/> : <IconArrowRight />}</Button>
    </div>
  )
}

export default DoctorAgentCard