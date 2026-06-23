import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import ReusableSelect from '../../../components/UI/Select'
import Input from '../../../components/UI/Input'
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
         title: '',
         message: '',
         mailingType: 'НОВОСТИ',
         mailingStatus: 'ОТПРАВЛЕНО',
         promotionStartDate: dayjs(new Date()),
         promotionEndDate: dayjs(new Date()).add(7, 'day'),
         recipientIds: [],
         recipientsAllValue: 'Все пользователи',
      },
      validationSchema,
      onSubmit: values => {
         const formattedStartDate = values.promotionStartDate
            ? values.promotionStartDate.format('YYYY-MM-DD')
            : dayjs().format('YYYY-MM-DD')

         const formattedEndDate = values.promotionEndDate
            ? values.promotionEndDate.format('YYYY-MM-DD')
            : dayjs().format('YYYY-MM-DD')

         const backendData = {
            title: values.title,
            message: values.message,
            mailingType: values.mailingType,
            mailingStatus: values.mailingStatus,
            promotionStartDate: formattedStartDate,
            promotionEndDate: formattedEndDate,
            createDate: dayjs().format('YYYY-MM-DD'),
            recipientIds: [],
         }

         dispatch(
            postMailing({
               mailingData: backendData,
               navigate,
            }),
         )
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
            <h3>Получатели:</h3>
            <h4 style={{ marginBottom: '20px' }}>
               все пользователи платформы, которые подписаны на рассылку
            </h4>
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
                  Дата начала рассылки
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
                  Дата окончания рассылки
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

         <StyledButton type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Отправить'}
         </StyledButton>
      </form>
   )
}
