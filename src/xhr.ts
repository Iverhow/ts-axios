import { AxiosPromise, AxiosRequestConfig } from './types'
import { parseHeaders } from './helpers/header'

// xhr的返回类型从void 变成AxiosPromise，因为有实际的返回类型
export function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve) => {
    // 只有url为必传参数，method不传时为get，data不传时为null
    // headers 不可能为空
    const { url, method = 'get', data = null, headers, responseType } = config
    // 实例化XMLHttpRequest
    const request = new XMLHttpRequest()
    // 如果config中有responseType，将它设置给request
    if (responseType) {
      request.responseType = responseType
    }
    // 调用open方法，异步
    request.open(method.toUpperCase(), url, true)
    // 检查readystatus
    request.onreadystatechange = function handleLoad() {
      // 如果readyStatus不等于4说明请求还没结束
      if (request.readyState !== 4) {
        return
      }
      // 如果readyStatus为4，开始构造response对象
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      // 根据responseType确定responseData
      const responseData = request.responseType === 'text' ? request.responseText : request.response
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config, // es6 解构写法
        request
      }
      // 通过resolve，return的new Promise 的 then方法中可以取到response
      resolve(response)
    }
    // open方法之后设置headers
    Object.keys(headers).forEach((name) => {
      // 如果data为null并且还包含content-type的话，将其删除
      // 反之，将其设在headers中
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })

}
