import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '../../../assets/icons/close-icon.svg?react';
import { Box, Typography, IconButton, Button, styled } from '@mui/material';
import { CameraIcon } from './MailingFormStyles';

const FileUpload = ({ setFieldValue, touched, errors, id }) => {
   const [imagePreviews, setImagePreviews] = useState([]);
   const [mainImageIndex, setMainImageIndex] = useState(null);

   const onDrop = acceptedFiles => {
      const newImagePreviews = acceptedFiles.map(file => {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         return new Promise(resolve => {
            reader.onloadend = () => {
               resolve({
                  file,
                  preview: reader.result,
               });
            };
         });
      });

      Promise.all(newImagePreviews).then(images => {
         setImagePreviews(prevImages => [...prevImages, ...images]);
         setFieldValue('images', [...(imagePreviews || []), ...acceptedFiles]);
      });
   };

   const handleRemoveImage = index => {
      const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
      setImagePreviews(updatedPreviews);
      setFieldValue(
         'images',
         updatedPreviews.map(image => image.file),
      );
      if (mainImageIndex === index) {
         setMainImageIndex(null);
      } else if (mainImageIndex > index) {
         setMainImageIndex(mainImageIndex - 1);
      }
   };

   const setAsMainImage = index => {
      setMainImageIndex(index);
   };

   const { getRootProps, getInputProps } = useDropzone({
      accept: {
         'image/*': ['.jpeg', '.jpg', '.png'],
      },
      onDrop,
      multiple: true,
   });

   return (
      <Box>
         <Box>
            <ImageContainer>
               {imagePreviews.map((image, index) => (
                  <ImageWrapper key={index}>
                     <ImagePreview
                        src={image.preview}
                        alt={`Selected Image ${index + 1}`}
                     />
                     <IconButton
                        size="small"
                        sx={{
                           position: 'absolute',
                           top: 8,
                           right: 8,

                           color: 'white',
                        }}
                        onClick={() => handleRemoveImage(index)}
                     >
                        <CloseIcon fontSize="small" />
                     </IconButton>
                     <MainImageButton
                        onClick={() => setAsMainImage(index)}
                        isMain={mainImageIndex === index ? 1 : 0}
                     >
                        {mainImageIndex === index
                           ? 'Главное фото'
                           : 'Сделать главным'}
                     </MainImageButton>
                  </ImageWrapper>
               ))}
               {imagePreviews.length === 6 || (
                  <>
                     <StyledBox
                        textAlign="center"
                        p={2}
                        borderRadius={2}
                        {...getRootProps()}
                     >
                        <input {...getInputProps()} id={id} />
                        <CameraIcon fontSize="large" />
                        <Typography variant="body1">Добавьте фото</Typography>
                        <Typography variant="body2" color="textSecondary">
                           Для добавления картинки щелкните или перетащите его
                        </Typography>
                     </StyledBox>
                     {touched && errors && (
                        <Typography color="error" variant="caption">
                           {errors}
                        </Typography>
                     )}
                  </>
               )}
            </ImageContainer>
         </Box>
      </Box>
   );
};

export default FileUpload;

const StyledBox = styled(Box)({
   background: '#7E52FF1A',
   width: '255px',
   height: '199px',

   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
});

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
}));

const ImageWrapper = styled(Box)({
   width: '255px',
   height: '199px',
   position: 'relative',
   borderRadius: 8,
   overflow: 'hidden',
});

const ImagePreview = styled('img')({
   objectFit: 'cover',
   width: '255px',
   height: '199px',
});

const MainImageButton = styled(Button)(({ theme, isMain }) => ({
   position: 'absolute',
   bottom: theme.spacing(1),
   left: theme.spacing(7),

   padding: theme.spacing(0.5, 1),
   backgroundColor: isMain
      ? theme.palette.primary.main
      : theme.palette.grey[500],
   color: theme.palette.common.white,
   borderRadius: 4,
   fontSize: '0.75rem',
   '&:hover': {
      backgroundColor: isMain
         ? theme.palette.primary.dark
         : theme.palette.grey[700],
   },
}));
