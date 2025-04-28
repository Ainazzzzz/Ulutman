import { styled, Typography } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Input from '../../UI/Input'
import CategoryField from './CategoryField'
import ReusableSelect from '../../UI/Select'
import FileUpload from './FileUpload'
import { Button } from '../../UI/Button'
import { PublishesCategoryModal } from './PublishesCategoryModal'
import DetailInfoModal from './DetailInfoModal'
import { fetchPublishesUser } from '../../../redux/publishes/publishesThunk'
import { getAllMetros } from '../../../redux/main/mainThunk'
import UploadReceipt from './UploadReceipt'

export const CreateAdForm = () => {
   const { t } = useTranslation()

   const banks = useMemo(
      () => [
         { value: t('user.createAds.bank.sber'), label: 'Сбербанк' },
         { value: t('user.createAds.bank.t'), label: 'ТБанк' },
         { value: t('user.createAds.bank.btb'), label: 'ВТБ' },
         { value: t('user.createAds.bank.alfa'), label: 'Альфа-Банк' },
         { value: t('user.createAds.bank.pochta'), label: 'Почта Банк' },
      ],
      [],
   )

   const validationAdForm = useMemo(
      () =>
         Yup.object({
            title: Yup.string().required(
               t('user.createAds.validationForm.title'),
            ),
            phoneNumber: Yup.string()
               .required(t('user.createAds.validationForm.phoneNumberRequired'))
               .matches(
                  /^\+7\d{10}$/,
                  t('user.createAds.validationForm.phoneNumberMatches'),
               ),
            category: Yup.string().required(
               t('user.createAds.validationForm.category'),
            ),
            images: Yup.array()
               .min(1, t('user.createAds.validationForm.imagesMin'))
               .required(t('user.createAds.validationForm.imagesRequired')),
            description: Yup.string().required(
               t('user.createAds.validationForm.description'),
            ),
            address: Yup.string().required(
               t('user.createAds.validationForm.adress'),
            ),
            metro: Yup.string().required(
               t('user.createAds.validationForm.metro'),
            ),
            price: Yup.number()
               .required(t('user.createAds.validationForm.priceRequired'))
               .typeError(t('user.createAds.validationForm.priceTypeError')),
            bank: Yup.string().when('category', (category, schema) => {
               if (
                  category?.includes('REAL_ESTATE') ||
                  category?.includes('HOTEL') ||
                  category?.includes('RENT')
               ) {
                  return schema.required(
                     t('user.createAds.validationForm.bank'),
                  )
               }
               return schema.notRequired()
            }),
            paymentReceiptFile: Yup.array().when(
               'category',
               (category, schema) => {
                  if (
                     category?.includes('REAL_ESTATE') ||
                     category?.includes('HOTEL') ||
                     category?.includes('RENT')
                  ) {
                     return schema
                        .min(
                           1,
                           t(
                              'user.createAds.validationForm.paymentReceiptFileMin',
                           ),
                        )
                        .required(
                           t(
                              'user.createAds.validationForm.paymentReceiptFileRequired',
                           ),
                        )
                  }
                  return schema.notRequired()
               },
            ),
            propertyDetails: Yup.object().optional(),
         }),
      [],
   )

   const dispatch = useDispatch()
   const { metros } = useSelector(state => state.main)
   const { userData } = useSelector(state => state.auth)
   const navigate = useNavigate()

   const [categoryModal, setCategoryModal] = useState(false)
   const [detailInfoModal, setDetailInfoModal] = useState(false)
   const [selectCategory, setSelectCategory] = useState({})
   const [fileName, setFileName] = useState('')

   const { handleChange, errors, handleSubmit, values, setFieldValue } =
      useFormik({
         initialValues: {
            title: '',
            phoneNumber: '',
            category: '',
            subcategory: '',
            images: [],
            description: '',
            metro: '',
            address: '',
            price: '',
            bank: '',
            paymentReceiptFile: [],
         },
         validationSchema: validationAdForm,
         validateOnChange: true,
         onSubmit: values => {
            dispatch(
               fetchPublishesUser({
                  publishe: { userId: userData.userId, ...values },
                  navigate,
                  t,
               }),
            )
         },
      })

   const onCategoryClick = useCallback(
      category => setSelectCategory(category),
      [],
   )
   const onSubCategoryClick = useCallback(
      subCategory => setFieldValue('subcategory', subCategory),
      [],
   )
   const toggleCategoryModal = useCallback(
      () => setCategoryModal(prev => !prev),
      [],
   )
   const toggleDetailInfoModal = useCallback(
      () => setDetailInfoModal(prev => !prev),
      [],
   )
   useEffect(() => {
      dispatch(getAllMetros())
   }, [])

   return (
      <>
         <Form onSubmit={handleSubmit}>
            <Input
               placeholder={t(
                  'user.createAds.newCreateAdForm.titlePlaceholder',
               )}
               label={t('user.createAds.newCreateAdForm.title')}
               name="title"
               value={values.title}
               onChange={handleChange}
               error={!!errors.title}
               helperText={errors.title}
               required
            />
            <Input
               placeholder={t(
                  'user.createAds.newCreateAdForm.phonePlaceholder',
               )}
               label={t('user.createAds.newCreateAdForm.phone')}
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
               error={!!errors.category}
            />

            <PublishesCategoryModal
               onCategoryClick={onCategoryClick}
               open={categoryModal}
               onClose={toggleCategoryModal}
               onSubCategoryClick={onSubCategoryClick}
               setFieldValue={setFieldValue}
            />

            <div>
               <FileUpload
                  imageFiles={values.images}
                  setImageFiles={setFieldValue}
                  error={errors.images}
               />
               {errors.images && (
                  <ErrorText color="error" variant="caption">
                     {errors.images}
                  </ErrorText>
               )}
            </div>

            <Input
               placeholder={t(
                  'user.createAds.newCreateAdForm.descriptionPlaceholder',
               )}
               label={t('user.createAds.newCreateAdForm.description')}
               name="description"
               value={values.description}
               onChange={handleChange}
               multiline
               rows="4"
               helperText={errors.description}
               error={!!errors.description}
               required
            />

            {/* <ReusableSelect
               placeholder={t('user.createAds.newCreateAdForm.cityPlaceholder')}
               label={t('user.createAds.newCreateAdForm.city')}
               name="city"
               value={values.city}
               onChange={handleChange}
               options={citiesOfMoscow}
               error={!!errors.city}
               helperText={errors.city}
            /> */}
            <ReusableSelect
               placeholder={t(
                  'user.createAds.newCreateAdForm.metroPlaceholder',
               )}
               label={t('user.createAds.newCreateAdForm.metro')}
               name="metro"
               value={values.metro}
               onChange={handleChange}
               options={metros}
               error={!!errors.metro}
               helperText={errors.metro}
            />

            <Input
               placeholder={t(
                  'user.createAds.newCreateAdForm.adressPlaceholder',
               )}
               label={t('user.createAds.newCreateAdForm.adress')}
               name="address"
               value={values.address}
               onChange={handleChange}
               error={!!errors.address}
               helperText={errors.address}
               required
            />
            <Input
               placeholder={t(
                  'user.createAds.newCreateAdForm.pricePlaceholder',
               )}
               label={t('user.createAds.newCreateAdForm.price')}
               name="price"
               value={values.price}
               onChange={handleChange}
               error={!!errors.price}
               helperText={errors.price}
               required
            />

            {values.category === 'REAL_ESTATE' ||
            values.category === 'HOTEL' ||
            values.category === 'RENT' ? (
               <>
                  <ReusableSelect
                     placeholder={t(
                        'user.createAds.newCreateAdForm.bankPlaceholder',
                     )}
                     label={t('user.createAds.newCreateAdForm.bank')}
                     name="bank"
                     value={values.bank}
                     onChange={handleChange}
                     options={banks}
                     error={!!errors.bank}
                     helperText={errors.bank}
                  />
                  <div>
                     <UploadReceipt
                        setFileName={setFileName}
                        fileName={fileName}
                        setReceiptFiles={setFieldValue}
                     />
                     {errors.paymentReceiptFile && (
                        <ErrorText color="error" variant="caption">
                           {errors.paymentReceiptFile}
                        </ErrorText>
                     )}
                  </div>
               </>
            ) : null}

            <Button type="submit">
               {t('user.createAds.newCreateAdForm.adButton')}
            </Button>
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

const ErrorText = styled(Typography)(() => ({
   color: '#f00',
   margin: 0,
   fontSize: '16px',
}))
