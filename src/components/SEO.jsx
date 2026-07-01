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
   schema,
}) => {
   const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} — объявления в Кыргызстане`
   const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL

   const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: BASE_URL,
      description: 'Доска объявлений в Кыргызстане',
      potentialAction: {
         '@type': 'SearchAction',
         target: `${BASE_URL}/user/search?search={search_term_string}`,
         'query-input': 'required name=search_term_string',
      },
   }

   return (
      <Helmet>
         <title>{fullTitle}</title>
         {description && <meta name="description" content={description} />}
         <meta
            name="robots"
            content={noindex ? 'noindex, nofollow' : 'index, follow'}
         />
         <link rel="canonical" href={fullUrl} />

         <meta property="og:title" content={fullTitle} />
         {description && (
            <meta property="og:description" content={description} />
         )}
         <meta property="og:url" content={fullUrl} />
         <meta property="og:type" content={type} />
         <meta property="og:image" content={image} />
         <meta property="og:site_name" content={SITE_NAME} />
         <meta property="og:locale" content="ru_KG" />

         <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:title" content={fullTitle} />
         {description && (
            <meta name="twitter:description" content={description} />
         )}
         <meta name="twitter:image" content={image} />

         <script type="application/ld+json">
            {JSON.stringify(schema || defaultSchema)}
         </script>
      </Helmet>
   )
}

export default SEO
