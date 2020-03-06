import { AxiosRequestConfig, AxiosResponseConfig } from '../types'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponseConfig

  constructor(message: string,
              config: AxiosRequestConfig,
              code?: string | null,
              request?: any,
              response?: AxiosResponseConfig
  ) {
    super(message)
    this.isAxiosError = true
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    // 不设置这个可能会无法调用
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponseConfig
): AxiosError {
  return new AxiosError(message, config, code, request, response)
}
