import * as Yup from 'yup'

export const createSignUpSchema = t =>
   Yup.object().shape({
      name: Yup.string()
         .min(2, t('signUp.signUpValidation.name'))
         .required(t('signUp.signUpValidation.nameRequired')),
      email: Yup.string()
         .email(t('signUp.signUpValidation.email'))
         .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            t('signUp.signUpValidation.emailMatches'),
         )
         .required(t('signUp.signUpValidation.emailRequired')),
      password: Yup.string()
         .min(6, t('signUp.signUpValidation.password'))
         .required(t('signUp.signUpValidation.passwordRequired')),
      confirmPassword: Yup.string()
         .oneOf(
            [Yup.ref('password'), null],
            t('signUp.signUpValidation.confirmPassword'),
         )
         .required(t('signUp.signUpValidation.confirmPasswordRequired')),
   })
