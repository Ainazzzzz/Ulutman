import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Button } from '../components/UI/Button'

const NotFoundPage = () => {
   return (
      <Box
         sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
         }}
      >
         <Typography variant="h1" component="h1" gutterBottom>
            404
         </Typography>
         <Typography variant="h4" component="h2" gutterBottom>
            Oops! Страница не найдена
         </Typography>
         <Typography variant="body1" gutterBottom>
            К сожалению, запрашиваемая страница не существует.
         </Typography>
         <Button component={Link} to="/" sx={{ marginTop: 2 }}>
            Вернуться на главную
         </Button>
      </Box>
   )
}

export default NotFoundPage
