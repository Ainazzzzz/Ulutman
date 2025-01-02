import React, { useState } from 'react'
import { InputBase, MenuItem, styled, useMediaQuery, Menu } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { useSelector } from 'react-redux'
import Search from '../../assets/icons/searchgrey.svg?react'
import UlutmanLogo from '../../assets/icons/ulutman-logo-icon.svg?react'
import MenuAdmin from '../../assets/icons/menu-icon.svg?react'
import GoOut from '../../assets/icons/goout.svg?react'
import Users from '../../assets/icons/usersicon.svg?react'
import Announcement from '../../assets/icons/announcement.svg?react'
import Category from '../../assets/icons/category.svg?react'
import Modearation from '../../assets/icons/moderation.svg?react'
import Language from '../../assets/icons/language-icon.svg?react'

import ReusableSelect from '../UI/Select'
import LogOutModal from '../UI/LogOutModal'
import { IconButton } from '../IconButton'
import LanguageModal from './LanguageModal'
import { renderFlag } from '../../utils/general/renderFlag'

const AdminHeader = () => {
   const { i18n, t } = useTranslation()
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
   const [language, setLanguage] = useState('ru')
   const [openMenu, setOpenMenu] = useState(null)
   const [openLogOutModal, setOpenLogOutModal] = useState(false)
   const [openLanguageModal, setOpenLanguageModal] = useState(false)

   const { userData } = useSelector(state => state.auth)

   const handleSelect = event => {
      const lng = event.target.value
      setLanguage(event.target.value)

      i18n.changeLanguage(lng)
   }

   const handleClose = () => {
      setOpenMenu(null)
   }

   const handleClick = event => {
      setOpenMenu(event.currentTarget)
   }

   const toggleLogOutModal = () => {
      handleClose()
      setOpenLogOutModal(prev => !prev)
   }

   const closeLanguageModal = () => setOpenLanguageModal(false)
   const handleOpenLanguageModal = () => {
      setOpenLanguageModal(true)
      setOpenMenu(null)
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
         <WrapperAdminHeader>
            {isMobile && (
               <LogoMobile>
                  <UlutmanLogoStyle />
               </LogoMobile>
            )}
            {isMobile ? (
               <div>
                  <MobileSearch>
                     <Search />

                     <IconButton onClick={handleClick}>
                        <MenuAdmin />
                     </IconButton>
                  </MobileSearch>

                  <MenuStyle
                     anchorEl={openMenu}
                     open={Boolean(openMenu)}
                     onClose={handleClose}
                  >
                     <MenuItemStyle onClick={toggleLogOutModal}>
                        <GoOut /> Выйти
                     </MenuItemStyle>

                     <Line />

                     <MenuItemStyle onClick={handleClose}>
                        <NavLink to="users">
                           <Users />
                           {t('admin.sideBar.users')}
                        </NavLink>
                     </MenuItemStyle>

                     <MenuItemStyle onClick={handleClose}>
                        <NavLink to="ads">
                           <Announcement /> {t('admin.sideBar.ads')}
                        </NavLink>
                     </MenuItemStyle>

                     <MenuItemStyle onClick={handleClose}>
                        <NavLink to="categories">
                           <Category />
                           {t('admin.sideBar.categories')}
                        </NavLink>
                     </MenuItemStyle>

                     <MenuItemStyle onClick={handleClose}>
                        <NavLink to="moderation">
                           <Modearation />
                           {t('admin.sideBar.moderation')}
                        </NavLink>
                     </MenuItemStyle>

                     <MenuItemStyle onClick={handleOpenLanguageModal}>
                        <Language />
                        {t('admin.sideBar.changeLanguage')}
                     </MenuItemStyle>
                  </MenuStyle>
               </div>
            ) : (
               <SehondBigContainer>
                  <InputStyle>
                     <SearchIconStyle>
                        <SearchIcon />
                     </SearchIconStyle>
                     <InputBase
                        placeholder={t('admin.header.inputLabel')}
                        sx={{ width: '100%' }}
                     />
                  </InputStyle>

                  <MiddleContainerBox>
                     <FlagLanguageStyle>
                        <div>{renderFlag(language)}</div>
                        <SelectStyle
                           options={languages}
                           value={language}
                           onChange={handleSelect}
                        />
                     </FlagLanguageStyle>
                     <ContainerProfileTitle>
                        <TitleAdmin>{userData.name}</TitleAdmin>
                     </ContainerProfileTitle>
                  </MiddleContainerBox>
               </SehondBigContainer>
            )}
         </WrapperAdminHeader>

         <LogOutModal open={openLogOutModal} onClose={toggleLogOutModal} />
         <LanguageModal open={openLanguageModal} onClose={closeLanguageModal} />
      </>
   )
}

export default AdminHeader

const WrapperAdminHeader = styled('div')(({ theme }) => ({
   background: 'rgb(255, 255, 255);',
   width: '100%',
   height: '70px',
   display: 'flex',
   justifyContent: 'space-around',
   paddingTop: '17px',
   position: 'sticky',
   top: 0,
   zIndex: 10,
   [theme.breakpoints.down('md')]: {
      height: '60px',
      justifyContent: 'center',
      paddingTop: '10px',
   },
}))
const SehondBigContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-around',
   width: '100%',
}))
const MobileSearch = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   gap: '27px',
   [theme.breakpoints.down('md')]: {
      paddingLeft: '110px',
   },
}))

const UlutmanLogoStyle = styled(UlutmanLogo)(({ theme }) => ({
   width: '134px',
   height: '29px',

   [theme.breakpoints.down('md')]: {},
}))
const LogoMobile = styled('div')(({ theme }) => ({
   [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'center',
   },
}))

const SearchIconStyle = styled('div')(() => ({
   padding: '6px  12px 12px 17px',
}))
const MiddleContainerBox = styled('div')(() => ({
   display: 'flex',
   gap: '50px',
   justifyContent: 'center',
   alignItems: 'center',
   paddingBottom: '10px',
}))
const InputStyle = styled('div')(() => ({
   width: '  388px',
   height: '38px',
   border: '0.6px solid rgb(213, 213, 213)',
   borderRadius: '19px',
   background: 'rgb(245, 246, 250);',
   color: 'rgb(32, 34, 36)',
   fontFamily: 'Nunito Sans',
   fontSize: '14px',
   fontWeight: '400',
   lineHeight: '19px',
   display: 'flex',
}))

const SearchIcon = styled(Search)(() => ({
   width: '19px',
   height: '19px',
}))
const SelectStyle = styled(ReusableSelect)(() => ({
   '.MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
   '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },

   '.MuiSelect-select': {
      paddingLeft: '0px',
      paddingBottom: '9px',
   },
}))
const FlagLanguageStyle = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   alignItems: 'center',
}))

const ContainerProfileTitle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '6px',
}))
const TitleAdmin = styled('p')(() => ({
   color: 'rgb(40, 40, 40);',
   fontFamily: 'Inter',
   fontSize: '16px',
   fontWeight: '400',
   lineHeight: '19px',
}))
const MenuStyle = styled(Menu)(() => ({
   '.MuiPaper-root': {
      padding: '16px 0px 16px 0px',
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
   '&:hover': {
      backgroundColor: '#fff',
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      marginRight: '16px',
      '& svg path': {
         stroke: '#7e51ff',
      },

      color: '#7e52ff',
      a: {
         color: '#7e52ff',
      },
   },

   a: {
      color: '#fff',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
   },
}))

const Line = styled('div')(() => ({
   width: '100%',
   borderBottom: '1px solid #b2b2b2',
   margin: '16px 0px 16px 0px',
}))
