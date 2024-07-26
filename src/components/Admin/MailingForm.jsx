import React, { useState } from 'react';
import { useFormik } from 'formik';
import ReusableSelect from '../UI/Select';
import Input from '../UI/Input';
import CloseIcon from '../../assets/icons/close-icon.svg?react';

import { validationSchema } from '../../utils/constants/validationMailing';
import {
   WrapperInputSelect,
   InputFile,
   CameraIcon,
   Container,
   Label,
   StyledButton,
   StyledWriting,
   ErrorMessage,
   DownloadTitle,
   ImagePreview,
} from './MailingFormStyles';

export const MailingForm = ({ mailingType, recipients }) => {
   const formik = useFormik({
      initialValues: {
         mailings: '',
         typeMailing: 'Новости',
         writing: '',
         recipientsAllValue: 'Все пользователи',
         files: null,
      },
      validationSchema: validationSchema,
      onSubmit: values => {
         console.log(values);
      },
   });

   return (
      <form onSubmit={formik.handleSubmit}>
         <WrapperInputSelect>
            <InputContainer
               name="mailings"
               value={formik.values.mailings}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               touched={formik.touched.mailings}
               errors={formik.errors.mailings}
               placeholder="Новости платформы"
               label="Название рассылки"
            />

            <SelectContainer
               name="typeMailing"
               value={formik.values.typeMailing}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               touched={formik.touched.typeMailing}
               errors={formik.errors.typeMailing}
               label="Тип рассылки"
               options={mailingType}
            />

            <SelectContainer
               name="recipientsAllValue"
               value={formik.values.recipientsAllValue}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               touched={formik.touched.recipientsAllValue}
               errors={formik.errors.recipientsAllValue}
               label="Получатели"
               options={recipients}
            />

            <TextAreaContainer
               name="writing"
               value={formik.values.writing}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               touched={formik.touched.writing}
               errors={formik.errors.writing}
               placeholder="Горячие акции: Скидка 20% на премиум-размещение: Разместите ваше объявление в топе и привлеките больше внимания! Предложение действует до [Дата]."
               label="Описание рассылки"
            />
         </WrapperInputSelect>

         <DownloadTitle>Загрузите фото</DownloadTitle>

         <FileUpload
            setFieldValue={formik.setFieldValue}
            touched={formik.touched.files}
            errors={formik.errors.files}
         />

         <StyledButton type="submit">Отправить</StyledButton>
      </form>
   );
};

const InputContainer = ({
   name,
   value,
   onChange,
   onBlur,
   touched,
   errors,
   placeholder,
   label,
}) => (
   <Container>
      <Input
         name={name}
         value={value}
         onChange={onChange}
         onBlur={onBlur}
         placeholder={placeholder}
         label={label}
         error={touched && Boolean(errors)}
      />
      {touched && errors ? <ErrorMessage>{errors}</ErrorMessage> : null}
   </Container>
);

const SelectContainer = ({
   name,
   value,
   onChange,
   onBlur,
   touched,
   errors,
   label,
   options,
}) => (
   <Container>
      <ReusableSelect
         name={name}
         value={value}
         label={label}
         options={options}
         onChange={onChange}
         onBlur={onBlur}
         error={touched && Boolean(errors)}
      />
      {touched && errors ? <ErrorMessage>{errors}</ErrorMessage> : null}
   </Container>
);

const TextAreaContainer = ({
   name,
   value,
   onChange,
   onBlur,
   touched,
   errors,
   placeholder,
   label,
}) => (
   <Container>
      <label htmlFor={name}>{label}</label>
      <StyledWriting
         name={name}
         id={name}
         value={value}
         onChange={onChange}
         onBlur={onBlur}
         placeholder={placeholder}
         error={touched && Boolean(errors)}
      />
      {touched && errors ? <ErrorMessage>{errors}</ErrorMessage> : null}
   </Container>
);

const FileUpload = ({ setFieldValue, touched, errors }) => {
   const [imagePreview, setImagePreview] = useState(null);

   const handleImageChange = event => {
      const file = event.currentTarget.files[0];
      setFieldValue('files', file);
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
      setFieldValue('files', null);
   };

   return (
      <Label htmlFor="raised-button-file">
         <Container>
            <InputFile
               accept="image/*"
               id="raised-button-file"
               multiple
               type="file"
               name="files"
               onChange={handleImageChange}
               onBlur={setFieldValue.handleBlur}
            />
            <div className="container-error">
               {touched && errors ? (
                  <ErrorMessage className="files">{errors}</ErrorMessage>
               ) : null}
            </div>
         </Container>
         {imagePreview ? (
            <div style={{ position: 'relative' }}>
               <ImagePreview src={imagePreview} alt="Selected Image" />
               <CloseIcon
                  className="close"
                  onClick={handleRemoveImage}
                  style={{
                     position: 'absolute',
                     top: '-12px',
                     right: '-28px',
                     cursor: 'pointer',
                  }}
               />
            </div>
         ) : (
            <>
               <p>Для добавления картинки щелкните или перетащите его</p>
               <b>Добавьте фото</b>
               <CameraIcon />
            </>
         )}
      </Label>
   );
};
