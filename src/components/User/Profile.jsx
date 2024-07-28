import { styled } from '@mui/material';
import { Button } from '../UI/Button';
import Input from '../UI/Input';
import { useReducer } from 'react';

const reducer = (state, action) => {
   switch (action.type) {
      case 'SET_FIRST_NAME':
         return { ...state, firstName: action.payload };
      case 'SET_LAST_NAME':
         return { ...state, lastName: action.payload };
      case 'SET_PHONE':
         return { ...state, phone: action.payload };
      case 'SET_EMAIL':
         return { ...state, email: action.payload };
      default:
         return state;
   }
};

const initialState = {
   firstName: '',
   lastName: '',
   phone: '',
   email: '',
};

export const Profile = () => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const handleFirstNameChange = e => {
      dispatch({ type: 'SET_FIRST_NAME', payload: e.target.value });
   };
   const handleLastNameChange = e => {
      dispatch({ type: 'SET_LAST_NAME', payload: e.target.value });
   };
   const handlePhoneChange = e => {
      dispatch({ type: 'SET_PHONE', payload: e.target.value });
   };
   const handleEmailChange = e => {
      dispatch({ type: 'SET_EMAIL', payload: e.target.value });
   };

   const handleSubmit = e => {
      e.preventDefault();
      console.log(state);
   };

   return (
      <Form onSubmit={handleSubmit}>
         <WrapperFullName>
            <StyledInput
               label="Имя"
               placeholder="Иван"
               value={state.firstName}
               onChange={handleFirstNameChange}
               required
            />
            <StyledInput
               label="Фамилия"
               placeholder="Иванов"
               value={state.lastName}
               required
               onChange={handleLastNameChange}
            />
         </WrapperFullName>
         <StyledInput
            label="Телефон "
            type="number"
            required
            placeholder="+7 xxx xxxxxxx"
            value={state.phone}
            onChange={handlePhoneChange}
         />
         <WrapperEmailConfirmation>
            <EmailInput
               label="Электронная почта"
               type="email"
               placeholder="example@mail.com"
               value={state.email}
               required
               s
               onChange={handleEmailChange}
            />
            <ConfirmationLink>
               Отправить ссылку для подтверждения
            </ConfirmationLink>
         </WrapperEmailConfirmation>
         <StyledButton type="submit">Сохранить</StyledButton>
      </Form>
   );
};

const Form = styled('form')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   padding: '40px 57px',
}));

const WrapperFullName = styled('div')(() => ({
   display: 'flex',
   gap: '24px',
}));

const StyledInput = styled(Input)(() => ({
   width: '327px',
}));

const EmailInput = styled(Input)(() => ({
   maxWidth: '678px',
}));

const ConfirmationLink = styled('p')(() => ({
   maxWidth: '300px',
   minHeight: '33px',
   border: '1px solid #7E52FF',
   background: '#7E52FF1A',
   padding: '8px 10px 8px 10px',
   borderRadius: '8px',
   color: '#7E52FF',
   fontSize: '14px',
   fontWeight: '500',
   cursor: 'pointer',
}));

const WrapperEmailConfirmation = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '14px',
}));

const StyledButton = styled(Button)(() => ({
   width: '144px',
   marginTop: '16px',
}));
