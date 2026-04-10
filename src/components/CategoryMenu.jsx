import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { styled, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Button } from './UI/Button'
import MenuIcon from '../assets/icons/menu.svg?react'
import { CATEGORY_MENU } from '../utils/constants'

const CategoryMenu = ({ selectedCategory, setSelectedCategory }) => {
   const [categorySearchText, setCategorySearchText] = useState('')
   const [anchorEl, setAnchorEl] = useState(null)
   const { t } = useTranslation()

   const handleClick = event => setAnchorEl(event.currentTarget)

   const handleClose = value => {
      setAnchorEl(null)
      setSelectedCategory(value)
   }

   const handleCloseFn = () => handleClose(t('user.home.banner.form.category'))

   const handleCategorySearch = e => setCategorySearchText(e.target.value)

   const transformedCategoryMenu = CATEGORY_MENU.map(item => {
      return {
         ...item,
         label: t(`user.home.banner.form.category-menu.${item.value}`),
      }
   })

   return (
      <>
         <Button
            variant="sort"
            id="basic-button"
            aria-controls={anchorEl ? 'basic-menu' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
         >
            {selectedCategory}
            <MenuIcon />
         </Button>

         <StyledMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseFn}
            MenuListProps={{
               'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'left',
            }}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'left',
            }}
         >
            <StyledInput
               value={categorySearchText}
               onChange={handleCategorySearch}
               variant="outlined"
            />
            {transformedCategoryMenu.map(option => (
               <MenuItem
                  key={option.id}
                  onClick={() => handleClose(option.label)}
               >
                  {option.label}
               </MenuItem>
            ))}
         </StyledMenu>
      </>
   )
}

export default CategoryMenu

const StyledMenu = styled(Menu)(() => ({
   '& .MuiList-padding ': {
      padding: '3px',
   },

   '& .MuiPopover-paper': {
      borderRadius: '10px',
   },
}))

const StyledInput = styled(TextField)(() => ({
   '& .MuiOutlinedInput-root': {
      width: '200px',
      height: '42px',
      borderRadius: '10px',
      border: 'none ',
   },
}))
