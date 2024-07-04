import { useState } from 'react';
import { styled } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowsIcon from '../assets/icons/arrows.svg?react';
import { Button } from './UI/Button';

const AnnouncementsSorter = () => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [selectedValue, setSelectedValue] = useState('Все категории');

   const handleClick = event => setAnchorEl(event.currentTarget);

   const handleClose = value => {
      setAnchorEl(null);
      setSelectedValue(value || selectedValue);
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
            <MenuItem onClick={() => handleClose('По умолчанию')}>
               Все категории
            </MenuItem>

            <MenuItem onClick={() => handleClose('Сначало новые')}>
               Авиамоторная
            </MenuItem>

            <MenuItem onClick={() => handleClose('Сначало дешевле')}>
               Сначало дешевле
            </MenuItem>

            <MenuItem onClick={() => handleClose('Сначало дороже')}>
               Сначало дороже
            </MenuItem>
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
      left: '0 !important',
   },
}));
const ButtonStyle = styled(Button)(({ theme }) => ({
   [theme.breakpoints.down('md')]: {
      width: '150px',
   },
}));
