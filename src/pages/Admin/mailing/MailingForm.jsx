import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import ReusableSelect from '../../../components/UI/Select'
import Input from '../../../components/UI/Input'
import FileUpload from './FileUpload'
import {
   WrapperInputSelect,
   Container,
   StyledButton,
   StyledWriting,
   ErrorMessage,
   DateLabelStyle,
} from './MailingFormStyles'
import { validationSchema } from '../../../utils/constants/validationMailing'
import { postMailing } from '../../../redux/mailing/mailingThunk'
import DatePicker from '../../../components/UI/DatePicker'
import { postFile } from '../../../redux/files/fileThunk'
import Spinner from '../../../components/UI/Spinner'

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
)

export const MailingForm = ({ mailingType, recipients }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { isLoading } = useSelector(state => state.file)

   const formik = useFormik({
      initialValues: {
         mailingType: 'НОВОСТИ',
         recipientsAllValue: 'Все пользователи',

         title: '',
         message: '',
         mailingStatus: 'ОТПРАВЛЕНО',
         image: '',
         promotionStartDate: dayjs(new Date()),
         promotionEndDate: dayjs(new Date()).add(7, 'day'),
         recipientsIds: [],
      },
      validationSchema,
      onSubmit: values => {
         const { promotionStartDate, promotionEndDate, image, ...restValue } =
            values

         dispatch(postFile(image))
            .unwrap()
            .then(res => {
               const startDate = new Date(promotionStartDate)
               const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD')

               const endDate = new Date(promotionEndDate)
               const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD')

               dispatch(
                  postMailing({
                     mailingData: {
                        ...restValue,
                        promotionStartDate: formattedStartDate,
                        promotionEndDate: formattedEndDate,
                        image: res[0],
                     },
                     navigate,
                  }),
               )
            })
      },
   })

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
               disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  multiline
                  rows={5}
                  disabled={isLoading}
               />
               {formik.touched.message && formik.errors.message ? (
                  <ErrorMessage>{formik.errors.message}</ErrorMessage>
               ) : null}
            </Container>
            <Container>
               <DateLabelStyle htmlFor="start-date">
                  Описание рассылки
               </DateLabelStyle>

               <DatePicker
                  value={formik.values.promotionStartDate}
                  onChange={newValue =>
                     formik.setFieldValue('promotionStartDate', newValue)
                  }
                  error={
                     formik.touched.promotionStartDate &&
                     Boolean(formik.errors.promotionStartDate)
                  }
                  helperText={formik.errors.promotionStartDate}
                  disabled={isLoading}
               />
            </Container>

            <Container>
               <DateLabelStyle htmlFor="start-date">
                  Описание рассылки
               </DateLabelStyle>

               <DatePicker
                  value={formik.values.promotionEndDate}
                  onChange={newValue =>
                     formik.setFieldValue('promotionEndDate', newValue)
                  }
                  error={
                     formik.touched.promotionEndDate &&
                     Boolean(formik.errors.promotionEndDate)
                  }
                  helperText={formik.errors.promotionEndDate}
                  disableDate={formik.values.promotionStartDate}
                  disabled={isLoading}
               />
            </Container>
         </WrapperInputSelect>

         <FileUpload
            setFieldValue={formik.setFieldValue}
            touched={formik.touched.image}
            errors={formik.errors.image}
         />

         <StyledButton type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Отправить'}
         </StyledButton>
      </form>
   )
}
