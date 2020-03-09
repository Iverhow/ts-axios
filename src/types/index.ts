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
  params?: any,
  headers?: any,
  responseType?: XMLHttpRequestResponseType,
  timeout?: number // 超时时间
}

// 响应对象
export interface AxiosResponseConfig {
  data: any,
  status: number,
  statusText: string,
  headers: any,
  config: AxiosRequestConfig,
  // xhr对象
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponseConfig> {
}

// 这里的接口是为了导出给外面用
export interface AxiosError extends Error {
  isAxiosError: boolean,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponseConfig
}

// 便于外部调用，提供接口
export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosResponseConfig

}

