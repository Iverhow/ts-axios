import { AxiosRequestConfig } from './types'

export function xhr(config: AxiosRequestConfig): void {
  // 只有url为必传参数，method不传时为get，data不传时为null
  const { url, method = 'get', data = null } = config
  // 实例化XMLHttpRequest
  const request = new XMLHttpRequest()
  // 调用open方法，异步
  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
