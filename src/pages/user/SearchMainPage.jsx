import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '../../components/UI/Breadcrumbs'
import SEO from '../../components/SEO'
import { CategoryCard } from '../../components/UI/CategoryCard'
import { useMainCategoryParams } from '../../hooks/useSearchParams'
import { searchCategoryAndMetroRequest } from '../../redux/main/mainThunk'
import { serializeToQueryParams } from '../../utils/general/serialize'
import SearchInput from '../../components/UI/SearchInput'

const CATEGORY_MAIN = {
   Работа: 'WORK',
   Аренда: 'RENT',
   Гостиница: 'HOTEL',
   Услуги: 'SERVICES',
   Недвижимость: 'REAL_ESTATE',
   Авто: 'AUTO',
   Продам: 'SELL',
}

export const SearchMainPage = () => {
   const { searchPublishes } = useSelector(state => state.main)
   const [searchValue, setSearchValue] = useState('')
   const [searchParams, setSearchParams] = useSearchParams()
   const { category, search, metro } = useMainCategoryParams()
   const dispatch = useDispatch()
   const { t } = useTranslation()

   const breadcrumbs = [
      { url: '/', title: t('user.searchMain.breadcrumbs.main') },
      { url: `/user/main.php`, title: category },
   ]

   useEffect(() => {
      const queryParams = serializeToQueryParams({
         titles: search,
         categories: CATEGORY_MAIN[category],
         metros: metro,
      })
      dispatch(searchCategoryAndMetroRequest(queryParams))
   }, [search, dispatch])

   const searchChangeHandler = e => {
      setSearchValue(e.target.value)
   }

   const handleSearchSubmit = () => {
      if (!searchValue) {
         searchParams.delete('search')
         setSearchParams(searchParams)
      } else {
         searchParams.set('search', searchValue)
         setSearchParams(searchParams)
      }
   }

   return (
      <Wrapper>
         <SEO
            title={category ? `Поиск: ${category}` : 'Поиск объявлений'}
            description={`Найдите объявления по категории ${category || ''} в России на Ulutman`}
            url="/user/main.php"
            noindex
         />
         <Container>
            <Block>
               <FirstBlock>
                  <Breadcrumbs path={breadcrumbs} />
               </FirstBlock>
               <SearchInput
                  placeholder={t('user.searchMain.inputPlaceholder')}
                  onChange={searchChangeHandler}
                  value={searchValue}
                  onClick={handleSearchSubmit}
               />
            </Block>
            <CategoryCard categories={searchPublishes} />
         </Container>
      </Wrapper>
   )
}

const FirstBlock = styled('div')({
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
})

const Container = styled('div')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',

   '.MuiPaper-root': {
      height: '64px',

      [theme.breakpoints.down('md')]: {
         height: '54px',
         '& > .button': {
            height: '54px',
            minWidth: '100px',
            display: 'flex',
            alignItems: 'center',
         },
      },
   },
}))

const Block = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
})

const Wrapper = styled('div')(({ theme }) => ({
   padding: '40px 60px 60px 60px',
   [theme.breakpoints.down('md')]: {
      padding: '0 16px 24px 16px',
   },
}))
