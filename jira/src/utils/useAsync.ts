import { useState, useCallback } from 'react'
import { useMountedRef } from 'utils'

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultConfig = {
  throwOnError: false
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })
  const mountedRef = useMountedRef()
  const [retry, setRetry] = useState(() => () => {})

  const setData = useCallback((data: D) => setState({
    data,
    stat: 'success',
    error: null
  }), [])

  const setError = useCallback((error: Error) => setState({
    data: null,
    stat: 'error',
    error
  }), [])

  // run 函数用来触发异步请求
  const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据')
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })
    setState(prevState => ({ ...prevState, stat: 'loading' }))
    return promise
      .then(data => {
        if (mountedRef.current)
          setData(data)
        return data
      })
      .catch(error => {
        setError(error)
        if (config.throwOnError)
          return Promise.reject(error)
        return error
      })
  }, [config.throwOnError, mountedRef, setData, setError])

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    retry,
    ...state
  }
}
