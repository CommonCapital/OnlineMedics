import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SessionDetail } from '../../medical-agent/[sessionId]/page'
import { Button } from '@/components/ui/button'
import moment  from  "moment"
import { ViewBuilderCore } from 'drizzle-orm/mysql-core'
import ViewReportDialog from './ViewReportDialog'
import ViewTranscriptDialog from './ViewTranscriptDialog'
export type Props={
   historyList: SessionDetail[]
}
function HistoryTable({historyList}:Props) {
  return (
    <Table>
  <TableCaption>Previous Consultation Reports</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[300px]">AI medical specialist</TableHead>
      <TableHead className="w-[200px]">Description</TableHead>
      <TableHead>Date</TableHead>
      <TableHead className="text-right">Data Report</TableHead>
        <TableHead className="text-right">Transcript</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {historyList.map((record:SessionDetail, index:number)=>(
          <TableRow>
        
      <TableCell className="font-medium">{record?.selectedDoctor?.specialist}</TableCell>
      <TableCell>{record?.notes}</TableCell>
      <TableCell>{ moment(new Date(record?.createdOn)).fromNow()}</TableCell>
      <TableCell className="text-right"> <ViewReportDialog record={record}/> </TableCell>
        <TableCell className="text-right"> <ViewTranscriptDialog record={record}/> </TableCell>
    </TableRow>   
        ))}
   
  </TableBody>
</Table>
  )
}

export default HistoryTable