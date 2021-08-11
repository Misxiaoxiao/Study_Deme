/**
 * 工具函数封装
 */
import { MenuItem, MenuRoutes } from '../type/MenuType'

export default {
  formateDate (date: Date | string, rule?: string) {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    let fmt = rule || 'yyyy-MM-dd hh:mm:ss'
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, String(date.getFullYear()))
    }
    const o: { [k: string]: number } = {
      // 'y+': date.getFullYear(),
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const val = o[k]
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? String(val)
            : ('00' + val).substr(String(val).length)
        )
      }
    }
    return fmt
  },
  generateRoute (menuList: MenuItem[]) {
    let routes: MenuRoutes[] = []
    const deepList = (list: MenuItem[]) => {
      while (list.length) {
        const item = list.pop()
        if (item?.action) {
          routes.push({
            name: item.component,
            path: item.path,
            meta: {
              title: item.menuName
            },
            component: item.component
          })
        }
        if (item?.children && !item.action) {
          deepList(item.children)
        }
      }
    }
    deepList(menuList)
    return routes
  }
}