import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomPagination = () => {
   const [page, setPage] = useState(1);
   const totalItems = 78;
   const itemsPerPage = 9;

   const handleChange = (event, value) => {
      setPage(value);
   };

   return (
      <Stack spacing={2}>
         <Pagination
            count={Math.ceil(totalItems / itemsPerPage)}
            page={page}
            onChange={handleChange}
            shape="rounded"
         />
         <div>
            {`${(page - 1) * itemsPerPage + 1}-${Math.min(page * itemsPerPage, totalItems)} из ${totalItems}`}
         </div>
      </Stack>
   );
};

export default CustomPagination;
