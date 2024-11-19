import { useDropzone } from 'react-dropzone';
import { Box, Typography, IconButton, TextField, styled } from '@mui/material';
import PDFIcon from '../../assets/icons/arrows.svg?react';

const UploadReceipt = ({ setFileName, fileName }) => {
   const onDrop = acceptedFiles => {
      if (acceptedFiles && acceptedFiles.length > 0) {
         setFileName(acceptedFiles[0]?.name || 'нет');
      }
   };

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      multiple: false,
      accept: {
         'image/*': ['.jpeg', '.jpg', '.png'],
         'application/pdf': ['.pdf'],
      },
   });

   return (
      <Box display="flex" flexDirection="column" gap={1}>
         <Label variant="subtitle1">
            Прикрепите чек{' '}
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
               padding: '8px 16px',
               cursor: 'pointer',
            }}
         >
            <input {...getInputProps()} />
            <TextField
               variant="standard"
               value={fileName}
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
   );
};

export default UploadReceipt;

const Label = styled(Typography)({
   fontWeight: '600',
   fontSize: '18px',
});
