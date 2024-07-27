import { styled } from '@mui/material';
import CameraAltIcon from '../../assets/icons/camera-icon.svg?react';
import { Button } from '../UI/Button';

export const WrapperInputSelect = styled('div')(({ theme }) => ({
   width: '327px',
   display: 'flex',
   flexDirection: 'column',
   gap: '24px',
   padding: '24px 0 20px 0',
   [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: '15px',
   },
   '.MuiFormControl-root': {
      gap: '0',
   },
   label: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '8px',
   },
}));

export const StyledDropzone = styled('div')(() => ({
   width: '255px',
}));
export const InputFile = styled('input')({
   display: 'none',
});

export const CameraIcon = styled(CameraAltIcon)({
   fontSize: 48,
   color: '#777',
});

export const Container = styled('div')(({ theme }) => ({
   width: '100%',
   position: 'relative',
   [theme.breakpoints.down('md')]: {
      '.MuiInputBase-root': {
         width: '100%',
      },
   },
   '.container-error': {
      display: 'flex',
      justifyContent: 'center',
   },

   '.close': {
      position: 'absolute',
      top: '-12px',
      right: '-28px',
      cursor: 'pointer',
   },
}));

export const Label = styled('label')(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   flexDirection: 'column-reverse',

   gap: '15px',
   width: '255px',
   height: '199px',
   borderRadius: '4px',
   cursor: 'pointer',
   background: '#7E52FF1A',

   position: 'relative',

   b: {
      color: '#282828',
      fontWeight: '600',
   },
   p: {
      width: '215px',
      textAlign: 'center',
      color: '#909090',
      fontSize: '14px',
      fontWeight: '400',
   },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
   width: '144px',
   marginTop: '30px',
   [theme.breakpoints.down('md')]: {
      width: '100%',
      maxWidth: '343px',
   },
}));

export const StyledWriting = styled('textarea')(({ theme }) => ({
   width: '617px',
   height: '122px',
   fontSize: '18px',
   fontWeight: '400',
   color: '#909090',
   padding: '10px',
   border: '1px solid #CFCFCF',
   borderRadius: '10px',
   background: 'transparent',
   resize: 'none',
   marginTop: '8px',
   [theme.breakpoints.down('md')]: {
      width: '326px',
      height: '154px',
      '::placeholder': {
         fontSize: '18px',
         fontWeight: '400',
      },
   },
   '&:hover': {
      border: '1px solid #282828',
   },
   '&:focus': {
      border: '1px solid #7e52ff',
   },
}));

export const ErrorMessage = styled('div')(() => ({
   color: 'red',
   fontSize: '14px',
   fontWeight: '300',
   position: 'absolute',
}));

export const DownloadTitle = styled('p')(({ theme }) => ({
   fontSize: '18px !important',
   fontWeight: '600',
   marginBottom: '8px',
   [theme.breakpoints.down('md')]: {
      fontSize: '14px',
   },
}));

export const ImagePreview = styled('img')(() => ({
   width: '100%',
   height: 'fit-content',
   objectFit: 'cover',
   marginTop: '10px',
   paddingTop: '20px',
}));
