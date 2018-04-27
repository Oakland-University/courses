import Cache from 'i18next-localstorage-cache'
import Fetch from 'i18next-fetch-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import i18n from 'i18next'

const translateURL = 'http://localhost:8082/locales/{{lng}}/{{ns}}.json'

i18n
  .use(Fetch)
  .use(Cache)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    // have a common namespace used around the full app
    ns: ['view'],
    defaultNS: 'view',

    load: 'all',
    backend: {
      loadPath: translateURL
    },
    interpolation: {
      formatSeparator: ',',
      format: function(value, format, lng) {
        if (Object.is(format, 'uppercase')) {
          return value.toUpperCase()
        } else {
          return value
        }
      }
    }
  })

export default i18n
