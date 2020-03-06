import { AxiosPromise, AxiosRequestConfig, AxiosResponseConfig } from './types'
import { parseHeaders } from './helpers/header'

// xhr的返回类型从void 变成AxiosPromise，因为有实际的返回类型
// 有可能请求中发生异常，因此添加reject
export function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // 只有url为必传参数，method不传时为get，data不传时为null
    // headers 不可能为空
    const { url, method = 'get', data = null, headers, responseType, timeout } = config
    // 实例化XMLHttpRequest
    const request = new XMLHttpRequest()
    // 如果config中有responseType，将它设置给request
    if (responseType) {
      request.responseType = responseType
    }
    // 如果有超时时间，则设置给timeout
    if (timeout) {
      request.timeout = timeout
    }
    // 调用open方法，异步
    request.open(method.toUpperCase(), url, true)
    // 检查readystatus
    request.onreadystatechange = function handleLoad() {
      // 如果readyStatus不等于4说明请求还没结束
      if (request.readyState !== 4) {
        return
      }

      // 如果request.status 为0，说明超时或者遇到异常
      if (request.status === 0) {
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
      // 但是这里不一定是成功的，所以使用handleResponse替换resolve(repsonse)
      // resolve(response)
      handleResponse(response)
    }

    // 出错时调用reject
    request.onerror = function handleError() {
      reject(new Error('Network error'))
    }
    // 处理超时逻辑
    request.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of ${timeout} exceeded`))
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

    function handleResponse(response: AxiosResponseConfig): void {
      if (response.status >= 200 && response.status < 300) {
        // 状态码为2xx，仍然是成功的
        resolve(response)
      } else {
        reject(new Error(`Request failed with the status code ${response.status}`))
      }
    }
  })

}
