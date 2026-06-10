import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://ulutman.com'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`
const SITE_NAME = 'Ulutman'

const SEO = ({
   title,
   description,
   image = DEFAULT_IMAGE,
   url,
   type = 'website',
   noindex = false,
}) => {
   const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — объявления в России`
   const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL

   return (
      <Helmet>
         <title>{fullTitle}</title>
         {description && <meta name="description" content={description} />}
         <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
         <link rel="canonical" href={fullUrl} />

         <meta property="og:title" content={fullTitle} />
         {description && <meta property="og:description" content={description} />}
         <meta property="og:url" content={fullUrl} />
         <meta property="og:type" content={type} />
         <meta property="og:image" content={image} />

         <meta name="twitter:title" content={fullTitle} />
         {description && <meta name="twitter:description" content={description} />}
         <meta name="twitter:image" content={image} />
      </Helmet>
   )
}

export default SEO
