import { styled, Typography, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { IconButton } from '../components/IconButton'
import { Button } from '../components/UI/Button'
import ReusableSelect from '../components/UI/Select'
import { renderFlag } from '../utils/general/renderFlag'
import HeartLike from '../assets/icons/white-heart.svg?react'
import UserLogo from '../assets/icons/user.svg?react'
import Plus from '../assets/icons/plus.svg?react'
import MenuIcon from '../assets/icons/menu-icon.svg?react'
import UlutmanLogo from '../assets/icons/ulutman-logo-icon.svg?react'
import LogOutIcon from '../assets/icons/come-icon.svg?react'
import { logOut } from '../redux/auth/authThunk'
import DownIcon from '../assets/icons/select-down-icon.svg?react'
import { ConfirmLogoutModal } from '../components/UI/ConfirmLogoutModal'
import Modal from '../components/UI/Modal'
import Auth from '../pages/user/auth/Auth'

export const Header = () => {
   const dispatch = useDispatch()
   const { isAuth, userData } = useSelector(state => state.auth)
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
   const navigate = useNavigate()
   const { i18n, t } = useTranslation()

   const [language, setLanguage] = useState('ru')
   const [openMenu, setOpenMenu] = useState(null)
   const [isModalOpen, setModalOpen] = useState(false)
   const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false)
   const [openOptionsProfile, setOpenOptionsProfile] = useState(null)
   const [openSignInModal, setOpenSignInModal] = useState(false)

   const toggleSignInModal = () => setOpenSignInModal(prev => !prev)

   const handleClose = () => {
      setOpenMenu(null)
   }

   const confirmLogout = () => {
      dispatch(logOut({ navigate, toggleModal: handleClose }))
      setOpenLogoutConfirm(false)
      console.log("Aidana");
      
   }

   const handleSelect = event => {
      const lng = event.target.value
      setLanguage(event.target.value)

      i18n.changeLanguage(lng)
   }

   const handleClick = event => setOpenMenu(event.currentTarget)

   const closeProfileOptions = () => {
      setOpenOptionsProfile(null)
   }

   const handleOpenModal = () => {
      handleClose()
      toggleSignInModal()
   }

   const handleOpenPublishModal = () => {
      setOpenMenu(null)
      setModalOpen(true)
   }
   const handleClosePublishModal = () => setModalOpen(false)

   const logOutHandler = () => {
      setOpenOptionsProfile(null)
      setOpenLogoutConfirm(true)
   }
   const handleNavigationPage = path => {
      handleClose()
      navigate(path)
   }

   const navigateToPageHandler = path => {
      handleClose()
      closeProfileOptions()
      navigate(path)
   }

   const profileHandler = event => {
      setOpenOptionsProfile(event.currentTarget)
   }

   const languages = [
      { label: t('admin.header.select.ru'), value: 'ru' },
      { label: t('admin.header.select.kg'), value: 'kg' },
      { label: t('admin.header.select.tj'), value: 'tj' },
      { label: t('admin.header.select.uz'), value: 'uz' },
      { label: t('admin.header.select.en'), value: 'en' },
      { label: t('admin.header.select.tr'), value: 'tr' },
   ]

   return (
      <>
         <ConfirmLogoutModal
            open={openLogoutConfirm}
            onClose={() => setOpenLogoutConfirm(false)}
            onConfirm={confirmLogout}
         />
         <Wrapper>
            <LogoStyle onClick={() => handleNavigationPage('/user')}>
               <UlutmanLogo />
            </LogoStyle>
            {isMobile ? (
               <div>
                  <IconButton onClick={handleClick}>
                     <MenuIcon />
                  </IconButton>
                  <MenuStyle
                     anchorEl={openMenu}
                     open={Boolean(openMenu)}
                     onClose={handleClose}
                  >
                     {!isAuth ? (
                        <MenuItemStyle onClick={handleOpenModal}>
                           <LogOutIcon /> {t('user.layout.header.enter')}
                        </MenuItemStyle>
                     ) : (
                        <MenuItemStyle onClick={logOutHandler}>
                           <LogOutIcon /> {t('user.layout.header.logOut')}
                        </MenuItemStyle>
                     )}
                     <Line />
                     {isAuth && (
                        <MenuItemStyle
                           onClick={() =>
                              navigateToPageHandler('my-page/profile')
                           }
                        >
                           <UserLogo /> {t('user.layout.header.profile')}
                        </MenuItemStyle>
                     )}
                     {/* <MenuItemStyle onClick={handleClose}>
                        <SearchIcon color="#fff" />{' '}
                        {t('user.layout.header.search')}
                     </MenuItemStyle> */}
                     <MenuItemStyle
                        onClick={() => handleOpenPublishModal('create-ad')}
                     >
                        <Plus /> {t('user.layout.header.create-ad')}
                     </MenuItemStyle>
                     <MenuItemStyle
                        onClick={() => handleNavigationPage('favorite')}
                     >
                        <HeartLike /> {t('user.layout.header.favorite')}
                     </MenuItemStyle>
                     {/* <MenuItemStyle onClick={handleClose}>
                        <Language /> {t('user.layout.header.language')}
                     </MenuItemStyle>  */}

                     <LanguageBox>
                        <div>{renderFlag(language)}</div>
                        <SelectStyle
                           options={languages}
                           value={language}
                           onChange={handleSelect}
                        />
                     </LanguageBox>
                  </MenuStyle>
               </div>
            ) : (
               <ContainerBlock>
                  {isAuth && (
                     <>
                        <Block onClick={() => handleNavigationPage('favorite')}>
                           <IconButton>
                              <HeartLike />
                           </IconButton>
                           {t('user.layout.header.favorite')}
                        </Block>
                        <Block onClick={profileHandler}>
                           <IconButton>
                              <UserLogo />
                           </IconButton>
                           <UserName>{userData.name}</UserName>
                           <DownIcon />
                        </Block>
                        <MenuProfile
                           anchorEl={openOptionsProfile}
                           open={Boolean(openOptionsProfile)}
                           onClose={closeProfileOptions}
                        >
                           <MenuItem
                              onClick={() =>
                                 navigateToPageHandler('my-page/profile')
                              }
                           >
                              {t('user.layout.header.profile')}
                           </MenuItem>
                           <MenuItemLogOut onClick={logOutHandler}>
                              <LogOutIcon /> {t('user.layout.header.logOut')}
                           </MenuItemLogOut>
                        </MenuProfile>
                     </>
                  )}
                  <Block>
                     <div>{renderFlag(language)}</div>
                     <SelectStyle
                        options={languages}
                        value={language}
                        onChange={handleSelect}
                     />
                  </Block>
                  {isAuth ? (
                     <ButtonStyle
                        onClick={() => handleOpenPublishModal('create-ad')}
                     >
                        <Plus /> {t('user.layout.header.create-ad')}
                     </ButtonStyle>
                  ) : (
                     <ButtonStyle onClick={handleOpenModal}>
                        {t('user.layout.header.enter')}
                     </ButtonStyle>
                  )}
               </ContainerBlock>
            )}
         </Wrapper>

         <Modal
            open={isModalOpen}
            handleClose={handleClosePublishModal}
            variant="publish"
         />

         <Auth
            openModal={openSignInModal}
            toggleSignInModal={toggleSignInModal}
         />
      </>
   )
}

const MenuProfile = styled(Menu)({
   width: '170px',
})

const MenuItemLogOut = styled(MenuItem)({
   display: 'flex',
   gap: '5px',
   color: '#FF0000',
   '& svg path': {
      stroke: 'red',
   },
})

const Wrapper = styled('header')(({ theme }) => ({
   height: '84px',
   background: '#ffffff',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   padding: '14px 60px',
   svg: { cursor: 'pointer' },
   [theme.breakpoints.down('md')]: { padding: '16px', height: '59px' },
   position: 'fixed',
   top: '0',
   left: 0,
   width: '100%',
   zIndex: '99',
}))

const Block = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
   cursor: 'pointer',
   transition: '200ms',

   '&:hover': {
      color: '#9774FF',

      path: {
         transition: '200ms',
         stroke: '#9774FF',
      },
   },

   '&:active': {
      color: '#5C24FF',

      path: {
         stroke: '#5C24FF',
      },
   },
}))

const UserName = styled(Typography)(() => ({
   maxidth: '150px',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
   textWrap: 'nowrap',
}))
const LanguageBox = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   alignItems: 'center',
   paddingLeft: '40px',
   paddingTop: '6px',
   div: {
      color: '#fff',
      fontWeight: '600',
   },
}))

const ContainerBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '32px',
}))

const LogoStyle = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
   svg: { [theme.breakpoints.down('md')]: { width: '134px', height: '29px' } },
}))

const ButtonStyle = styled(Button)(() => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '4px',
   fontWeight: '500',
   textTransform: 'inherit',
   height: '36px',
}))

const SelectStyle = styled(ReusableSelect)(() => ({
   '.MuiOutlinedInput-notchedOutline': { border: 'none' },
   '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
   '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
   '.MuiSelect-icon': { right: '5px', top: '6px' },
   '.MuiSelect-select': { padding: 0 },
}))

const MenuStyle = styled(Menu)(() => ({
   '.MuiPaper-root': {
      padding: '16px 0px',
      width: '230px',
      background: '#7e52ff',
   },
}))

const MenuItemStyle = styled(MenuItem)(() => ({
   display: 'flex',
   gap: '10px',
   paddingLeft: '40px',
   color: '#fff',
   fontWeight: '600',

   svg: {
      path: {
         stroke: '#fff',
      },
   },

   '&:hover': {
      backgroundColor: '#fff',
      color: '#7e52ff',
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      marginRight: '16px',
      '& svg path': { stroke: '#7e51ff' },
   },
}))

const Line = styled('div')(() => ({
   width: '100%',
   borderBottom: '1px solid #b2b2b2',
   margin: '16px 0px',
}))
