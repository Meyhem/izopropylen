import React from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route, Redirect } from 'react-router-dom'

import { store } from './store'
import { Login } from './features/auth/login'
import { MyProjects } from './features/projects/my-projects'
import { history } from './history'

export const App = () => {

  return <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={MyProjects} />
        <Route exact path='/login' component={Login} />
        <Redirect to='/login' />
      </Switch>
    </Router>
  </Provider>
}
