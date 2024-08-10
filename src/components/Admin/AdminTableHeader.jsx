import { styled } from '@mui/material';
import { green, red, orange } from '@mui/material/colors';
import Wait from '../../assets/icons/address-icon.svg?react';

export const getAdminTableHeaders = (handleOpenWaitingModal, columns) => {
   return columns.map(column => {
      if (column.accessor === 'status') {
         return {
            ...column,
            Cell: ({ cell: { value } }) => {
               let color, Icon;

               switch (value) {
                  case 'Одобрен':
                     color = green[500];
                     break;
                  case 'Отклонен':
                     color = red[500];
                     break;
                  case 'Ожидает':
                     color = orange[500];
                     Icon = Wait;
                     break;
                  default:
                     color = 'inherit';
                     Icon = null;
               }

               return (
                  <Block>
                     <MiniBlock
                        color={color}
                        onClick={
                           value === 'Ожидает'
                              ? handleOpenWaitingModal
                              : undefined
                        }
                     >
                        {value}
                     </MiniBlock>
                     {Icon && <Icon />}
                  </Block>
               );
            },
         };
      }

      return column;
   });
};

const Block = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '6px',
}));

const MiniBlock = styled('div')(({ color }) => ({
   width: '108px',
   height: '29px',
   borderRadius: '4px',
   color: 'white',
   padding: '4px 20px 0px 20px',
   fontSize: '14px',
   fontWeight: '500',
   background: color,
   cursor: 'pointer',
}));
