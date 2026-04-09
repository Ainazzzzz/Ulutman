

import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Typography, IconButton, styled } from '@mui/material'
import CloseIcon from '../../../assets/icons/close-icon.svg?react'
import { CameraIcon } from '../../../pages/Admin/mailing/MailingFormStyles'
import { useTranslation } from 'react-i18next'

const FileUpload = ({ imageFiles = [], setImageFiles, errors }) => {
   const { t } = useTranslation()

   const safeFiles = Array.isArray(imageFiles) ? imageFiles : []

   const [previews, setPreviews] = useState([])

   useEffect(() => {
      const urls = safeFiles.map(file => ({
         file,
         url: URL.createObjectURL(file),
      }))

      setPreviews(urls)

      return () => {
         urls.forEach(item => URL.revokeObjectURL(item.url))
      }
   }, [safeFiles])

   const onDrop = acceptedFiles => {
      const validFiles = Array.from(acceptedFiles).filter(file =>
         ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
      )

      const updatedFiles = [...safeFiles, ...validFiles].slice(0, 6)

      setImageFiles(updatedFiles) 
   }

   const handleRemoveImage = index => {
      const updatedFiles = safeFiles.filter((_, i) => i !== index)
      setImageFiles(updatedFiles)
   }

   const { getRootProps, getInputProps } = useDropzone({
      accept: {
         'image/jpeg': [],
         'image/png': [],
         'image/gif': [],
      },
      multiple: true,
      onDrop,
   })

   return (
      <Box>
         <ImageContainer>
            {previews.map((item, i) => (
               <ImageWrapper key={item.url}>
                  <ImagePreview src={item.url} alt="preview" />

                  <IconButton
                     size="small"
                     sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: '#fff',
                        background: '#00000066',
                        '&:hover': { background: '#00000099' },
                     }}
                     onClick={() => handleRemoveImage(i)}
                  >
                     <CloseIcon />
                  </IconButton>

               
               </ImageWrapper>
            ))}

            {safeFiles.length <= 6 && (
               <StyledBox {...getRootProps()}>
                  <input {...getInputProps()} />

                  <CameraIcon fontSize="large" />

                  <Typography>
                     {t(
                        'user.createAds.newCreateAdForm.uploadPhoto.uploadTitle',
                     )}
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                     {t(
                        'user.createAds.newCreateAdForm.uploadPhoto.uploadDescription',
                     )}
                  </Typography>
               </StyledBox>
            )}
         </ImageContainer>
      </Box>
   )
}

export default FileUpload


const StyledBox = styled(Box)({
   background: '#7E52FF1A',
   width: '255px',
   height: '199px',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 8,
   cursor: 'pointer',
})

const ImageContainer = styled(Box)(({ theme }) => ({
   maxWidth: '805px',
   display: 'grid',
   gridTemplateColumns: 'repeat(3, 1fr)',
   gap: '20px',

   [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
   },
   [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(1, 1fr)',
   },
}))

const ImageWrapper = styled(Box)({
   width: '255px',
   height: '199px',
   position: 'relative',
   borderRadius: 8,
   overflow: 'hidden',
})

const ImagePreview = styled('img')({
   objectFit: 'cover',
   width: '100%',
   height: '100%',
})


