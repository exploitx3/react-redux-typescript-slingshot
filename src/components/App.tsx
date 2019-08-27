/* eslint-disable import/no-named-as-default */
import {NavLink, Route, Switch} from 'react-router-dom'
// import styled, { keyframes } from 'styled-components'

// import Header from './stateless/Header/Header'
// import HomePage from './stateless/HomePage/HomePage'
// import Dashboard from './stateful/Dashboard/Dashboard'
// import AppLayout from './stateful/AppLayout/AppLayout'
// import NotFoundPage from './stateless/NotFound/NotFoundPage'
import PropTypes from 'prop-types'
import React from 'react'
import {hot} from 'react-hot-loader'
// import HOC from './common/HOCs/HOCs'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const activeStyle = {color: 'blue'}
    return (
      <div>
        <div>
          <p>Hi all</p>
        </div>
      </div>
    )
  }

  static propTypes = {
    children: PropTypes.element

  }
}



export default hot(module)(App)
