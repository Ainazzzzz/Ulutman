import { useState } from 'react'
import { styled, useMediaQuery } from '@mui/material'
import Modal from '../UI/Modal'
import CloseIcon from '../../assets/icons/close-icon.svg?react'
import Input from '../UI/Input'
import ResetFilter from '../../assets/icons/reset-filter.svg?react'
import { Button } from '../UI/Button'

export const FilterModal = () => {
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

   const [open, setOpen] = useState(true)

   const handleCloseModal = () => setOpen(!open)
   return (
      <ModalStyle open={open} handleClose={handleCloseModal}>
         <Wrapper>
            <DescriptionBlock>
               <h4>Ещё фильтры</h4>
               <CloseIcon />
            </DescriptionBlock>
            <Container>
               <Block>
                  <Description>До метро</Description>
                  <MiniBox>
                     {isMobile ? null : <Title>Не более</Title>}
                     <InputStyle />
                     <Title>минут</Title>
                     <InputBox>
                        <SecondInput placeholder="Пешком" />
                        <FirstInput placeholder="Транспортом" />
                     </InputBox>
                  </MiniBox>
               </Block>
               <Block>
                  {isMobile ? (
                     <Description>Общая площадь</Description>
                  ) : (
                     <Description>Площадь, м2</Description>
                  )}
                  <MiniBox>
                     {isMobile ? null : <Title>Общяя</Title>}

                     <ThirdMiniBlock>
                        <ThirdInputStyle placeholder="от" />
                        <FourthInputStyle placeholder="до" />
                     </ThirdMiniBlock>
                  </MiniBox>
                  {isMobile ? null : (
                     <>
                        <MiniBox>
                           <Title>Кухня</Title>
                           <ThirdMiniBlock>
                              <ThirdInputStyle placeholder="от" />
                              <FourthInputStyle placeholder="до" />
                           </ThirdMiniBlock>
                        </MiniBox>
                        <MiniBox>
                           <Title>Жилая</Title>
                           <ThirdMiniBlock>
                              <ThirdInputStyle placeholder="от" />
                              <FourthInputStyle placeholder="до" />
                           </ThirdMiniBlock>
                        </MiniBox>
                     </>
                  )}
               </Block>
               {isMobile && (
                  <Block>
                     <Description>Площадь</Description>
                     <p>Жилая</p>
                     <ThirdMiniBlock>
                        <ThirdInputStyle placeholder="от" />
                        <FourthInputStyle placeholder="до" />
                     </ThirdMiniBlock>
                  </Block>
               )}
               <Block>
                  <Description>Год постройки</Description>
                  <ThirdMiniBlock>
                     <ThirdInputStyle placeholder="от" />
                     <FourthInputStyle placeholder="до" />
                  </ThirdMiniBlock>
               </Block>
            </Container>
            <Box>
               <ResetFilter />
               <Button>Применить</Button>
            </Box>
         </Wrapper>
      </ModalStyle>
   )
}

const DescriptionBlock = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   h4: {
      fontSize: '34px',
      fontWeight: '600',
      color: '#000',
      width: '243px',
   },
}))

const Box = styled('div')(({ theme }) => ({
   display: 'flex',
   gap: '16px',
   position: 'relative',
   left: '570px',
   [theme.breakpoints.down('md')]: {
      left: '0px',
   },
}))
const Description = styled('p')(({ theme }) => ({
   fontSize: '20px',
   fontWeight: '600',
   color: '#000',
   width: '153px',
   [theme.breakpoints.down('md')]: {
      fontSize: '18px',
   },
}))

const MiniBox = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
}))
const ThirdMiniBlock = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   [theme.breakpoints.down('md')]: {
      gap: '10px',
   },
}))
const InputStyle = styled(Input)(({ theme }) => ({
   width: '80px',
   [theme.breakpoints.down('md')]: {
      width: '42px',
   },
}))
const ThirdInputStyle = styled(Input)(({ theme }) => ({
   width: '80px',
   '& .MuiInputBase-root': {
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
   },
   [theme.breakpoints.down('md')]: {
      width: '160px',
      '& .MuiInputBase-root': {
         borderTopRightRadius: '10px',
         borderBottomRightRadius: '10px',
      },
   },
}))
const FourthInputStyle = styled(Input)(({ theme }) => ({
   width: '80px',
   '& .MuiInputBase-root': {
      borderTopLeftRadius: '0px',
      borderBottomLeftRadius: '0px',
   },
   [theme.breakpoints.down('md')]: {
      width: '180px',
      '& .MuiInputBase-root': {
         borderTopLeftRadius: '10px',
         borderBottomLeftRadius: '10px',
      },
   },
}))
const FirstInput = styled(Input)(() => ({
   width: '125px',
   '& .MuiInputBase-root': {
      borderTopLeftRadius: '0px',
      borderBottomLeftRadius: '0px',
   },
}))
const SecondInput = styled(Input)(() => ({
   width: '100px',
   '& .MuiInputBase-root': {
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
   },
}))

const Title = styled('p')(() => ({
   fontSize: '20px',
   fontWeight: '500',
   color: '#000',
}))
const Container = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
   },
}))
const Block = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: '30px',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'start',
      gap: '8px',
   },
}))

const Wrapper = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
}))

const InputBox = styled('div')(() => ({
   display: 'flex',
}))

const ModalStyle = styled(Modal)(() => ({
   '& .MuiDialog-paper': {
      padding: '16px',
   },
}))
