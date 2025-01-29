import React from 'react'

import { useDropzone } from 'react-dropzone'
import { Box, Typography, IconButton, styled } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CloseIcon from '../../../assets/icons/close-icon.svg?react'
import { CameraIcon } from '../../../pages/Admin/mailing/MailingFormStyles'

const FileUpload = ({ setImageFiles, imageFiles, errors }) => {
   const { t } = useTranslation()
   const onDrop = acceptedFiles => {
      const validFiles = acceptedFiles.filter(file =>
         ['image/jpeg', 'image/png', 'image/gif'].includes(file.type),
      )

      const updatedFiles = [...imageFiles, ...validFiles]
      setImageFiles('images', updatedFiles)
   }

   const handleRemoveImage = index => {
      const updatedFiles = imageFiles.filter((_, i) => i !== index)

      setImageFiles('images', updatedFiles)
   }

   const { getRootProps, getInputProps } = useDropzone({
      accept: {
         'image/jpeg': [],
         'image/png': [],
         'image/gif': [],
      },
      onDrop,
      multiple: true,
   })

   return (
      <Box>
         <ImageContainer>
            {imageFiles?.map((file, i) => (
               <ImageWrapper key={crypto.randomUUID()}>
                  <ImagePreview
                     src={URL.createObjectURL(file)}
                     alt="Upload file"
                  />
                  <IconButton
                     size="small"
                     sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'white',
                     }}
                     onClick={() => handleRemoveImage(i)}
                  >
                     <CloseIcon fontSize="small" />
                  </IconButton>
                  {file === 0 && (
                     <MainPhotoButton>
                        {t(
                           'user.createAds.newCreateAdFrom.uploadPhoto.uploadImage',
                        )}
                     </MainPhotoButton>
                  )}
               </ImageWrapper>
            ))}
            {imageFiles?.length < 6 && (
               <StyledBox
                  textAlign="center"
                  p={2}
                  borderRadius={2}
                  {...getRootProps()}
               >
                  <input {...getInputProps()} />
                  <CameraIcon fontSize="large" />
                  <Typography variant="body1">
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
            {errors && (
               <Typography color="error" variant="caption">
                  {errors}
               </Typography>
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
   objectFit: 'contain',
   width: '100%',
   height: '100%',
   borderRadius: '10px',
   border: '1px solid #00000027',
})

const MainPhotoButton = styled(Box)({
   width: '106px',
   height: '29px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   position: 'absolute',
   bottom: '18px',
   left: '50%',
   transform: 'translateX(-50%)',
   backgroundColor: '#7E52FF',
   color: '#FFFFFF',
   padding: '2px 6px',
   borderRadius: 4,
   fontSize: '0.75rem',
   fontWeight: '400',
})
