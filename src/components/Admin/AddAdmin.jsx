import React, { useState } from 'react';
import Search from '../../assets/icons/searchgreyinput.svg?react';
import { InputBase, RadioGroup, styled } from '@mui/material';
import { CheckBox } from '../UI/Checkbox';
import ArrowPurpul from '../../assets/icons/arrowpurpul.svg?react';
import { Button } from '../UI/Button';
import RadioButton from '../UI/RadioButton';

const AddAdmin = () => {
   const [selectedOption, setSelectedOption] = useState('');

   const handleOptionChange = event => {
      setSelectedOption(event.target.value);
   };
   return (
      <div>
         <ContainerTitleArrow>
            <TitleSyle>Добавить администратора </TitleSyle>
            <ArrowBox>
               <ArrowPurpul />
               <BackStyle>Назад</BackStyle>
            </ArrowBox>
         </ContainerTitleArrow>
         <SehondBigContainer>
            <InputStyle>
               <Search />
               <InputBase placeholder="Поиск" />
            </InputStyle>

            <RadioGroup>
               <RadioButtonStyle>
                  <RadioButton
                     label="Выбрать все"
                     value="all"
                     checked={selectedOption === 'all'}
                  />
                  <RadioButton
                     label="Некоторые"
                     value="some"
                     checked={selectedOption === 'some'}
                  />
               </RadioButtonStyle>
            </RadioGroup>

            <CheckboxStyle>
               <CheckboxFive type="checkbox" label="Dashboard" />
               <CheckboxFive
                  type="checkbox"
                  label="Управление пользователями"
               />
               <CheckboxFive type="checkbox" label="Управление объявлениями" />
               <CheckboxFive
                  type="checkbox"
                  label="Управление категориями и подкатегориями"
               />
               <CheckboxFive type="checkbox" label="Модерация контента" />
            </CheckboxStyle>
            <Button>Добавить</Button>
         </SehondBigContainer>
      </div>
   );
};

export default AddAdmin;
const ContainerTitleArrow = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-around',
}));
const ArrowBox = styled('div')(() => ({
   display: 'flex',
}));
const SehondBigContainer = styled('div')(() => ({
   paddingLeft: '260px',
}));

const TitleSyle = styled('div')(() => ({
   color: 'rgb(40, 40, 40)',
   fontFamily: 'Kanit',
   fontSize: '34px',
   fontWeight: '600',
   lineHeight: '51px',
   paddingBottom: '40px',
}));

const InputStyle = styled('div')(() => ({
   width: '338px',
   height: '38px',
   border: '0.6px solid rgb(213, 213, 213)',
   borderRadius: '19px',
   background: 'rgb(245, 246, 250)',
}));
const RadioButtonStyle = styled('div')(() => ({
   display: 'flex',
   gap: '60px',
   paddingTop: '33px',
   paddingBottom: '47px',
   color: 'rgb(0, 0, 0)',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '700',
   lineHeight: '17px',
}));

const CheckboxStyle = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '35px',
   paddingBottom: '35px',
}));
const CheckboxFive = styled(CheckBox)(() => ({
   color: 'rgb(0, 0, 0)',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '800',
   lineHeight: '17px',
}));
const BackStyle = styled('p')(() => ({
   color: 'rgb(126, 82, 255)',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '400',
   lineHeight: '17px',
}));
