import { styled } from '@mui/material'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Button } from '../UI/Button'
import Input from '../UI/Input'
import { profileValidation } from '../../utils/general/validation/profileValidation'
import { updateUserProfile } from '../../redux/users/profileThunk'
import { useTranslation } from 'react-i18next'

export const Profile = () => {
   const dispatch = useDispatch()
   const { userData } = useSelector(state => state.auth)
   const { t } = useTranslation()

   const [isEdit, setIsEdit] = useState(false)

   const formik = useFormik({
      initialValues: {
         username: userData.name || '',
         emailAddress: userData.email || '',
      },
      validationSchema: profileValidation(t),
      onSubmit: profileData => {
         dispatch(
            updateUserProfile({
               profileData,
               userId: userData.userId,
               setIsEdit,
               t,
            }),
         )
      },
   })

   const toggleIsEdit = () => setIsEdit(prev => !prev)

   return (
      <Form onSubmit={formik.handleSubmit}>
         <Container>
            <StyledInput
               label={t('user.profile.name')}
               placeholder={t('user.profile.namePlaceholder')}
               name="username"
               value={formik.values.username}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               autoComplete="given-name"
               disabled={!isEdit}
            />

            {formik.touched.username && formik.errors.username ? (
               <ErrorMessage>{formik.errors.username}</ErrorMessage>
            ) : null}
         </Container>

         <Container>
            <EmailInput
               label={t('user.profile.email')}
               type="email"
               placeholder={t('user.profile.emailPlaceholder')}
               name="emailAddress"
               value={formik.values.emailAddress}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               autoComplete="email"
               disabled={!isEdit}
            />

            {formik.touched.emailAddress && formik.errors.emailAddress ? (
               <ErrorMessage>{formik.errors.emailAddress}</ErrorMessage>
            ) : null}
         </Container>

         {isEdit ? (
            <BtnContainer>
               <StyledButton onClick={toggleIsEdit} variant="outlined">
                  {t('user.profile.cancelBtn')}
               </StyledButton>
               <StyledButton type="submit">
                  {t('user.profile.saveBtn')}
               </StyledButton>
            </BtnContainer>
         ) : (
            <StyledButton onClick={toggleIsEdit}>
               {t('user.profile.editBtn')}
            </StyledButton>
         )}
      </Form>
   )
}

const Form = styled('form')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   height: '57vh',
   maxWidth: '678px',
}))

const StyledInput = styled(Input)(({ theme }) => ({
   width: '100%',
   [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '463px',
   },
}))

const EmailInput = styled(Input)(({ theme }) => ({
   [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '463px',
   },
}))

const StyledButton = styled(Button)(({ theme }) => ({
   width: '144px',
   marginTop: '16px',

   [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '463px',
   },
}))

const ErrorMessage = styled('div')(() => ({
   color: 'red',
   fontSize: '12px',
   position: 'absolute',
   bottom: '-15px',
   left: '5px',
}))

const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   position: 'relative',
}))

const BtnContainer = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
   justifyContent: 'flex-end',
}))
