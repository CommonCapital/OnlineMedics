import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { SessionDetail } from '../../medical-agent/[sessionId]/page'
type Props = {
    record: SessionDetail
}
function ViewTranscriptDialog({record}:Props) {
  return (
     <Dialog>
      <DialogTrigger>
        <Button variant={'link'} size={'sm'}>View Transcript</Button> 
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild><h2 className='text-center text-4xl'>Transcript </h2></DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ViewTranscriptDialog