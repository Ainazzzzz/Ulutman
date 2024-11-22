import React, { useState } from 'react'
import { InputBase, RadioGroup, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Search from '../../../assets/icons/searchgreyinput.svg?react'
import ArrowPurpul from '../../../assets/icons/arrowpurpul.svg?react'
import RadioButton from '../../../components/UI/RadioButton'
import { CheckBox } from '../../../components/UI/Checkbox'
import { Button } from '../../../components/UI/Button'

const AddAdmin = () => {
   const navigate = useNavigate()
   const [selectedOption] = useState('')

   return (
      <div>
         <ContainerTitleArrow>
            <TitleSyle>Добавить администратора </TitleSyle>
            <ArrowBox onClick={() => navigate(-1)}>
               <ArrowPurpul />
               <BackStyle>Назад</BackStyle>
            </ArrowBox>
         </ContainerTitleArrow>
         <SehondBigContainer>
            <InputStyle>
               <SearchIconStyle>
                  <Search />
               </SearchIconStyle>
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
   )
}

export default AddAdmin
const ContainerTitleArrow = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '0 60px 0 30px',
}))
const ArrowBox = styled('div')(({ theme }) => ({
   display: 'flex',
   paddingTop: '20px',
   cursor: 'pointer',
   [theme.breakpoints.down('md')]: {
      display: 'none',
   },
}))
const SehondBigContainer = styled('div')(({ theme }) => ({
   paddingLeft: '30px',
   [theme.breakpoints.down('md')]: {
      paddingLeft: '30px',
   },
}))

const TitleSyle = styled('div')(({ theme }) => ({
   color: 'rgb(40, 40, 40)',
   fontFamily: 'Kanit',
   fontSize: '34px',
   fontWeight: '600',
   lineHeight: '51px',
   paddingBottom: '40px',
   [theme.breakpoints.down('md')]: {
      fontSize: '27px',
      fontWeight: '600',
      lineHeight: '36px',
      paddingBottom: '24px',
   },
}))

const InputStyle = styled('div')(() => ({
   display: 'flex',
   gap: '15px',
   width: '343px',
   height: '38px',
   border: '0.6px solid rgb(213, 213, 213)',
   borderRadius: '19px',
   background: 'rgb(245, 246, 250)',
}))
const SearchIconStyle = styled('div')(() => ({
   padding: '10px 0 10px 10px',
}))
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
}))

const CheckboxStyle = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '35px',
   paddingBottom: '35px',
}))
const CheckboxFive = styled(CheckBox)(({ theme }) => ({
   color: 'rgb(0, 0, 0)',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '800',
   lineHeight: '17px',
   [theme.breakpoints.down('md')]: {
      lineHeight: '16px',
      fontSize: '14px',
      fontWeight: '500',
      height: '17px',
   },
}))
const BackStyle = styled('p')(() => ({
   color: 'rgb(126, 82, 255)',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '400',
   lineHeight: '17px',
}))
