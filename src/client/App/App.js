import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import NavBar from '../components/navbar/NavBar'
import Repositories from '../components/repositories/Repositories'
import Developers from '../components/developers/Developers'
import About from '../components/about/About'
import GlobalFloatingButton from '../components/global-floating-button/GlobalFloatingButton'

const basename = '/opensource'

const App = () => (
  <BrowserRouter basename={basename}>
    <div id="app">
      <NavBar/>
      <div className="container">
        <Route exact path="/" render={() => <Redirect to="/repositories" />} />
        <Route path="/repositories" component={Repositories} />
        <Route path="/developers" component={Developers} />
        <Route path="/about" component={About} />
      </div>
      <GlobalFloatingButton />
    </div>
  </BrowserRouter>
)

export default App
