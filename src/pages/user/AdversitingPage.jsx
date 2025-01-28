/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import { styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import { Button } from '../../components/UI/Button'
import ChevronLeft from '../../assets/icons/chevron-left.svg?react'
import 'react-toastify/dist/ReactToastify.css'
import InputPay from '../../components/UI/InputPay'
import { addAdvertisingThunks } from '../../redux/advertising/adversstitingpayThunks'
import { Loading } from '../../components/UI/Loading'
import FileUpload from '../Admin/mailing/FileUpload'
import ReusableSelect from '../../components/UI/Select'

const optionsBank = [
   { value: 'SBERBANK', label: 'Сбербанк' },
   { value: 'TBANK', label: 'Т-Банк' },
   { value: 'ALPHA_BANK', label: 'Альфа-Банк' },
   { value: 'BTB', label: 'ВТБ' },
   { value: 'POST_BANK', label: 'Почта Банк' },
]

const AdvertisingPage = () => {
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

   const handleGoBack = () => navigate('/user')

   const validBanks = optionsBank.map(option => option.label)

   const handleImage = (file, type) => {
      if (type === 'imageFile') setImageFile(file)
      else if (type === 'paymentReceiptFile') setPaymentReceiptFile(file)
   }

   const handleSubmit = async () => {
      setBankError('')
      setReceiptError('')
      setImageError('')

      let isValid = true

      const selectedBankLabel = optionsBank.find(
         option => option.value === bankName,
      )?.label

      if (!selectedBankLabel || !validBanks.includes(selectedBankLabel)) {
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
         setImageError(t('user.advertising.advertisingValidation.imageError'))
         isValid = false
      }

      if (!isValid) return

      setIsLoading(true)

      try {
         await dispatch(
            addAdvertisingThunks({
               bank: bankName,
               imageFile,
               paymentReceiptFile,
            }),
         )

         setBankName('')
         setImageFile('')
         setPaymentReceiptFile(null)
      } catch (error) {
         console.error('Ошибка при добавлении рекламы:', error)
      } finally {
         setIsLoading(false)
      }
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
               <WrapperSelect>
                  <ReusableSelect
                     value={bankName}
                     placeholder="Укажите банк, на который перевели деньги"
                     options={optionsBank}
                     onChange={e => setBankName(e.target.value)}
                  />
                  {bankError && <p style={{ color: 'red' }}>{bankError}</p>}
               </WrapperSelect>
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
                  if (field === 'imageFile') setImageFile(value)
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

export default AdvertisingPage

const WrapperContainer = styled('div')(({ theme }) => ({
   padding: '30px 60px',
   [theme.breakpoints.down('sm')]: { padding: '30px' },
}))
const ParagrahStyle = styled('p')(({ theme }) => ({
   fontSize: '12px',
   fontWeight: '600',
   lineHeight: '17.94px',
   color: ' #000000A3',
   [theme.breakpoints.down('sm')]: { fontSize: '10px', lineHeight: '15px' },
}))
const Titile = styled('h1')(({ theme }) => ({
   fontSize: '34px',
   fontWeight: '600',
   padding: '24px 0 24px 0px',
   [theme.breakpoints.down('sm')]: { fontSize: '28px' },
}))
const ContainerAddImage = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
   paddingBottom: '40px',
   [theme.breakpoints.down('sm')]: { paddingBottom: '20px' },
}))
const ContainerAddImageSehond = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
   padding: '24px 0px 0px 0',
   '.css-evt46c-MuiFormControl-root-MuiTextField-root .MuiInputBase-root': {
      maxWidth: '400px',
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
const WrapperSelect = styled('div')({ maxWidth: '400px' })
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
const InfoBank = styled('div')(() => ({ display: 'flex' }))
const BoxInputStyle = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   '.css-wxfmmo-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root': {
      width: '365px',
   },
}))
