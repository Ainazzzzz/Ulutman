import React, { useState } from 'react'
import { SignIn } from './SignIn'
import SignUp from './signUp'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'

const Auth = ({ openModal, toggleSignInModal }) => {
   const [signUpModal, setSignUpModal] = useState(false)
   const [forgotPasswordModal, setForgotPasswordModal] = useState(false)
   const [resetPasswordModal, setResetPasswordModal] = useState(false)

   const toggleSignUpModal = () => setSignUpModal(prev => !prev)
   const toggleForgotPasswordModal = () => setForgotPasswordModal(prev => !prev)
   const openResetPasswordModal = () => setResetPasswordModal(true)
   const closeResetPasswordModal = () => setResetPasswordModal(false)
   const closeForgotPasswordModal = () => setForgotPasswordModal(false)

   return (
      <>
         {openModal && (
            <SignIn
               open={openModal}
               onClose={toggleSignInModal}
               openSignUp={toggleSignUpModal}
               openForgotPassword={toggleForgotPasswordModal}
            />
         )}

         {signUpModal && (
            <SignUp
               open={signUpModal}
               onClose={toggleSignUpModal}
               openSignIn={toggleSignInModal}
            />
         )}

         {forgotPasswordModal && (
            <ForgotPassword
               open={forgotPasswordModal}
               onClose={closeForgotPasswordModal}
               openResetPassword={openResetPasswordModal}
            />
         )}

         {resetPasswordModal && (
            <ResetPassword
               toggleSignInModal={toggleSignInModal}
               open={resetPasswordModal}
               onClose={closeResetPasswordModal}
            />
            
         )}
      </>
   )
}

export default Auth
