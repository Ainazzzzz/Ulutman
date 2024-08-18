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
                  name="typeMailing"
                  value={formik.values.typeMailing}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.typeMailing?.toString()}
                  error={formik.errors.typeMailing}
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
