import axios, { AxiosError, InternalAxiosRequestConfig, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type'
import {
  clearLocalStorage,
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setProfileToLocalStorage,
  setRefreshTokenToLocalStorage
} from './auth'
import config from 'src/constants/config'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'

// Purchase: 1s - 3s error
// Me: 2s - 5s
// RefreshToken ch Purchase: 3s - 4s
// Goi lai Purchase: 4s - 6s
// RefreshToken moi cho Me: 5s - 6s
// Goi lai Me tu giay so 6
export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    // ?? tại sao thay vì chỉ cần dùng hàm getAccessTokenFromLS để lấy được accessToken rồi, ta lại còn phải khai báo accessToken ở trong
    // ?? class constructor để làm gì nữa ?
    // * vì khi ta dùng getAccessTokenFromLS là ta truy xuất dữ liệu ở LS, mà làm như vậy là truy xuất vào trong ổ cứng
    // * còn ta khai báo biến accessToken trong constructor thì dữ liệu được truy xuất trên ram
    // * MÀ TRUY XUẤT Ở RAM THÌ LẠI NHANH HƠN Ổ CỨNG
    this.accessToken = getAccessTokenFromLocalStorage()
    this.refreshToken = getRefreshTokenFromLocalStorage()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 259200, //60*60*24*3 - 3 ngay
        'expire-refresh-token': 2592000 //30 ngay
      }
    })
    //
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    //Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          //Lưu vào local Storange
          setAccessTokenToLocalStorage(this.accessToken)
          setRefreshTokenToLocalStorage(this.refreshToken)
          setProfileToLocalStorage(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        //Chi toast loi khong phai la 422 va 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        //Loi 401 co rat nhieu truong hop xay ra:
        //-Token khong dung
        //-Khong truyen Token
        //-Token het han*

        //Neu la loi 401
        if (isAxiosUnauthorizedError(error)) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)

          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const { url } = config
          //Truong hop Token het han va Refresh do khong phai la cua request refresh token
          //Thi chung ta moi tien hanh goi Refresh Token

          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            //Han che goi 2 lan handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  //Giu refreshTokenRequest trong 10s cho nhung request tiep theo neu co 401 thi dung
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              if (config.headers) config.headers.authorization = access_token
              //Nghia la chung ta tiep tuc goi lai request cu vua bi loi
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }
          clearLocalStorage()
          this.accessToken = ''
          this.refreshToken = ''
          //F5 lai :  window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLocalStorage(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearLocalStorage()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance

export default http
