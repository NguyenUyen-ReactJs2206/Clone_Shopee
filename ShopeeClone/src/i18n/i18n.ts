import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_VI from 'src/locales/vi/product.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    //Goi la namespace
    // translation: {
    //   'all categories': 'All Categories',
    //   'filter search': 'Filter Search'
    // }
    home: HOME_EN,
    product: PRODUCT_EN
  },
  vi: {
    // translation: {
    //   'all categories': 'Tất cả danh mục',
    //   'filter search': 'Bộ lọc tìm kiếm'
    // }
    home: HOME_VI,
    product: PRODUCT_VI
  }
}
//chung ta ko co truyen name space (ns) se lay ns default
export const defaultNS = 'product'

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  defaultNS,
  ns: ['home', 'product'],
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false
  }
})
