import { styled, useMediaQuery } from '@mui/material'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from './UI/Breadcrumbs'
import SEO from './SEO'
import SearchInput from './UI/SearchInput'
import ChevronLeft from '../assets/icons/chevron-left.svg?react'
import { searchInputThunks } from '../redux/categories/userCategoriesThunk'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

export const Categories = () => {
   const [searchValue, setSearchValue] = useState()
   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
   const { subCategory } = useParams()
   const { t } = useTranslation()
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const path = {
      WORK: t('user.categories.breadcrumbs.path.work'),
      RENT: t('user.categories.breadcrumbs.path.rent'),
      HOTEL: t('user.categories.breadcrumbs.path.hotel'),
      SERVICES: t('user.categories.breadcrumbs.path.services'),
      REAL_ESTATE: t('user.categories.breadcrumbs.path.real_estate'),
      AUTO: t('user.categories.breadcrumbs.path.auto'),
      SELL: t('user.categories.breadcrumbs.path.sell'),
   }

   const breadcrumbs = [
      { url: '/user', title: t('user.categories.breadcrumbs.main') },
      {
         url: `/${subCategory}`,
         title: path[subCategory],
      },
   ]

   const handleInputChange = event => {
      setSearchValue(event.target.value)
   }
   const handleClick = () => {
      if (searchValue) {
         dispatch(searchInputThunks(searchValue))
      } else {
         console.warn('Поисковой запрос пуст!')
      }
   }

   return (
      <Wrapper>
         <SEO
            title={path[subCategory]}
            description={`${path[subCategory]} в Кыргызстане — объявления на Ulutman`}
            url={`/user/category/${subCategory}`}
         />
         <Container>
            <Block>
               <FirstBlock>
                  <Breadcrumbs path={breadcrumbs} />
                  {!isMobile && (
                     <BackStyle onClick={() => navigate('/user')}>
                        <ChevronLeft /> {t('user.myPage.back')}
                     </BackStyle>
                  )}
               </FirstBlock>
               <SearchInputStyle
                  placeholder={t('user.categories.search.inputLabel')}
                  onClick={handleClick}
                  value={searchValue}
                  onChange={handleInputChange}
               />
            </Block>
            <Outlet />
         </Container>
      </Wrapper>
   )
}

const FirstBlock = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   span: {
      fontSize: '14px',
      color: '#7252ff',
      fontWeight: '400',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
   },
}))
const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
}))
const Block = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
}))
const Wrapper = styled('div')(({ theme }) => ({
   padding: '40px 60px 60px 60px',
   [theme.breakpoints.down('md')]: {
      padding: '24px 16px 24px 16px',
   },
}))

const SearchInputStyle = styled(SearchInput)(({ theme }) => ({
   height: '64px',
   [theme.breakpoints.down('md')]: {
      width: '100px',
   },
}))

const BackStyle = styled('span')(() => ({
   cursor: 'pointer',
}))
