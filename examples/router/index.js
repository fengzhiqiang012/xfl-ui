import Vue from 'vue'
import VueRouter from 'vue-router'
import { last, dropRight } from 'lodash'

Vue.use(VueRouter)
const importAll = r => r.keys()
  .map(key => key.slice(2)
    .replace('.vue', '').split('/'))
const pages = importAll(require.context('../views', true, /\.vue$/))
console.log(pages)
// 获取path
const getPath = (pathArray) => {
  let result = ''
  // 处理动态路由
  const data = pathArray.map(item => {
    if (item.startsWith('_')) return item.replace('_', ':')
    return item
  })
  const lastItem = last(data)
  console.log(lastItem)
  // 如果组件是index
  if (lastItem === 'index') {
    result = `/${dropRight(data, 1).join('/')}`
  } else {
    result = `/${data.join('/')}`
  }
  return result
}
const routes = pages.map((item) => {
  const path = getPath(item)
  // 得到组件
  const component = () => require(`../views/${item.join('/')}.vue`)
  console.log(`../views/${item.join('/')}.vue`)
  return {
    path,
    component: component().default,
    name: item.join('_').toUpperCase(),
    meta: component().config || {}
  }
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
