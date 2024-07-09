import { styled } from '@mui/material';
import { Button } from '../../components/UI/Button';
import { CheckBox } from '../../components/UI/Checkbox';
import CloseIcon from '../../assets/icons/cross-icon.svg?react';
import Modal from '../../components/UI/Modal';
import { useState } from 'react';
import { LoginConfirmation } from './LoginConfirmation';

export const ConditionConsent = () => {
   const [isOpen, setIsOpen] = useState(true);
   const [isChecked, setIsChecked] = useState(false);
   const [isShow, setIsShow] = useState(false);

   const handleClose = () => setIsOpen(!isOpen);
   const handleOpenModal = () => {
      setIsOpen(!isOpen);
      setIsShow(!isShow);
   };
   const handleCheckBoxChange = event => setIsChecked(event.target.checked);

   return (
      <div>
         <Modal open={isOpen} onClose={handleClose}>
            <IconStyle>
               <CloseIcon onClick={handleClose} />
            </IconStyle>
            <Box>
               <h2>Дайте согласие,  чтобы продолжить</h2>
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
                     <LoginConfirmation />
                  ) : (
                     <Button disabled={!isChecked} onClick={handleOpenModal}>
                        Продолжить
                     </Button>
                  )}
                  <Button>Назад</Button>
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
