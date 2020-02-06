// 想限定method的类型，如get， post等，通过字面量实现
export type METHOD =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'patch'
  | 'PATCH'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'

export interface AxiosRequestConfig {
  url: string
  method?: METHOD
  data?: any
  params?: any
}
