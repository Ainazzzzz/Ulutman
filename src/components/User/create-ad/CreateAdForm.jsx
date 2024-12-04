import { styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../UI/Input'
import CategoryField from './CategoryField'
import ReusableSelect from '../../UI/Select'
import FileUpload from './FileUpload'
import { Button } from '../../UI/Button'
import { PublishesCategoryModal } from './PublishesCategoryModal'
import DetailInfoModal from './DetailInfoModal'
import UploadReceipt from './UploadReceipt'
import { fetchPublishesUser } from '../../../redux/publishes/publishesThunk'
import { getAllMetros } from '../../../redux/main/mainThunk'

const citiesOfMoscow = [
   { value: 'Арбат', label: 'Арбат' },
   { value: 'Басманный', label: 'Басманный' },
   { value: 'Замоскворечье', label: 'Замоскворечье' },
   { value: 'Таганский', label: 'Таганский' },
   { value: 'Пресненский', label: 'Пресненский' },
   { value: 'Хамовники', label: 'Хамовники' },
   { value: 'Тверской', label: 'Тверской' },
   { value: 'Якиманка', label: 'Якиманка' },
   { value: 'Красносельский', label: 'Красносельский' },
   { value: 'Мещанский', label: 'Мещанский' },
   { value: 'Сокольники', label: 'Сокольники' },
   { value: 'Беговой', label: 'Беговой' },
   { value: 'Аэропорт', label: 'Аэропорт' },
   { value: 'Лефортово', label: 'Лефортово' },
   { value: 'МарьинаРоща', label: 'Марьина Роща' },
   { value: 'Щукино', label: 'Щукино' },
]

const banks = [
   { value: 'Сбербанк', label: 'Сбербанк' },
   { value: 'ТБанк', label: 'ТБанк' },
   { value: 'ВТБ', label: 'ВТБ' },
   { value: 'АльфаБанк', label: 'Альфа-Банк' },
   { value: 'Газпромбанк', label: 'Газпромбанк' },
   { value: 'Райффайзенбанк', label: 'Райффайзенбанк' },
   { value: 'Росбанк', label: 'Росбанк' },
   { value: 'ПочтаБанк', label: 'Почта Банк' },
   { value: 'ХоумКредитБанк', label: 'Хоум Кредит Банк' },
   { value: 'Открытие', label: 'Открытие' },
   { value: 'Совкомбанк', label: 'Совкомбанк' },
   { value: 'ЮниКредитБанк', label: 'ЮниКредит Банк' },
   { value: 'Уралсиб', label: 'Уралсиб' },
   { value: 'АкБарсБанк', label: 'Ак Барс Банк' },
   { value: 'МТС Банк', label: 'МТС Банк' },
]

export const validationAdForm = Yup.object({
   name: Yup.string().required('Имя обязательно'),
   phoneNumber: Yup.string()
      .required('Телефон обязателен')
      .matches(/^\+7\d{10}$/, 'Некорректный формат телефона'),
   category: Yup.string().required('Категория обязательна'),
   images: Yup.mixed().required('Загрузите фото'),
   description: Yup.string().required('Описание обязательно'),
   city: Yup.string().required('Город обязателен'),
   address: Yup.string().required('Адрес обязателен'),
   metro: Yup.string().required('Метро обязательно'),
   price: Yup.number()
      .required('Цена обязательна')
      .typeError('Цена должна быть числом'),
   bank: Yup.string().required('Банк обязателен'),
   paymentReceiptFile: Yup.mixed().required('Чек обязателен'),
   propertyDetails: Yup.object().optional(),
})

export const CreateAdForm = () => {
   const dispatch = useDispatch()
   const { metros } = useSelector(state => state.main)
   const { userData } = useSelector(state => state.auth)

   const [categoryModal, setCategoryModal] = useState(false)
   const [detailInfoModal, setDetailInfoModal] = useState(false)
   const [selectCategory, setSelectCategory] = useState({})
   const [fileName, setFileName] = useState('')

   const {
      handleChange,
      touched,
      errors,
      handleSubmit,
      values,
      setFieldValue,
   } = useFormik({
      initialValues: {
         name: '',
         phoneNumber: '',
         category: '',
         subcategory: '',
         images: [],
         description: '',
         city: '',
         metro: '',
         address: '',
         price: '',
         bank: '',
         paymentReceiptFile: [],

         propertyDetails: {},
      },

      validationSchema: validationAdForm,

      onSubmit: values => {
         dispatch(
            fetchPublishesUser({
               publishe: { userId: userData.userId, ...values },
            }),
         )
      },
   })

   const onCategoryClick = category => setSelectCategory(category)
   const onSubCategoryClick = subCategory =>
      setFieldValue('subcategory', subCategory)

   const toggleCategoryModal = () => setCategoryModal(prev => !prev)
   const toggleDetailInfoModal = () => setDetailInfoModal(prev => !prev)

   useEffect(() => {
      dispatch(getAllMetros())
   }, [])

   return (
      <>
         <Form onSubmit={handleSubmit}>
            <Input
               placeholder="Иван"
               label="Имя"
               name="name"
               value={values.name}
               onChange={handleChange}
               error={!!errors.name}
               helperText={errors.name}
               required
            />
            <Input
               placeholder="+7 xxx xxxxxxx"
               label="Телефон"
               name="phoneNumber"
               value={values.phoneNumber}
               onChange={handleChange}
               error={!!errors.phoneNumber}
               helperText={errors.phoneNumber}
               required
            />

            <CategoryField
               selectCategory={selectCategory}
               subCategory={values.subcategory}
               handleOpenCategoryModal={toggleCategoryModal}
               touched={touched.category}
               error={!!errors.category}
            />

            <PublishesCategoryModal
               onCategoryClick={onCategoryClick}
               open={categoryModal}
               onClose={toggleCategoryModal}
               onSubCategoryClick={onSubCategoryClick}
               setFieldValue={setFieldValue}
            />

            <FileUpload
               imageFiles={values.images}
               setImageFiles={setFieldValue}
               touched={touched.images}
               error={!!errors.images}
            />

            <DetailInfo type="button" onClick={toggleDetailInfoModal}>
               Детальная информация
            </DetailInfo>

            <Input
               placeholder="Продаю iPhone 12 с объемом памяти 128GB в черном цвете. Телефон в отличном состоянии, использовался бережно и всегда носился в чехле с защитным стеклом на экране."
               label="Описание"
               name="description"
               value={values.description}
               onChange={handleChange}
               multiline
               rows="4"
               helperText={errors.description}
               error={!!errors.description}
               required
            />

            <ReusableSelect
               placeholder="Выберите город"
               label="Город"
               name="city"
               value={values.city}
               onChange={handleChange}
               options={citiesOfMoscow}
               error={!!errors.city}
               helperText={errors.city}
            />
            <ReusableSelect
               placeholder="Выберите метро"
               label="Метро"
               name="metro"
               value={values.metro}
               onChange={handleChange}
               options={metros}
               error={!!errors.metro}
               helperText={errors.metro}
            />

            <Input
               placeholder="Улица Крылова дом 1"
               label="Адрес"
               name="address"
               value={values.address}
               onChange={handleChange}
               error={!!errors.address}
               helperText={errors.address}
               required
            />
            <Input
               placeholder="Договорная"
               label="Цена"
               name="price"
               value={values.price}
               onChange={handleChange}
               error={!!errors.price}
               helperText={errors.price}
               required
            />

            <ReusableSelect
               placeholder="нет"
               label="Выберите банк"
               name="bank"
               value={values.bank}
               onChange={handleChange}
               options={banks}
               error={!!errors.bank}
               helperText={errors.bank}
            />
            {/* <Input
               placeholder="нет"
               label="Прикрепите чек"
               name="paymentReceiptFile"
               value={values.paymentReceiptFile}
               onChange={handleChange}
               error={!!errors.paymentReceiptFile}
               helperText={errors.paymentReceiptFile}
               required
            /> */}

            <UploadReceipt
               setFileName={setFileName}
               fileName={fileName}
               setReceiptFiles={setFieldValue}
            />

            <Button type="submit">Создать</Button>
         </Form>
         <DetailInfoModal
            open={detailInfoModal}
            onClose={toggleDetailInfoModal}
         />
      </>
   )
}

const Form = styled('form')({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   maxWidth: '700px',
   minWidth: '300px',
   width: '100%',
})

const DetailInfo = styled('button')(() => ({
   backgroundColor: '#A495FE',
   border: '1px solid #7E52FF',
   width: '200px',
   fontWeight: 500,
   fontSize: '14px',
   color: '#fff',
   borderRadius: '2px',
   padding: '3px',
   cursor: 'pointer',
   transition: '250ms',

   '&:hover': {
      backgroundColor: '#8D7BFF',
      border: '1px solid #7E52FF',
   },
}))
