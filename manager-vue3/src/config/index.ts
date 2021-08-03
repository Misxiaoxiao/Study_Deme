// 环境配置
type Env = 'dev' | 'test' | 'prod'
const env: Env = import.meta.env.MODE as Env || 'prod'
const EnvConfig = {
  dev: {
    baseApi: '/api',
    // mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
    mockApi: 'https://www.fastmock.site/mock/f9fac76a10c5aafab8959d066ab59057/api'
  },
  test: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/f9fac76a10c5aafab8959d066ab59057/api'
  },
  prod: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/f9fac76a10c5aafab8959d066ab59057/api'
  }
} as const
export default {
  env,
  mock: true,
  namespace: 'manager',
  ...EnvConfig[env]
}
