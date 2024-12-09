import React, { useEffect, useState } from 'react'
import { Box, IconButton, styled, Typography } from '@mui/material'
import Arrow from '../../assets/icons/slider-arrow.svg?react'

const Pagination = ({ page, setPage, rowsPerPage, totalItems }) => {
   const [prevBtnDisabled, setPrevBtnDisabled] = useState(page === 1)
   const [nextBtnDisabled, setNextBtnDisabled] = useState(
      page === Math.ceil(totalItems / rowsPerPage),
   )

   const nextPage = () => {
      if (page < Math.ceil(totalItems / rowsPerPage)) {
         setPage(prevState => prevState + 1)
      }
   }

   const prevPage = () => {
      if (page > 1) {
         setPage(prevState => prevState - 1)
      }
   }

   useEffect(() => {
      setPrevBtnDisabled(page === 1)
      setNextBtnDisabled(page === Math.ceil(totalItems / rowsPerPage))
   }, [page, totalItems, rowsPerPage])

   return (
      <StyledStack>
         <StyledPagination>
            {`${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, totalItems)} из ${totalItems}`}
         </StyledPagination>
         <Box>
            <PrevArrow onClick={prevPage} disabled={prevBtnDisabled}>
               <Arrow />
            </PrevArrow>
            <NextArrow onClick={nextPage} disabled={nextBtnDisabled}>
               <Arrow />
            </NextArrow>
         </Box>
      </StyledStack>
   )
}

export default Pagination

const StyledStack = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
}))

const StyledPagination = styled(Typography)(() => ({
   color: '#282828',
   width: '120px',
}))

const PrevArrow = styled(IconButton)(({ disabled }) => ({
   padding: '9px 17px',
   border: '1px solid',
   borderRight: 'none',
   borderRadius: '10px 0 0 10px',
   backgroundColor: '#fff',
   cursor: disabled ? 'not-allowed' : 'pointer',
   opacity: disabled ? 0.5 : 1,
}))

const NextArrow = styled(IconButton)(({ disabled }) => ({
   transform: 'rotate(180deg)',
   padding: '9px 17px',
   border: '1px solid',
   borderRadius: '10px 0 0 10px',
   backgroundColor: '#fff',
   cursor: disabled ? 'not-allowed' : 'pointer',
   opacity: disabled ? 0.5 : 1,
}))
