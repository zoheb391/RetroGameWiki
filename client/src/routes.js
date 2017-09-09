import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import configureStore from './store'
import { GamesContainer, AddGameContainer } from './containers'
import  { Home, Welcome, About, Contact, Archive, Login, Signup } from './components'

const store= configureStore()

const routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={Home}>
                <IndexRoute component={Welcome} />
                <Route path='/about' component={About} />
                <Route path='/contact' component={Contact} />
            </Route>
            <Route path='/games' component={Archive}>
                <IndexRoute component={GamesContainer} />
                <Route path='add' component={AddGameContainer} />
            </Route>
            <Route path='/auth' component={Archive}>
                <IndexRoute component={Login} />
                <Route path='login' component={Login} />
                <Route path='signup' component={Signup} />
            </Route>
        </Router>
    </Provider>
)

export default routes
