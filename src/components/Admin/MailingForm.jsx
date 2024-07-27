import React, { useState } from 'react';
import { useFormik } from 'formik';
import ReusableSelect from '../UI/Select';
import Input from '../UI/Input';
import FileUpload from './FileUpload';
import {
   WrapperInputSelect,
   Container,
   StyledButton,
   StyledWriting,
   ErrorMessage,
} from './MailingFormStyles';
import { validationSchema } from '../../utils/constants/validationMailing';

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

            <Container>
               <ReusableSelect
                  value={formik.values.typeMailing}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.typeMailing?.toString()}
                  errors={formik.errors.typeMailing}
                  label="Тип рассылки"
                  options={mailingType}
               />
               {formik.touched.typeMailing &&
               Boolean(formik.errors.typeMailing) ? (
                  <ErrorMessage>{formik.errors.typeMailing}</ErrorMessage>
               ) : null}
            </Container>

            <Container>
               <ReusableSelect
                  value={formik.values.recipientsAllValue}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.recipientsAllValue?.toString()}
                  errors={formik.errors.recipientsAllValue}
                  label="Получатели"
                  options={recipients}
               />
               {formik.touched.recipientsAllValue &&
               Boolean(formik.errors.recipientsAllValue) ? (
                  <ErrorMessage>
                     {formik.errors.recipientsAllValue}
                  </ErrorMessage>
               ) : null}
            </Container>

            <Container>
               <label htmlFor="writing">Описание рассылки</label>
               <StyledWriting
                  name="writing"
                  id="writing"
                  value={formik.values.writing}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Горячие акции: Скидка 20% на премиум-размещение: Разместите ваше объявление в топе и привлеките больше внимания! Предложение действует до [Дата]."
                  error={
                     formik.touched.writing && Boolean(formik.errors.writing)
                  }
               />
               {formik.touched.writing && formik.errors.writing ? (
                  <ErrorMessage>{formik.errors.writing}</ErrorMessage>
               ) : null}
            </Container>
         </WrapperInputSelect>

         <FileUpload
            setFieldValue={formik.setFieldValue}
            touched={formik.touched.files}
            errors={formik.errors.files}
         />

         <StyledButton type="submit">Отправить</StyledButton>
      </form>
   );
};
