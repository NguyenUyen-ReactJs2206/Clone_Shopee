//Khai bao type cho i18next
// de khoi loi typescript
import 'i18next'
import { defaultNS, resources } from 'src/i18n/i18n'

declare module 'i18next' {
  //Ke thua (them vao type)
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    //ngon ngu mac dinh la vi
    resources: (typeof resources)['vi']
  }
}
