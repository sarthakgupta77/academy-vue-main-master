import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { LocalStorage } from 'quasar'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const api = axios.create({ baseURL: 'https://genesis.datatrained.com/api' })

const formApi = axios.create({ baseURL: 'https://forms.datatrained.com/api' })

const api2 = axios.create({
  baseURL: 'https://genesis.datatrained.com/api',
  headers: {
    Authorization: 'Bearer '+ LocalStorage.getItem('token')
  }
})

const chatApi = axios.create({
  baseURL: 'https://test.support.datatrained.org',
  headers: {
    merchant_id: 'OW8evwBLm9Y9WVs73cjkFwiqSoguIWaHkBSk7XMPk'
  }
})

const edApi = axios.create({
  baseURL: 'https://datatrained-api.edmingle.com/nuSource/api/v1' ,
  headers: {
    apikey: "15edc851f06eef18927e8a4c1750f5e8",
    ORGID: 702
  }
})
const stuApi = axios.create({
  baseURL: 'https://datatrained-api.edmingle.com/nuSource/api/v1' ,
  headers: {
    apikey: LocalStorage.getItem('stu_edkey'),
    ORGID: 702
  }
})
// const edApi = axios.create({
//   baseURL: 'https://datatrained-api.edupanion.com/nuSource/api/v1' ,
//   headers: {
//     apikey: "ad0c1197cf5bbb7b8b9cc6cbe80d648c",
//     ORGID: 702
//   }
// })
// const stuApi = axios.create({
//   baseURL: 'https://datatrained-api.edupanion.com/nuSource/api/v1' ,
//   headers: {
//     apikey: LocalStorage.getItem('stu_key'),
//     ORGID: 702
//   }
// })

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  app.config.globalProperties.$edApi = edApi
  app.config.globalProperties.$edApi = stuApi
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api, api2, chatApi, edApi, stuApi, formApi }
