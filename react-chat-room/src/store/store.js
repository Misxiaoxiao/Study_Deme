import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import AllReducer from 'reducer/index';

export default () => {
  const store = createStore(
    AllReducer,
    compose(
      applyMiddleware(ReduxThunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  return store
}
