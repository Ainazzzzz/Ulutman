import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Button } from './UI/Button';
import MenuIcon from '../assets/icons/menu.svg?react';
import { CATEGORY_MENU } from '../utils/constants';
import { styled, TextField } from '@mui/material';

const CategoryMenu = () => {
   const [selectedCategory, setSelectedCategory] = useState('По умолчанию');
   const [categorySearchText, setCategorySearchText] = useState('');
   const [anchorEl, setAnchorEl] = useState(null);

   const handleClick = event => setAnchorEl(event.currentTarget);

   const handleClose = value => {
      setAnchorEl(null);
      setSelectedCategory(value || selectedCategory);
   };

   const handleCloseFn = () => handleClose(null);

   const handleCategorySearch = e => setCategorySearchText(e.target.value);

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
            {CATEGORY_MENU.map(option => (
               <MenuItem
                  key={option.id}
                  onClick={() => handleClose(option.label)}
               >
                  {option.label}
               </MenuItem>
            ))}
         </StyledMenu>
      </>
   );
};

export default CategoryMenu;

const StyledMenu = styled(Menu)(() => ({
   '& .MuiList-padding ': {
      padding: '3px',
   },

   '& .MuiPopover-paper': {
      borderRadius: '10px',
   },
}));

const StyledInput = styled(TextField)(() => ({
   '& .MuiOutlinedInput-root': {
      width: '200px',
      height: '42px',
      borderRadius: '10px',
      border: 'none ',
   },
}));
