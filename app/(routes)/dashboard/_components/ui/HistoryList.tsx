"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AddNewSessionDialog from './AddNewSessionDialog'
import axios from 'axios'
import HistoryTable from './HistoryTable'
import { SessionDetail } from '../../medical-agent/[sessionId]/page'

function HistoryList() {
    const [historyList, setHistoryList] = useState<SessionDetail[]>([]);

    useEffect(() => {
     GetHistoryList();
    },[])
    const GetHistoryList = async () => {
    const result = await axios.get(`/api/session-chat?sessionId=all`);
    console.log(result.data);
    setHistoryList(result.data) ; 
    }
  return (
    <div className='mt-10'>
{historyList.length == 0?
<div className='flex items-center flex-col justify-center p-5 border-dashed rounded-2xl border-2 gap-2'>
    <Image src={"/medical-chat.png"} alt="medical-chat" width={200} height={200}/>
    <h2 className='font-bold text-xl mt-2'>No Recent Consultations:</h2>
    <p>You haven't had any recent consultations, yet.</p>
  <AddNewSessionDialog />
</div> 
 : <div>
    <HistoryTable historyList={historyList}/>
    </div>
}
    </div>
  )
}

export default HistoryList