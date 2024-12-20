import { useState } from 'react'
import { styled, useMediaQuery } from '@mui/material'
import { useDispatch } from 'react-redux'
import Modal from '../UI/Modal'
import CloseIcon from '../../assets/icons/close-icon.svg?react'
import Input from '../UI/Input'
import ResetFilter from '../../assets/icons/reset-filter.svg?react'
import { Button } from '../UI/Button'
import {
   filtermodalThunks,
   resertFilterThunks,
} from '../../redux/categories/userCategoriesThunk'

export const FilterModal = () => {
   const [minTotalArea, setMinTotalArea] = useState('')
   const [maxTotalArea, setMaxTotalArea] = useState('')
   const [minKitchenArea, setMinKitchenArea] = useState('')
   const [maxKitchenArea, setMaxKitchenArea] = useState('')
   const [minLivingArea, setMinLivingArea] = useState('')
   const [maxLivingArea, setMaxLivingArea] = useState('')
   const [minYear, setMinYear] = useState('')
   const [maxYear, setMaxYear] = useState('')
   const [walkingDistance, setWalkingDistance] = useState('')
   const [transportDistance, setTransportDistance] = useState('')
   const [walking, setWalking] = useState()
   const [open, setOpen] = useState(true)
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
   const dispatch = useDispatch()
   const [isWalking, setIsWalking] = useState(true)
   const handleApplyFilters = () => {
      const filterData = {
         minTotalArea,
         maxTotalArea,
         minKitchenArea,
         maxKitchenArea,
         minLivingArea,
         maxLivingArea,
         minYear,
         maxYear,
         walking,
         walkingDistance: walkingDistance ? Number(walkingDistance) : '',
         transportDistance: transportDistance ? Number(transportDistance) : '',
         transportType: 'TRANSPORT',
      }

      dispatch(filtermodalThunks(filterData))
      setOpen(false)
   }
   const handleResetFilters = () => {
      setMinTotalArea('')
      setMaxTotalArea('')
      setMinKitchenArea('')
      setMaxKitchenArea('')
      setMinLivingArea('')
      setMaxLivingArea('')
      setMinYear('')
      setMaxYear('')
      setWalkingDistance('')
      setTransportDistance('')
      setWalking(true)
      dispatch(resertFilterThunks())
   }

   const handleCloseModal = () => setOpen(false)
   return (
      <ModalStyle open={open} handleClose={handleCloseModal}>
         <Wrapper>
            <DescriptionBlock>
               <h4>Ещё фильтры</h4>
               <CloseIcon onClick={handleCloseModal} />
            </DescriptionBlock>
            <Container>
               <Block>
                  <Description>До метро</Description>
                  <MiniBox>
                     {isMobile ? null : <Title>Не более</Title>}
                     <InputStyle
                        type="number"
                        value={walking}
                        onChange={e => setWalking(e.target.value)}
                     />
                     <Title>минут</Title>
                     <InputBox>
                        <SecondButtun
                           value={walkingDistance}
                           onChange={e => setWalkingDistance(e.target.value)}
                           isWalking={isWalking}
                           onClick={() => setIsWalking(true)}
                        >
                           Пешком
                        </SecondButtun>

                        <FirstButtun
                           value={transportDistance}
                           onChange={e => setTransportDistance(e.target.value)}
                           isWalking={isWalking}
                           onClick={() => setIsWalking(false)}
                        >
                           Транспортом
                        </FirstButtun>
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
                        <ThirdInputStyle
                           value={minTotalArea}
                           onChange={e => setMinTotalArea(e.target.value)}
                           placeholder="от"
                           type="number"
                        />
                        <FourthInputStyle
                           value={maxTotalArea}
                           onChange={e => setMaxTotalArea(e.target.value)}
                           placeholder="до"
                           type="number"
                        />
                     </ThirdMiniBlock>
                  </MiniBox>
                  {isMobile ? null : (
                     <>
                        <MiniBox>
                           <Title>Кухня</Title>
                           <ThirdMiniBlock>
                              <ThirdInputStyle
                                 value={minKitchenArea}
                                 onChange={e =>
                                    setMinKitchenArea(e.target.value)
                                 }
                                 placeholder="от"
                                 type="number"
                              />
                              <FourthInputStyle
                                 value={maxKitchenArea}
                                 onChange={e =>
                                    setMaxKitchenArea(e.target.value)
                                 }
                                 placeholder="до"
                                 type="number"
                              />
                           </ThirdMiniBlock>
                        </MiniBox>
                        <MiniBox>
                           <Title>Жилая</Title>
                           <ThirdMiniBlock>
                              <ThirdInputStyle
                                 value={minLivingArea}
                                 onChange={e =>
                                    setMinLivingArea(e.target.value)
                                 }
                                 placeholder="от"
                                 type="number"
                              />
                              <FourthInputStyle
                                 value={maxLivingArea}
                                 onChange={e =>
                                    setMaxLivingArea(e.target.value)
                                 }
                                 placeholder="до"
                                 type="number"
                              />
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
                        <ThirdInputStyle
                           value={minLivingArea}
                           onChange={e => setMinLivingArea(e.target.value)}
                           placeholder="от"
                           type="number"
                        />
                        <FourthInputStyle
                           value={maxLivingArea}
                           onChange={e => setMaxLivingArea(e.target.value)}
                           placeholder="до"
                           type="number"
                        />
                     </ThirdMiniBlock>
                  </Block>
               )}
               <Block>
                  <Description>Год постройки</Description>
                  <ThirdMiniBlock>
                     <ThirdInputStyle
                        value={minYear}
                        onChange={e => setMinYear(e.target.value)}
                        placeholder="от"
                        type="number"
                     />
                     <FourthInputStyle
                        value={maxYear}
                        onChange={e => setMaxYear(e.target.value)}
                        placeholder="до"
                        type="number"
                     />
                  </ThirdMiniBlock>
               </Block>
            </Container>
            <Box>
               <ResetFilter onClick={handleResetFilters} />
               <Button onClick={handleApplyFilters}>Применить</Button>
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

   '.css-heatjl-MuiFormControl-root-MuiTextField-root': {
      display: 'none',
   },
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
const FirstButtun = styled(Button)(({ isWalking }) => ({
   width: '150px',
   height: '40px',
   padding: '6px 20px 6px 20px',
   gap: '10px',
   borderRadius: '0px 10px 10px 0px',
   border: '1px solid #CFCFCF',
   background: !isWalking ? '7E52FF' : 'white',
   color: !isWalking ? 'white' : '#000000',
   cursor: 'pointer',
   fontSize: '18px',
   fontWeight: '400',
   lineHeight: '29.9px',
}))
const SecondButtun = styled(Button)(({ isWalking }) => ({
   width: '122px',
   height: '40px',
   padding: '6px 20px 6px 20px',
   gap: '10px',
   borderRadius: '10px 0px 0px 10px',
   border: '1px solid #CFCFCF',
   background: isWalking ? '7E52FF' : 'white',
   color: isWalking ? 'white' : '#000000',
   cursor: 'pointer',
   fontSize: '18px',
   fontWeight: '400',
   lineHeight: '29.9px',
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
