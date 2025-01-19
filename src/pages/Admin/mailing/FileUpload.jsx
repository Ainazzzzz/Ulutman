import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import CloseIcon from '../../../assets/icons/close-icon.svg?react'
import {
   Container,
   Label,
   CameraIcon,
   ErrorMessage,
   ImagePreview,
   StyledDropzone,
} from './MailingFormStyles'
import { uploadToS3Thunks } from '../../../redux/uploadThunks'

const FileUpload = ({ setFieldValue, touched, errors, id, value }) => {
   const [imagePreview, setImagePreview] = useState(null)
   const dispatch = useDispatch()
   const onDrop = acceptedFiles => {
      const file = acceptedFiles[0]

      if (file) {
         setFieldValue('imageFile', file)

         const reader = new FileReader()
         reader.onloadend = () => setImagePreview(reader.result)
         reader.readAsDataURL(file)
         dispatch(uploadToS3Thunks([file]))
      } else {
         setImagePreview(null)
      }
   }

   const handleRemoveImage = () => {
      setImagePreview(null)
      setFieldValue('imageFile', null)
   }

   const { getRootProps, getInputProps } = useDropzone({
      accept: {
         'image/*': ['.jpeg', '.jpg', '.png'],
         'application/pdf': ['.pdf'],
         'text/*': ['.txt'],
      },
      onDrop,
   })
   useEffect(() => {
      if (!value) {
         setImagePreview(null)
      }
   }, [value])

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
   )
}

export default FileUpload
