import React, { useState } from 'react';

const hocForm = (Com) => {
  return (props) => {
    const [ state, setState ] = useState({})

    const handleChange = (key, val) => {
      setState(state => {
        state[key] = val
        return state
      })
    }
    return <Com handleChange={handleChange} state={state} {...props} />
  }
}

export default hocForm
