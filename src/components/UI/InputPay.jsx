import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { styled } from '@mui/material'
import PDF from '../../assets/icons/pdf.svg?react'

const InputPay = ({
   accept = 'image/*',
   multiple = false,
   maxSize = 1048576,
   onDropFiles,
   value = null,
}) => {
   const [files, setFiles] = useState([])
   const { getRootProps, getInputProps } = useDropzone({
      accept,
      multiple,
      maxSize,
      onDrop: acceptedFiles => {
         setFiles(acceptedFiles)
         if (onDropFiles) {
            onDropFiles(acceptedFiles)
         }
      },
   })
   useEffect(() => {
      if (!value) {
         setFiles([])
      }
   }, [value])

   return (
      <PdFcontainer {...getRootProps()}>
         <p>Загрузите чек</p>
         <input {...getInputProps()} type="file" />
         <ContainerPdf>
            <PDF />
         </ContainerPdf>

         {files.length > 0 && (
            <ul>
               {files.map(file => (
                  <li key={file.path}>
                     {file.path} - {(file.size / 1024).toFixed(2)} KB
                  </li>
               ))}
            </ul>
         )}
      </PdFcontainer>
   )
}

export default InputPay
const PdFcontainer = styled('div')(() => ({
   width: '365px',
   height: '44px',
   padding: '10px 0px 0px 0px',
   display: 'flex',
   justifyContent: 'flex-end',
   border: '1px solid #cfcfcf',
   borderRadius: '10px',

   '&:hover': {
      border: '1px solid #282828',
   },
}))

const ContainerPdf = styled('div')(() => ({
   display: 'flex',
   gap: '100px',
   padding: '0 20px 0 20px',
   color: 'gray',
}))
