import { apiUrl } from './config'
import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/authContext'
import { useCallback } from 'react'

interface ConfigType extends RequestInit {
  data?: object;
  token?: string; 
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: ConfigType = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig
  }

  if (config.method?.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || [])
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    })
}

export const useHttp = () => {
  const { user } = useAuth()

  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, {...config, token: user?.token}),
      [user?.token]
  )
}
