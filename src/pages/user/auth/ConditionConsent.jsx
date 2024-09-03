import { styled } from '@mui/material';
import { Button } from '../../../components/UI/Button.jsx';
import { CheckBox } from '../../../components/UI/Checkbox.jsx';
import CloseIcon from '../../../assets/icons/cross-icon.svg?react';
import Modal from '../../../components/UI/Modal.jsx';
import { useState } from 'react';
import { LoginConfirmation } from './LoginConfirmation.jsx';

export const ConditionConsent = ({ signInModal, conditionModal }) => {
   const [isOpen, setIsOpen] = useState(true);
   const [isChecked, setIsChecked] = useState(false);
   const [isShow, setIsShow] = useState(false);

   const handleClose = () => setIsOpen(!isOpen);
   const handleOpenModal = () => {
      setIsOpen(!isOpen);
      setIsShow(!isShow);
   };
   const handleCheckBoxChange = event => setIsChecked(event.target.checked);

   const handleBack = () => {
      signInModal(true);
      conditionModal(false);
   };

   return (
      <div>
         <Modal open={isOpen} onClose={handleClose}>
            <IconStyle>
               <CloseIcon onClick={handleClose} />
            </IconStyle>
            <Box>
               <h2>Дайте согласие, чтобы продолжить</h2>
               <div>
                  <CheckBox
                     label="Принимаю условия"
                     onChange={handleCheckBoxChange}
                  />
                  <p>
                     Пользовательского соглашения, Политики конфиденциальности и
                     Обработки и распространения персональных данных
                  </p>
               </div>
               <Block>
                  {isShow ? (
                     <LoginConfirmation handleBack={handleBack} />
                  ) : (
                     <Button disabled={!isChecked} onClick={handleOpenModal}>
                        Продолжить
                     </Button>
                  )}
                  <Button onClick={handleBack}>Назад</Button>
               </Block>
            </Box>
         </Modal>
      </div>
   );
};
const Box = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '30px',
   h2: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: '26px',
      paddingTop: '50px',

      [theme.breakpoints.down('md')]: {
         fontSize: '24px',
      },
   },
   p: {
      fontWeight: '400',
      color: '#1877f2',
      paddingLeft: '28px',
      paddingBottom: '-30px',
   },
}));
const Block = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '16px',
}));
const IconStyle = styled('div')(() => ({
   svg: {
      position: 'absolute',
      top: '26px',
      right: '26px',
      cursor: 'pointer',
   },
}));
