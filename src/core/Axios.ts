import { AxiosPromise, AxiosRequestConfig, METHOD } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config)
  }

  // 无参数request请求
  _requestMethodWihoutData(method: METHOD, url: string, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method,
      url
    }))

  }

  // 有参数request请求
  _requestMethodWihData(method: METHOD, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data
    }))

  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    // get 方法实际上是对上面的参数做合并，并调用request
    return this._requestMethodWihoutData('get', url, config)

  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWihoutData('delete', url, config)

  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWihoutData('head', url, config)

  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWihoutData('options', url, config)

  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWihData('post', url, data, config)

  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWihData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWihData('patch', url, data, config)
  }
}
