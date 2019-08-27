import { createStore, compose, applyMiddleware } from 'redux'
// @ts-ignore
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'

// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
import { connectRouter, routerMiddleware } from 'connected-react-router'

// @ts-ignore
import createRootReducer from '../reducers'

export const history = createBrowserHistory()
const connectRouterHistory = connectRouter(history)

function configureStoreProd(initialState : object) : object {
  const reactRouterMiddleware = routerMiddleware(history)
  const middlewares = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunk,
    reactRouterMiddleware
  ]

  return createStore(
    // @ts-ignore
    createRootReducer(history), // root reducer with router state
    initialState,
    compose(applyMiddleware(...middlewares))
  )
}

function configureStoreDev(initialState : object) : object {
  const reactRouterMiddleware = routerMiddleware(history)
  const middlewares = [
    // Add other middleware on this line...

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunk,
    reactRouterMiddleware
  ]

  // @ts-ignore
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // add support for Redux dev tools
  const store = createStore(
    //@ts-ignore
    createRootReducer(history), // root reducer with router state
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  // @ts-ignore
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    // @ts-ignore
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default // eslint-disable-line global-require
      // @ts-ignore
      store.replaceReducer(connectRouterHistory(nextRootReducer))
    })
  }

  return store
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev

export default configureStore
