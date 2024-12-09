import { styled, useMediaQuery } from '@mui/material'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Breadcrumbs from './UI/Breadcrumbs'
import SearchInput from './UI/SearchInput'
import ChevronLeft from '../assets/icons/chevron-left.svg?react'
import {
   categoriesThunks,
   searchInputThunks,
} from '../redux/categories/userCategoriesThunk'
import { serializeToQueryParams } from '../utils/general/serialize'

export const Categories = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))
   const { subCategory } = useParams()
   const [searchValue, setSearchValue] = useState('')

   const handleSearch = () => {
      const searchParams = serializeToQueryParams({
         categories: subCategory,
         titles: searchValue,
      })

      dispatch(searchInputThunks(searchParams))
   }

   const handleInputChange = e => {
      setSearchValue(e.target.value)
   }

   const path = {
      WORK: 'Работа',
      RENT: 'Аренда',
      HOTEL: 'Гостиница',
      SERVICES: 'Услуги',
      REAL_ESTATE: 'Недвижимость',
      AUTO: 'Авто',
      SELL: 'Продам',
   }

   const breadcrumbs = [
      { url: '/', title: 'Главная ' },
      { url: `/${subCategory}`, title: path[subCategory] },
   ]

   useEffect(() => {
      dispatch(categoriesThunks({ subCategory: subCategory.toLowerCase() }))
   }, [dispatch, subCategory])

   return (
      <Wrapper>
         <Container>
            <Block>
               <FirstBlock>
                  <Breadcrumbs path={breadcrumbs} />
                  {!isMobile && (
                     <BackStyle onClick={() => navigate('/')}>
                        <ChevronLeft /> Назад
                     </BackStyle>
                  )}
               </FirstBlock>
               <SearchInputStyle
                  placeholder="Поиск по названию"
                  value={searchValue}
                  onChange={handleInputChange}
                  onSearch={handleSearch}
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

const SearchInputStyle = styled(SearchInput)(() => ({
   height: '64px',
}))

const BackStyle = styled('span')(() => ({
   cursor: 'pointer',
}))
