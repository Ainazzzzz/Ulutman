import { useState } from 'react';
import Modal from '../UI/Modal';
import CloseIcon from '../../assets/icons/close-icon.svg?react';
import { styled } from '@mui/material';
import Input from '../UI/Input';
export const CategoryModal = () => {
   const [open, setOpen] = useState(true);

   const handleCloseModal = () => setOpen(!open);
   return (
      <div>
         <Modal open={open} handleClose={handleCloseModal}>
            <DescriptionBlock>
               <h4>Ещё фильтры</h4>
               <CloseIcon />
            </DescriptionBlock>
            <Container>
               <TitleBlock>
                  <p>До метро</p>
                  <p>Площадь, м2</p>
                  <p>Год постройки</p>
               </TitleBlock>
               <Block>
                  <FirstMiniBlock>
                     <Title>Не более</Title>
                     <InputStyle />
                     <Title>Минут</Title>
                  </FirstMiniBlock>
                  <FirstMiniBlock>
                     <div style={{ display: 'flex' }}>
                        <Title>Общяя</Title>
                        <ThirdMiniBlock>
                           <ThirdInputStyle placeholder="от" />
                           <FourthInputStyle placeholder="до" />
                        </ThirdMiniBlock>
                     </div>
                     <div>
                        <Title>Общяя</Title>
                        <ThirdMiniBlock>
                           <ThirdInputStyle placeholder="от" />
                           <FourthInputStyle placeholder="до" />
                        </ThirdMiniBlock>
                     </div>
                     <div>
                        <Title>Общяя</Title>
                        <ThirdMiniBlock>
                           <ThirdInputStyle placeholder="от" />
                           <FourthInputStyle placeholder="до" />
                        </ThirdMiniBlock>
                     </div>
                  </FirstMiniBlock>
                  <ThirdMiniBlock>
                     <ThirdInputStyle placeholder="от" />
                     <FourthInputStyle placeholder="до" />
                  </ThirdMiniBlock>
               </Block>
            </Container>
         </Modal>
      </div>
   );
};

const DescriptionBlock = styled('div')(() => ({
   display: 'flex',
   gap: '250px',
   h4: {
      fontSize: '34px',
      fontWeight: '600',
      color: '#000',
      width: '243px',
   },
}));
const TitleBlock = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '50px',
   p: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#000',
   },
}));

const FirstMiniBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
}));
const ThirdMiniBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
}));
const InputStyle = styled(Input)(() => ({
   width: '80px',
}));
const ThirdInputStyle = styled(Input)(() => ({
   width: '80px',
   '& .MuiInputBase-root': {
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
   },
}));
const FourthInputStyle = styled(Input)(() => ({
   width: '80px',
   '& .MuiInputBase-root': {
      borderTopLeftRadius: '0px',
      borderBottomLeftRadius: '0px',
   },
}));

const Title = styled('p')(() => ({
   fontSize: '20px',
   fontWeight: '400',
   color: '#000',
}));
const Container = styled('div')(() => ({
   display: 'flex',
   gap: '30px',
}));
const Block = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '25px',
}));
