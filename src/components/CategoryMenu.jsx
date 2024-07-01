import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Button } from './UI/Button';
import MenuIcon from '../assets/icons/menu.svg?react';
import { CATEGORY_MENU } from '../utils/constants';
import { styled, TextField } from '@mui/material';

const CategoryMenu = () => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [selectedCategory, setSelectedCategory] = useState('По умолчанию');
   const [categorySearchText, setCategorySearchText] = useState('');

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
            open={anchorEl}
            onClose={handleCloseFn}
            MenuListProps={{
               'aria-labelledby': 'basic-button',
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
      left: '0 !important',
   },
}));

const StyledInput = styled(TextField)(() => ({
   '& .MuiOutlinedInput-root': {
      width: '200px',
      height: '42px',
      borderRadius: '10px',
      border: 'none ',
      opacity: '0px',
   },
}));
