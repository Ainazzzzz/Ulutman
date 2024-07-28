import { FormControlLabel, Radio, RadioGroup, styled } from '@mui/material';
import React from 'react';

const RadioButton = ({
   value,
   onChange,
   label,
   checked,
   options,
   type,
   ...props
}) => {
   return (
      <div>
         <FormControlLabel
            key={value}
            value={value}
            control={<StyledRadio />}
            label={label}
            labelPlacement="end"
            type={type}
         />
      </div>
   );
};

export default RadioButton;
const StyledRadio = styled(Radio)`
   &.Mui-checked {
      color: rgb(40, 40, 40);
   }
`;
