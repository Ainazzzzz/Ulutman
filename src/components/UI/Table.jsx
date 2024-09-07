import { memo, useMemo, useState } from 'react';
import {
   TableContainer,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
   Table as MuiTable,
   styled,
   Box,
} from '@mui/material';
import { useTable } from 'react-table';
import Pagination from './Pagination';
import FileIcon from '../../assets/icons/file-icon.svg?react';

const Table = ({ column: headers, data }) => {
   const [page, setPage] = useState(1);
   const [rowsPerPage, setRowsPerPage] = useState(9);

   const columns = useMemo(() => headers, [headers]);

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({
         columns,
         data,
      });

      

   if (!data || data.length === 0) {
      return <StyledAbsence>Пусто</StyledAbsence>;
   }

   return (
      <StyledTableContainer>
         <TableCont>
            <MuiTable {...getTableProps()}>
               <TableHead>
                  {headerGroups.map((headerGroup, i) => (
                     <TableRow
                        {...headerGroup.getHeaderGroupProps()}
                        key={headerGroup.headers[i].Header}
                     >
                        {headerGroup.headers.map(column => (
                           <TableCell
                              {...column.getHeaderProps({
                                 style: { ...column.style },
                              })}
                              key={column.id}
                              align="left"
                           >
                              {column.render('Header')}
                           </TableCell>
                        ))}
                     </TableRow>
                  ))}
               </TableHead>

               <TableBody {...getTableBodyProps()}>
                  {rows
                     .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                     .map(row => {
                        prepareRow(row);
                        return (
                           <TableRow
                              {...row.getRowProps()}
                              key={row.id.toString()}
                              index={row.index}
                           >
                              {row.cells.map(cell => {
                                 return (
                                    <TableCell
                                       {...cell.getCellProps({
                                          style: {
                                             ...cell.column.style,
                                             ...cell.column.tdStyle,
                                          },
                                       })}
                                       key={cell.column.id.toString()}
                                       align="left"
                                    >
                                       {cell.column.id === 'file' &&
                                       cell.value ? (
                                          <Box
                                             display="flex"
                                             alignItems="center"
                                          >
                                             <FileIcon
                                                style={{ marginRight: '8px' }}
                                             />
                                             {cell.render('Cell')}
                                          </Box>
                                       ) : (
                                          cell.render('Cell')
                                       )}
                                    </TableCell>
                                 );
                              })}
                           </TableRow>
                        );
                     })}
               </TableBody>
            </MuiTable>
         </TableCont>

         <Pagination
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            totalItems={rows.length}
         />
      </StyledTableContainer>
   );
};

export default memo(Table);

// Остальная часть кода без изменений

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
   borderRadius: '6px',

   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
   alignItems: 'center',
   gap: '100px',

   '& .MuiTableHead-root': {
      borderBottom: '1px solid  rgba(224, 224, 224, 1)',
   },

   '& .MuiTableCell-root': {
      fontWeight: '600',
      border: 'none',
   },

   '& .MuiTableRow-root': {
      borderBottom: '1px solid  rgba(224, 224, 224, 1)',
   },

   '& .MuiTableRow-root:last-of-type': {
      borderBottom: 'none',
   },

   '& .MuiTableCell-head': {
      backgroundColor: 'white',
      fontWeight: '800',
      fontSize: '14px',
      padding: '10px',
   },
}));

const TableCont = styled('div')(() => ({
   height: '520px',
   width: '100%',

   overflowX: 'auto',
}));

const StyledAbsence = styled(Box)(() => ({
   display: 'grid',
   placeItems: 'center',

   '& > img': {
      width: '600px',
      height: '600px',
   },
}));
