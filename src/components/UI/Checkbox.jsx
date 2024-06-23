import { Checkbox } from '@mui/material';

export const CheckBox = ({ type, onChange, checked, ...props }) => {
   return (
      <Checkbox
         type={type}
         onChange={onChange}
         checked={checked}
         {...props}
         icon={
            <svg width="20" height="20" viewBox="0 0 24 24">
               <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  stroke="rgba(0, 0, 0, 0.6)"
                  strokeWidth="1"
                  fill="none"
               />
            </svg>
         }
         checkedIcon={
            <svg width="20" height="20" viewBox="0 0 24 24">
               <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  stroke="rgba(0, 0, 0, 0.6)"
                  strokeWidth="1"
                  fill="none"
               />
               <path
                  d="M5 13l4 4L19 7"
                  stroke="#282828"
                  strokeWidth="1"
                  fill="none"
                  strokeLinejoin="miter"
               />
            </svg>
         }
      />
   );
};
