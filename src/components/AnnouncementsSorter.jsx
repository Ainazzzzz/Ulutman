import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Button, styled } from '@mui/material';
import ArrowsIcon from '../assets/icons/arrows.svg?react';

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
         <StyledButton
            id="basic-button"
            aria-controls={anchorEl ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? 'true' : undefined}
            onClick={handleClick}
         >
            <ArrowsIcon />

            {selectedValue}
         </StyledButton>

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

const StyledButton = styled(Button)(() => ({
   '&.MuiButton-colorPrimary': {
      width: '180px',
      backgroundColor: '#B8FF00',
      height: '39px',
      padding: '10px',
      display: 'flex',
      gap: '5px',
      borderRadius: '10px',
      fontSize: '13px',
      fontWeight: '500',
      lineHeight: '19.36px',
      color: '#282828',
      '&.Mui-disabled': {
         opacity: '0.5',
      },
   },
}));
