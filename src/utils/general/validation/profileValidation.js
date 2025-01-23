import * as Yup from 'yup'

export const profileValidation = t =>
   Yup.object({
      username: Yup.string().required(
         t('user.profile.profileValidation.username'),
      ),
      emailAddress: Yup.string()
         .email(t('user.profile.profileValidation.emailAddress'))
         .required(t('user.profile.profileValidation.emailAddressRequired')),
   })
