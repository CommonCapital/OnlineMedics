import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const menuOptions = [
    {
        id: 1,
        name: "Home",
        path: "/dashboard"
    },
        {
        id: 2,
        name: "History",
        path: "/dashboard/history"
    },
        {
        id: 3,
        name: "Pricing",
        path: "/dashboard/pricing"
    },
        {
        id: 4,
        name: "Profile",
        path: "/dashboard/profile"
    },
]
function AppHeader() {
  return (
    <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40 '>
          <div className="flex items-center gap-3">
               
                  <Image src={"/logo.svg"} alt="logo" width={32} height={32}/>
             
                <h1 className="text-lg font-bold tracking-tight md:text-2xl">OnlineMedics</h1>
              </div>

              <div className='hidden md:flex  gap-12 items-center'>
                {menuOptions.map((option, index)=>(
                   <div
                   key={index}
                   >
                    <Button asChild variant={'link'} className='hover:font-bold cursor-pointer transition-all'>
                    
                    <Link href={option.path}>{option.name}</Link>
                    </Button>
                     
                    </div> 
                ))}
              </div>
              <UserButton />
    </div>
  )
}

export default AppHeader