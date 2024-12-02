import React, { useState } from 'react'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import FileUpload from '../Admin/mailing/FileUpload'
import { Button } from '../../components/UI/Button'
import { styled } from '@mui/material'
import ChevronLeft from '../../assets/icons/chevron-left-violet-icon.svg?react'
import Input from '../../components/UI/Input'
import 'react-toastify/dist/ReactToastify.css'

import InputPay from '../../components/UI/InputPay'

import { useDispatch } from 'react-redux'
import { addAdvertisingThunks } from '../../redux/advertising/adversstitingpayThunks'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../components/UI/Loading'
import { useTranslation } from 'react-i18next'

const AdversitingPage = () => {
   const [bankName, setBankName] = useState('')
   const { t } = useTranslation()
   const [bankError, setBankError] = useState('')
   const [imageError, setImageError] = useState('')
   const [receiptError, setReceiptError] = useState('')
   const [imageFile, setImageFile] = useState('')
   const [paymentReceiptFile, setPaymentReceiptFile] = useState(null)
   const [isLoading, setIsLoading] = useState(false)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const path = [
      { title: t('user.advertising.breadcrumbs.main'), url: '/user' },
      {
         title: t('user.advertising.breadcrumbs.currentPage'),
         url: '/advertising_page',
      },
   ]

   const handleGoBack = () => {
      navigate('/')
   }

   const validBanks = ['Сбербанк', 'Тбанк', 'Альфа-банк', 'ВТБ', 'Почта банк']

   const handleImage = (file, type) => {
      if (type === 'image') {
         setImageFile(file)
      } else if (type === 'receipt') {
         setPaymentReceiptFile(file)
      }
   }

   const handleSubmit = async () => {
      setBankError('')
      setImageError('')
      setReceiptError('')

      let isValid = true

      if (!validBanks.includes(bankName)) {
         setBankError('Пожалуйста, выберите допустимый банк.')
         isValid = false
      }

      if (!imageFile) {
         setImageError('Пожалуйста, загрузите изображение.')
         isValid = false
      } else {
         const validSizes = [
            { width: 285, height: 407 },
            { width: 564, height: 246 },
         ]

         const image = new Image()
         const imageFileUrl = URL.createObjectURL(imageFile)

         image.onload = () => {
            const isValidSize = validSizes.some(
               size =>
                  image.width === size.width && image.height === size.height,
            )

            if (!isValidSize) {
               setImageError(
                  'Изображение должно быть размером 285x407 или 564x246.',
               )
               isValid = false
            } else {
               setImageError('')
            }

            URL.revokeObjectURL(imageFileUrl)
         }

         image.src = imageFileUrl

         if (!isValid) return
      }

      if (!paymentReceiptFile) {
         setReceiptError('Пожалуйста, загрузите чек.')
         isValid = false
      }

      if (!isValid) {
         return
      }

      setIsLoading(true)
      dispatch(
         addAdvertisingThunks({
            bank: bankName,
            imageFile,
            paymentReceiptFile,
            setIsLoading,
         }),
      )

      setBankName('')
      setImageFile('')
      setPaymentReceiptFile('')
   }

   return (
      <WrapperContainer>
         {isLoading && <Loading />}
         <FirstBlock>
            <Breadcrumbs path={path} />
            <span onClick={handleGoBack}>
               <ChevronLeft /> {t('user.advertising.back')}
            </span>
         </FirstBlock>
         <Titile>{t('user.advertising.title')}</Titile>
         <InfoBank>
            <div>
               <ParagrahStyle>
                  {t('user.advertising.descriptions.title1')}
               </ParagrahStyle>
               <ParagrahStyle>
                  {t('user.advertising.descriptions.title2')}
               </ParagrahStyle>
               <ParagrahStyle>
                  {t('user.advertising.descriptions.title3')}
               </ParagrahStyle>
               <ParagrahStyle>
                  {t('user.advertising.descriptions.title4')}
               </ParagrahStyle>
            </div>
         </InfoBank>
         <BoxInputStyle>
            <ContainerAddImageSehond>
               <Input
                  name="bank"
                  label="Банк *"
                  placeholder="Укажите банк, на который перевели деньги"
                  value={bankName}
                  onChange={e => setBankName(e.target.value)}
               />
               {bankError && <p style={{ color: 'red' }}>{bankError}</p>}

               <ContainerBank>
                  <TitleBank>Сбербанк</TitleBank>
                  <NumberBunkStyle>2202 2081 2356 1699</NumberBunkStyle>
                  <TitleBank>Тбанк</TitleBank>
                  <NumberBunkStyle>2200 7009 8116 9526</NumberBunkStyle>
                  <TitleBank> Альфа-банк</TitleBank>
                  <NumberBunkStyle>4584 4328 2524 1376</NumberBunkStyle>
                  <TitleBank>ВТБ</TitleBank>
                  <NumberBunkStyle>2200 2480 8913 7201</NumberBunkStyle>
                  <TitleBank>Почта банк</TitleBank>
                  <NumberBunkStyle>2200770419928124</NumberBunkStyle>
               </ContainerBank>
               <ContainerBank></ContainerBank>
               <InputPay
                  label="Загрузите чек оплаты"
                  onDropFiles={files => handleImage(files[0], 'receipt')}
               />
               {receiptError && <p style={{ color: 'red' }}>{receiptError}</p>}
            </ContainerAddImageSehond>
         </BoxInputStyle>

         <ContainerAddImage>
            <BoxSyleTitle>
               <PragrafTitile>
                  {t('user.advertising.uploadPhotoLabel')}
               </PragrafTitile>
            </BoxSyleTitle>
            <FileUpload
               setFieldValue={(field, value) => {
                  if (field === 'imageFile') {
                     setImageFile(value)
                  }
               }}
            />
            {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
         </ContainerAddImage>

         <Button onClick={handleSubmit}>
            {t('user.advertising.advertisiingBtn')}
         </Button>
      </WrapperContainer>
   )
}

export default AdversitingPage
const WrapperContainer = styled('div')(({ theme }) => ({
   padding: '60px',
   [theme.breakpoints.down('sm')]: {
      padding: '30px',
   },
}))
const ParagrahStyle = styled('p')(({ theme }) => ({
   fontSize: '12px',
   fontWeight: '600',
   lineHeight: '17.94px',
   color: ' #000000A3',
   [theme.breakpoints.down('sm')]: {
      fontSize: '10px',
      lineHeight: '15px',
   },
}))
const Titile = styled('h1')(({ theme }) => ({
   fontSize: '34px',
   fontWeight: '600',
   padding: '24px 0 24px  0px',
   [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
   },
}))

const ContainerAddImage = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
   paddingBottom: '40px',
   [theme.breakpoints.down('sm')]: {
      paddingBottom: '20px',
   },
}))
const ContainerAddImageSehond = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
   padding: '24px 0px 0px 0',
   '.css-evt46c-MuiFormControl-root-MuiTextField-root .MuiInputBase-root': {
      width: '365px',
   },
}))
const PragrafTitile = styled('p')(() => ({
   fontSize: '18px',
   fontWeight: '600',
   lineHeight: '21.78px',
}))
const BoxSyleTitle = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   paddingTop: '24px',
}))
const FirstBlock = styled('div')(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   span: {
      fontSize: '14px',
      color: '#7252ff',
      fontWeight: '400',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      cursor: 'pointer',
   },
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
   },
}))
const InfoBank = styled('div')(() => ({
   display: 'flex',
}))
const ContainerBank = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',

   '.css-evt46c-MuiFormControl-root-MuiTextField-root .MuiInputBase-root': {
      width: '365px',
   },
}))
const BoxInputStyle = styled('div')(() => ({
   display: 'flex',

   flexDirection: 'column',
   '.css-wxfmmo-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root': {
      width: '365px',
   },
}))
const TitleBank = styled('div')(() => ({
   color: '#282828',
   fontWeight: '600',
}))
const NumberBunkStyle = styled('div')(() => ({
   width: '365px',
   height: '44px',
   border: '1px solid #cfcfcf',
   borderRadius: '10px',
   display: 'flex',
   alignItems: 'center',
   paddingLeft: '20px',
   color: ' #000000A3',
}))
