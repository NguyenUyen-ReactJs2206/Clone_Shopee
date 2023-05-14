import { describe, expect, it } from 'vitest'
import { setAccessTokenToLocalStorage, setProfileToLocalStorage, setRefreshTokenToLocalStorage } from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWJiZGE0MWZhN2Q2MDMzOGJmYjM0ZSIsImVtYWlsIjoibmhveEBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTE0VDA0OjI5OjE5Ljg4M1oiLCJpYXQiOjE2ODQwMzg1NTksImV4cCI6MTY4NDI5Nzc1OX0.xAmttImWZ13raGdF-8sl6b9uT-ebNRwUPrOici4igvQ'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWJiZGE0MWZhN2Q2MDMzOGJmYjM0ZSIsImVtYWlsIjoibmhveEBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTE0VDA0OjExOjM2LjEyNFoiLCJpYXQiOjE2ODQwMzc0OTYsImV4cCI6MTY4NDA0MTA5Nn0.6boYOD1Z6o30X5B6V7C3DMX4phl-EBeY_1GjMXUybQM'

const profile =
  '{"_id":"645bbda41fa7d60338bfb34e","roles":["User"],"email":"nhox@gmail.com","createdAt":"2023-05-10T15:52:04.498Z","updatedAt":"2023-05-14T04:29:43.915Z","address":"dc","date_of_birth":"2018-10-09T17:00:00.000Z","name":"Uyen","phone":"123456789","avatar":"459aa92d-b3ff-4b86-8c74-3a24e418db72.jpg"}'

describe('setAccessTokenToLocalStorage', () => {
  it('access_token được set vao localStorage', () => {
    setAccessTokenToLocalStorage(access_token)
    expect(localStorage.getItem('access_token')).toBe(access_token)
  })
})

describe('refresh_token', () => {
  it('refresh_token được set vào localStorage', () => {
    setRefreshTokenToLocalStorage(refresh_token)
    expect(localStorage.getItem('refresh_token')).toEqual(refresh_token)
  })
})

// Phai setAccessTokenToLocalStorage roi moi test de khong phu thuoc cai setAccessTokenToLocalStorage o tren
describe('getAccessTokenFromLocalStorage', () => {
  it('Lấy access_token', () => {
    setAccessTokenToLocalStorage(access_token)
    expect(localStorage.getItem('access_token')).toEqual(access_token)
  })
})

describe('getRefreshTokenFromLocalStorage', () => {
  it('Lấy refresh_token', () => {
    setAccessTokenToLocalStorage(refresh_token)
    expect(localStorage.getItem('refresh_token')).toEqual(refresh_token)
  })
})

describe('setProfileToLocalStorage', () => {
  it('Lấy profile', () => {
    setProfileToLocalStorage(profile as any)
    expect(localStorage.getItem('profile')).toEqual(JSON.stringify(profile))
  })
})

describe('getProfileFromLocalStorage', () => {
  it('Lấy refresh_token', () => {
    setProfileToLocalStorage(profile as any)
    expect(localStorage.getItem('profile')).toEqual(JSON.stringify(profile))
  })
})
