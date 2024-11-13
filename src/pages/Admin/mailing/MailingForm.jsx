import { useFormik } from 'formik';
import ReusableSelect from '../../../components/UI/Select.jsx';
import Input from '../../../components/UI/Input.jsx';
import FileUpload from './FileUpload.jsx';
import {
   WrapperInputSelect,
   Container,
   StyledButton,
   StyledWriting,
   ErrorMessage,
} from './MailingFormStyles.jsx';
import { validationSchema } from '../../../utils/constants/validationMailing.js';
import { useDispatch } from 'react-redux';
import { postMailing } from '../../../redux/mailing/mailingThunk.js';
import { useNavigate } from 'react-router-dom';

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
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const formik = useFormik({
      initialValues: {
         title: '',
         mailingType: 'Новости',
         message: '',
         recipientsAllValue: 'Все пользователи',
         files: null,
      },
      validationSchema: validationSchema,
      onSubmit: values => {
         const mailingData = {
            title: values.title,
            mailingType: values.mailingType,
            message: values.message,
            // files: values.files,
            image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
            promotionStartDate: '2024-08-02',
            promotionEndDate: '2025-08-02',
         };

         dispatch(postMailing({ mailingData, navigate }));
      },
   });

   return (
      <form onSubmit={formik.handleSubmit}>
         <WrapperInputSelect>
            <InputContainer
               name="title"
               value={formik.values.title}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               touched={formik.touched.title}
               errors={formik.errors.title}
               placeholder="Новости платформы"
               label="Название рассылки"
            />

            <Container>
               <ReusableSelect
                  name="mailingType"
                  value={formik.values.mailingType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.mailingType?.toString()}
                  error={formik.errors.mailingType}
                  label="Тип рассылки"
                  options={mailingType}
               />
               {formik.touched.mailingType &&
               Boolean(formik.errors.mailingType) ? (
                  <ErrorMessage>{formik.errors.mailingType}</ErrorMessage>
               ) : null}
            </Container>

            <Container>
               <ReusableSelect
                  name="recipientsAllValue"
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
               <label htmlFor="message">Описание рассылки</label>
               <StyledWriting
                  name="message"
                  id="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Горячие акции: Скидка 20% на премиум-размещение: Разместите ваше объявление в топе и привлеките больше внимания! Предложение действует до [Дата]."
                  error={
                     formik.touched.message && Boolean(formik.errors.message)
                  }
               />
               {formik.touched.message && formik.errors.message ? (
                  <ErrorMessage>{formik.errors.message}</ErrorMessage>
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
