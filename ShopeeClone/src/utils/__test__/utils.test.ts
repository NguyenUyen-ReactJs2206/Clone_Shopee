import { AxiosError } from 'axios'
import { describe, expect, it, test } from 'vitest'
import { demo, isAxiosError, isAxiosUnprocessableEntityError } from '../utils'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

// describe dùng để mô tả tập hợp các ngữ cảnh
// hoặc 1 đơn vị cần test: Ví dụ function, component
describe('isAxiosError', () => {
  // it dùng để ghi chú trường hợp cần test
  it('isAxiosError trả về boolean')
  // expect dùng để mong đợi giá trị trả về
  expect(isAxiosError(new Error())).toBe(false)
  expect(isAxiosError(new AxiosError())).toBe(true)
})

describe('isAxiosUnprocessableEntityError', () => {
  it('isAxiosUnprocessableEntityError trả về boolean')
  // status khac 422 thi tra ve false
  expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)
  expect(
    isAxiosUnprocessableEntityError(
      new AxiosError(undefined, undefined, undefined, undefined, {
        status: HttpStatusCode.InternalServerError,
        data: null
      } as any)
    )
  ).toBe(false)
  // mong muon status 422 thi tra ve true
  expect(
    isAxiosUnprocessableEntityError(
      new AxiosError(undefined, undefined, undefined, undefined, {
        status: HttpStatusCode.UnprocessableEntity,
        data: null
      } as any)
    )
  ).toBe(true)
})

//test === it
describe('demo', () => {
  test('demo return 2', () => {})
  expect(demo(4)).toBe(2)
})
