import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserTypes from 'reducer/user/dispatch.type';

const Authroute = (props) => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()

  const uploadUser = useCallback((user) => dispatch({
    type: UserTypes.LOAD_DATA,
    payload: {
      user
    }
  }), [dispatch])

  useEffect(() => {
    console.log('authroute init')
    console.log(user)
    const publicList = ['/login', 'register'];
    const pathName = props.location.pathName;

    if (publicList.indexOf(pathName) > -1) {
      return null
    } else {
      uploadUser('joker')
    }
  }, [])

  return <div />
}

export default withRouter(Authroute);
