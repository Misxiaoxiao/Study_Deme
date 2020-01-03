import React, { useState, useCallback } from 'react';

const hocForm = (Com) => {
  return (props) => {
    const [ state, setState ] = useState({})

    const handleChange = useCallback(
      (key, val) => {
        setState(state => {
          const obj = {}
          obj[key] = val
          return { ...state, ...obj }
        })
      },
      [setState]
    )

    return <Com handleChange={handleChange} state={state} {...props} />
  }
}

export default hocForm
