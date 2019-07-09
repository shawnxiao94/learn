import Vue from 'vue'
import VueI18n from 'i18n'
import storeF from 'dataF/store'
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  }
}
const i18n = new VueI18n({
  locale: storeF.getters.app.language,
  messages
})

export default i18n
