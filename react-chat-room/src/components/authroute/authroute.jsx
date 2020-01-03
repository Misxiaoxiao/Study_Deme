import React, { useEffect, useCallback, memo } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UserTypes from 'reducer/user/dispatch.type';

const Authroute = (props) => {
  const dispatch = useDispatch()

  const uploadUser = useCallback(
    (user) => dispatch({
      type: UserTypes.LOAD_DATA,
      payload: {
        user
      }
    }),
    [dispatch]
  )

  useEffect(() => {
    const publicList = ['/login', 'register'];
    const pathName = props.location.pathName;

    if (publicList.indexOf(pathName) > -1) {
      return null
    } else {
      uploadUser('joker')
    }
  })

  return <div />
}

export default withRouter(memo(Authroute));
