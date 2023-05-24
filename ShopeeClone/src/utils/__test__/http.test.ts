import { beforeEach, describe, expect, it } from 'vitest'
import { Http } from '../http'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { setAccessTokenToLocalStorage, setRefreshTokenToLocalStorage } from '../auth'

describe('http axios', () => {
  let http = new Http().instance
  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })
  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzE5NTNmNmQ3YzYyMDM0MDg1YTI2NCIsImVtYWlsIjoibmhveG5ob2JlQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDUtMjRUMDM6NTE6MjMuODEyWiIsImlhdCI6MTY4NDkwMDI4MywiZXhwIjoxNjg0OTAwMjg0fQ.ZNdWijzU2PUleK0IQ1PULJ30rPgarfF-mvwWghO3UNM'
  const refresh_token_1000days =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzE5NTNmNmQ3YzYyMDM0MDg1YTI2NCIsImVtYWlsIjoibmhveG5ob2JlQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDUtMjRUMDM6NTQ6MjcuMDYzWiIsImlhdCI6MTY4NDkwMDQ2NywiZXhwIjoxNzcxMzAwNDY3fQ.yGOLIpesdkv7aaxWSx64LerVCT1sUMmpX_E9RaxjYA8'
  it('Gọi API', async () => {
    //Khong nen dung den thu muc API
    //Vi chung ta test rieng file http thi chi nen dung http thoi
    //Vi lo nhu thu muc API co thay doi gi do
    //Thi ta khong can thay doi lai file Test
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Auth Request', async () => {
    //Can co access_token
    //Nen co 1 account test va 1 Sever test
    await http.post('login', {
      email: 'nhoxnhobe@gmail.com',
      password: '123456'
    })
    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Refresh Token', async () => {
    //Can co 1 access_token het han va 1 refresh_token
    setAccessTokenToLocalStorage(access_token_1s)
    setRefreshTokenToLocalStorage(refresh_token_1000days)
    const httpNew = new Http().instance
    const res = await httpNew.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
