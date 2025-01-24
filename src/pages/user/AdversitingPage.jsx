/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import { Button } from '../../components/UI/Button'
import ChevronLeft from '../../assets/icons/chevron-left.svg?react'
import Input from '../../components/UI/Input'
import 'react-toastify/dist/ReactToastify.css'
import InputPay from '../../components/UI/InputPay'
import { addAdvertisingThunks } from '../../redux/advertising/adversstitingpayThunks'
import { Loading } from '../../components/UI/Loading'
import FileUpload from '../Admin/mailing/FileUpload'

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

   const validBanks = ['Сбербанк', 'Т-Банк', 'Альфа-Банк', 'ВТБ', 'Почта Банк']

   const handleImage = (file, type) => {
      if (type === 'imageFile') {
         setImageFile(file)
      } else if (type === 'paymentReceiptFile') {
         setPaymentReceiptFile(file)
      }
   }

   const handleSubmit = async () => {
      setBankError('')
      setReceiptError('')
      setImageError('')

      let isValid = true

      if (!validBanks.includes(bankName)) {
         setBankError(t('user.advertising.advertisingValidation.bankError'))
         isValid = false
      }

      if (!paymentReceiptFile) {
         setReceiptError(
            t('user.advertising.advertisingValidation.receiptFileError'),
         )
         isValid = false
      }

      if (!imageFile) {
         setImageError('Пожалуйста, загрузите фото.')
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
            t,
         }),
      )

      setBankName('')
      setImageFile('')
      setPaymentReceiptFile(null)
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
                  label="Банк"
                  placeholder="Укажите банк, на который перевели деньги"
                  value={bankName}
                  onChange={e => setBankName(e.target.value)}
               />
               {bankError && <p style={{ color: 'red' }}>{bankError}</p>}

               <ContainerBank>
                  <TitleBank>Сбербанк</TitleBank>
                  <NumberBunkStyle>2202 2081 2356 1699</NumberBunkStyle>
                  <TitleBank>Т-Банк</TitleBank>
                  <NumberBunkStyle>2200 7009 8116 9526</NumberBunkStyle>
                  <TitleBank> Альфа-Банк</TitleBank>
                  <NumberBunkStyle>4584 4328 2524 1376</NumberBunkStyle>
                  <TitleBank>ВТБ</TitleBank>
                  <NumberBunkStyle>2200 2480 8913 7201</NumberBunkStyle>
                  <TitleBank>Почта Банк</TitleBank>
                  <NumberBunkStyle>2200770419928124</NumberBunkStyle>
               </ContainerBank>
               <ContainerBank />
               <InputPay
                  label="Загрузите чек оплаты"
                  value={paymentReceiptFile}
                  onDropFiles={files =>
                     handleImage(files[0], 'paymentReceiptFile')
                  }
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
               value={imageFile}
               setFieldValue={(field, value) => {
                  if (field === 'imageFile') {
                     console.log('Загруженный файл:', value)
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
const ContainerAddImageSehond = styled('div')(() => ({
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
