import { styled } from '@mui/material'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Button } from '../UI/Button'
import Input from '../UI/Input'
import { profileValidation } from '../../utils/general/validation/profileValidation'
import { updateUserProfile } from '../../redux/users/profileThunk'

export const Profile = () => {
   const dispatch = useDispatch()
   const { userData } = useSelector(state => state.auth)

   const [isEdit, setIsEdit] = useState(false)

   const formik = useFormik({
      initialValues: {
         username: userData.name || '',
         emailAddress: userData.email || '',
      },
      validationSchema: profileValidation,
      onSubmit: profileData => {
         dispatch(
            updateUserProfile({
               profileData,
               userId: userData.userId,
               setIsEdit,
            }),
         )
      },
   })

   const toggleIsEdit = () => setIsEdit(prev => !prev)

   return (
      <Form onSubmit={formik.handleSubmit}>
         <Container>
            <StyledInput
               label="Имя"
               placeholder="Иван"
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

         {isEdit ? (
            <BtnContainer>
               <StyledButton onClick={toggleIsEdit} variant="outlined">
                  Отменить
               </StyledButton>
               <StyledButton type="submit">Сохранить</StyledButton>
            </BtnContainer>
         ) : (
            <StyledButton onClick={toggleIsEdit}>Редактировать</StyledButton>
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
