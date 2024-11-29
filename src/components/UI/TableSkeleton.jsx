/* eslint-disable react/no-array-index-key */
import React from 'react'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Skeleton,
} from '@mui/material'

const TableSkeleton = ({ rows = 5, columns = 1 }) => {
   return (
      <Table>
         <TableHead>
            <TableRow>
               {Array.from(new Array(columns)).map((_, index) => (
                  <TableCell key={index}>
                     <Skeleton variant="text" />
                  </TableCell>
               ))}
            </TableRow>
         </TableHead>
         <TableBody>
            {Array.from(new Array(rows)).map((_, rowIndex) => (
               <TableRow key={rowIndex}>
                  {Array.from(new Array(columns)).map((_, colIndex) => (
                     <TableCell key={colIndex}>
                        <Skeleton variant="rectangular" height={30} />
                     </TableCell>
                  ))}
               </TableRow>
            ))}
         </TableBody>
      </Table>
   )
}

export default TableSkeleton
