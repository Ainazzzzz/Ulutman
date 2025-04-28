import { useDropzone } from 'react-dropzone'
import { Box, Typography, IconButton, TextField, styled } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PDFIcon from '../../../assets/icons/arrows.svg?react'

const UploadReceipt = ({ setFileName, fileName, setReceiptFiles }) => {
   const { t } = useTranslation()

   const onDrop = acceptedFiles => {
      setReceiptFiles('paymentReceiptFile', acceptedFiles)
      if (acceptedFiles && acceptedFiles.length > 0) {
         setFileName(acceptedFiles[0]?.name || 'нет')
      }
   }

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      multiple: false,
      accept: {
         'image/*': ['.jpeg', '.jpg', '.png'],
         'application/pdf': ['.pdf'],
      },
   })

   return (
      <Box display="flex" flexDirection="column" gap={1}>
         <Label variant="subtitle1">
            {t('user.createAds.newCreateAdForm.cheque')}
            <Typography component="span" color="error">
               *
            </Typography>
         </Label>
         <Box
            {...getRootProps()}
            sx={{
               display: 'flex',
               alignItems: 'center',
               border: '1px solid #ccc',
               borderRadius: '8px',
               padding: '0 5px',
               cursor: 'pointer',
            }}
         >
            <input {...getInputProps()} />
            <TextField
               variant="standard"
               value={fileName}
               placeholder={t(
                  'user.createAds.newCreateAdForm.chequePlaceholder',
               )}
               InputProps={{
                  readOnly: true,
                  disableUnderline: true,
               }}
               sx={{ flex: 1 }}
            />
            <IconButton>
               <PDFIcon />
            </IconButton>
         </Box>
      </Box>
   )
}

export default UploadReceipt

const Label = styled(Typography)({
   fontWeight: '600',
})
