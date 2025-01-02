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
   const toggleResetPasswordModal = () => setResetPasswordModal(prev => !prev)

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
               onClose={toggleForgotPasswordModal}
               toggleResetPasswordModal={toggleResetPasswordModal}
            />
         )}

         {resetPasswordModal && (
            <ResetPassword
               open={resetPasswordModal}
               onClose={toggleResetPasswordModal}
               toggleSignInModal={toggleSignInModal}
            />
         )}
      </>
   )
}

export default Auth
