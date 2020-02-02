import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { store } from './store'
import { Login } from './features/auth/login'

export const App = () => {

  return <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={Login}/>

        <Redirect to='/login' />
      </Switch>
    </BrowserRouter>
  </Provider>
}
