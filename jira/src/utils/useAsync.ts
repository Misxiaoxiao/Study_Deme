import { useState, useCallback, useReducer } from 'react'
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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()

  return useCallback(
    (...args:T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  )
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({
    ...state,
    ...action
  }), {
    ...defaultInitialState,
    ...initialState
  })

  const safeDispatch = useSafeDispatch(dispatch)
  const [retry, setRetry] = useState(() => () => {})

  const setData = useCallback(
    (data: D) => safeDispatch({
      data,
      stat: 'success',
      error: null
    }
  ), [safeDispatch])

  const setError = useCallback(
    (error: Error) => safeDispatch({
      data: null,
      stat: 'error',
      error
    }
  ), [safeDispatch])

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
    safeDispatch({ stat: 'loading' })
    return promise
      .then(data => {
        setData(data)
        return data
      })
      .catch(error => {
        setError(error)
        if (config.throwOnError)
          return Promise.reject(error)
        return error
      })
  }, [config.throwOnError, setData, setError, safeDispatch])

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
