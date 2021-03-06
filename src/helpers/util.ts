// 多处会使用Object.prototype.toString, 因此先缓存它
const toString = Object.prototype.toString
// 使用类型保护参数
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   // 如果val为null val === object 返回true
//   // 因此需要判断他是否为null
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: any): val is Object {
  // 判断val是否为普通对象
  return toString.call(val) === '[object Object]'
}

// 将from的属性全部赋给to
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}


