import React from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route, Redirect } from 'react-router-dom'

import { store } from './store'
import { Login } from './features/auth/login'
import { MyProjects } from './features/projects/my-projects'
import { history } from './history'
import { ProtectedRoute } from './common/protected-route'
import { ProjectDetail } from './features/projects/project-detail'

export const App = () => {

  return <Provider store={store}>
    <Router history={history}>
      <Switch>
        <ProtectedRoute exact={true} path='/' fallbackRoute='/login' component={MyProjects}/>
        <ProtectedRoute exact={true} path='/projects/:id' fallbackRoute='/login' component={ProjectDetail} />
        <Route exact={true} path='/login' component={Login} />
        <Redirect to='/login' />
      </Switch>
    </Router>
  </Provider>
}
