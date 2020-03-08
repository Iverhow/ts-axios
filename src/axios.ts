// 为了导出其它的接口，将原来index中的内容全部挪过来
import { AxiosPromise, AxiosRequestConfig, AxiosResponseConfig } from './types'
import { xhr } from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/header'

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)

}

function transformData(config: AxiosRequestConfig): string {
  const { data } = config
  return transformRequest(data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  // headers可能不存在，所以为其设置默认值{}
  const {headers = {}, data} = config
  return processHeaders(headers, data)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformData(config)
}

function transformResponseData(resp: AxiosResponseConfig): AxiosResponseConfig {
  resp.data = transformResponse(resp.data)
  return resp
}

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  // 在执行xhr后的then方法中能拿到response，试图将它的data转为json对象
  return xhr(config).then((resp) => transformResponseData(resp))
}

export default axios
