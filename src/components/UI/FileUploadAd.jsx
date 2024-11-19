import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '../../../assets/icons/close-icon.svg?react';
import {
   Container,
   Label,
   CameraIcon,
   ErrorMessage,
   ImagePreview,
   StyledDropzone,
   ImageGrid,
   ImageItem,
   MainPhotoTag,
} from './MailingFormStyles.jsx';

export const FileUploadAd = ({ setFieldValue, touched, errors, id }) => {
   const [images, setImages] = useState([]);

   const onDrop = acceptedFiles => {
      const newImages = acceptedFiles.map(file => {
         const reader = new FileReader();
         reader.onloadend = () => {
            setImages(prevImages => [
               ...prevImages,
               { src: reader.result, file, isMain: prevImages.length === 0 },
            ]);
         };
         reader.readAsDataURL(file);
         return file;
      });
      setFieldValue('images', newImages);
   };

   const handleRemoveImage = index => {
      setImages(prevImages => prevImages.filter((_, i) => i !== index));
      setFieldValue(
         'images',
         images.filter((_, i) => i !== index),
      );
   };

   const handleSetMainPhoto = index => {
      setImages(prevImages =>
         prevImages.map((image, i) => ({
            ...image,
            isMain: i === index,
         })),
      );
   };

   const { getRootProps, getInputProps } = useDropzone({
      accept: {
         'image/*': ['.jpeg', '.jpg', '.png'],
      },
      onDrop,
   });

   return (
      <div>
         <Label>Загрузите фото *</Label>
         <StyledDropzone {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} id={id} />
            <Container>
               {images.length > 0 ? (
                  <ImageGrid>
                     {images.map((image, index) => (
                        <ImageItem key={index}>
                           <ImagePreview src={image.src} alt="Uploaded" />
                           {image.isMain && (
                              <MainPhotoTag>Главное фото</MainPhotoTag>
                           )}
                           <CloseIcon
                              className="close"
                              onClick={() => handleRemoveImage(index)}
                           />
                           <button onClick={() => handleSetMainPhoto(index)}>
                              {image.isMain ? 'Главное' : 'Сделать главным'}
                           </button>
                        </ImageItem>
                     ))}
                  </ImageGrid>
               ) : (
                  <div className="block">
                     <CameraIcon />
                     <b>Добавьте фото</b>
                     <p>Для добавления картинки щелкните или перетащите его</p>
                  </div>
               )}
               <div className="container-error">
                  {touched && errors ? (
                     <ErrorMessage className="files">{errors}</ErrorMessage>
                  ) : null}
               </div>
            </Container>
         </StyledDropzone>
      </div>
   );
};
