import React from 'react'
import AppHeader from './_components/ui/AppHeader'
import HistoryList from './_components/ui/HistoryList'
import { Button } from '@/components/ui/button'
import DoctorsAgentList from './_components/ui/DoctorsAgentList'
import AddNewSessionDialog from './_components/ui/AddNewSessionDialog'

function Dashboard() {
  return (
    <div>
        
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text-2xl'>
                My Dashboard
              
            </h2>
            <AddNewSessionDialog />
        </div>
        <HistoryList />

        <DoctorsAgentList />
        </div>
  )
}

export default Dashboard