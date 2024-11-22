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
} from './MailingFormStyles.jsx';

const FileUpload = ({ setFieldValue, touched, errors, id }) => {
   const [imagePreview, setImagePreview] = useState(null);

   const onDrop = acceptedFiles => {
      const file = acceptedFiles[0];
      setFieldValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
         setImagePreview(reader.result);
      };
      if (file) {
         reader.readAsDataURL(file);
      } else {
         setImagePreview(null);
      }
   };

   const handleRemoveImage = () => {
      setImagePreview(null);
      setFieldValue('image', null);
   };

   const { getRootProps, getInputProps } = useDropzone({
      accept: {
         'image/*': ['.jpeg', '.jpg', '.png'],
         'application/pdf': ['.pdf'],
         'text/*': ['.txt'],
      },
      onDrop,
   });

   return (
      <StyledDropzone {...getRootProps({ className: 'dropzone' })}>
         <input {...getInputProps()} id={id} />
         <Label>
            {imagePreview && (
               <CloseIcon className="close" onClick={handleRemoveImage} />
            )}

            <Container>
               {imagePreview ? (
                  <div
                     style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}
                  >
                     <ImagePreview src={imagePreview} alt="Selected Image" />
                  </div>
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
         </Label>
      </StyledDropzone>
   );
};

export default FileUpload;
