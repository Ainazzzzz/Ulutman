import { styled } from '@mui/material';
import { green, red, orange } from '@mui/material/colors';
import WaitIcon from '../../../assets/icons/address-icon.svg?react';

export const getAdminTableHeaders = (handleOpenWaitingModal, columns) => {
   return columns.map(column => {
      if (column.accessor && column.accessor.toUpperCase() === 'STATUS') {
         return {
            ...column,
            Cell: ({ cell: { value } }) => {
               let color,
                  IconComponent = null;
               const upperValue = value ? value.toUpperCase() : '';

               switch (upperValue) {
                  case 'ОДОБРЕН':
                  case 'РЕШЕНО':
                  case 'АКТИВНЫЙ':
                  case 'АКТИВНО':
                     color = green[500];
                     break;
                  case 'ЗАБЛОКИРОВАН':
                  case 'ОТКЛОНЕН':
                  case 'НЕАКТИВНО':
                     color = red[500];
                     break;
                  case 'ОЖИДАЕТ':
                     color = orange[500];
                     IconComponent = WaitIcon;
                     break;
                  default:
                     color = 'inherit';
               }

               return (
                  <Block>
                     <MiniBlock
                        color={color}
                        onClick={
                           upperValue === 'ОЖИДАЕТ'
                              ? handleOpenWaitingModal
                              : undefined
                        }
                        clickable={upperValue === 'ОЖИДАЕТ'}
                     >
                        {value}
                     </MiniBlock>
                     {IconComponent && <IconComponent />}
                  </Block>
               );
            },
         };
      }

      return column;
   });
};

const Block = styled('div')({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'start',
   gap: '6px',
});

const MiniBlock = styled('div')(({ color, clickable }) => ({
   height: '29px',
   borderRadius: '4px',
   color: 'white',
   padding: '4px 20px',
   fontSize: '14px',
   fontWeight: '500',
   background: color,
   cursor: clickable ? 'pointer' : 'default',
}));
