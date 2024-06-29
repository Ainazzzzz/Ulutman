import {
   Link,
   Breadcrumbs as MuiBreadcrumbs,
   Typography,
   styled,
} from '@mui/material';
import React from 'react';

const Breadcrumbs = ({ path }) => {
   return (
      <BreadcrumbsStyle>
         {path.map((crumb, index) => {
            const isLast = index === path.length - 1;

            return isLast ? (
               <CurrentPageStyle key={crumb.title}>
                  {crumb.title}
               </CurrentPageStyle>
            ) : (
               <LinkStyle key={crumb.title} href={crumb.url}>
                  {crumb.title}
               </LinkStyle>
            );
         })}
      </BreadcrumbsStyle>
   );
};

export default Breadcrumbs;

const BreadcrumbsStyle = styled(MuiBreadcrumbs)(({ theme }) => ({
   padding: theme.spacing(1),
}));

const LinkStyle = styled(Link)(() => ({
   color: '#909090',
   textDecoration: 'none',

   '&:hover': {
      color: '#7E52FF',
      textDecoration: 'underline',
   },
}));

const CurrentPageStyle = styled(Typography)(() => ({
   color: '#7E52FF',
   fontWeight: 400,
}));
