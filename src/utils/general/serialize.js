export function serializeToQueryParams(obj) {
   return (
      '?' +
      Object.keys(obj)
         .filter(item => obj[item])
         .map(key => {
            const value = obj[key];
            if (Array.isArray(value)) {
               return value
                  .map(
                     val =>
                        `${encodeURIComponent(key)}=${encodeURIComponent(val)}`,
                  )
                  .join('&');
            } else {
               return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            }
         })
         .join('&')
   );
}
