import { AxiosPromise, AxiosRequestConfig } from './types'
import { xhr } from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
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

function axios(config: AxiosRequestConfig): AxiosPromise {
  
  processConfig(config)
  return xhr(config)
}

export default axios
