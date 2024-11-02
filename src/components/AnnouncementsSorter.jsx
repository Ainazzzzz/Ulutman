import { useState } from 'react';
import { styled } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowsIcon from '../assets/icons/arrows.svg?react';
import { Button } from './UI/Button';

const AnnouncementsSorter = ({ onSortChange, options = [] }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [selectedValue, setSelectedValue] = useState('Все категории');

   const handleClick = event => setAnchorEl(event.currentTarget);

   const handleClose = option => {
      setAnchorEl(null);
      if (option) {
         const newValue = option.label || selectedValue;
         setSelectedValue(newValue);
         onSortChange(option.value);
      }
   };

   return (
      <>
         <ButtonStyle
            variant="category-sort"
            id="basic-button"
            aria-controls={anchorEl ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? 'true' : undefined}
            onClick={handleClick}
         >
            {selectedValue}

            <ArrowsIcon />
         </ButtonStyle>

         <StyledMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleClose(null)}
            MenuListProps={{
               'aria-labelledby': 'basic-button',
            }}
         >
            {options.map(option => (
               <MenuItem key={option.value} onClick={() => handleClose(option)}>
                  {option.label}
               </MenuItem>
            ))}
         </StyledMenu>
      </>
   );
};

export default AnnouncementsSorter;

const StyledMenu = styled(Menu)(() => ({
   '& .MuiList-padding ': {
      padding: '3px',
   },

   '& .MuiPopover-paper': {
      borderRadius: '10px',
   },
}));
const ButtonStyle = styled(Button)(({ theme }) => ({
   [theme.breakpoints.down('md')]: {
      width: '150px',
   },
}));
