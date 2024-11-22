import { useSearchParams } from 'react-router-dom'

export const useMainCategoryParams = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const onCloseCategory = () => {
      setSearchParams({})
   }

   const search = searchParams.get('search') || ''
   const category = searchParams.get('category')
   const metro = searchParams.get('metro')

   return { search, category, metro, onCloseCategory }
}
