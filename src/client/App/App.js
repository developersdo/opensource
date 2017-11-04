import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import About from '~/pages/about/About'
import NavBar from '~/components/nav-bar/NavBar'
import Developers from '~/pages/developers/Developers'
import Repositories from '~/pages/repositories/Repositories'
import Languages from '~/pages/languages/Languages'
import FloatingButton from '~/components/floating-button/FloatingButton'
import PageViewTracker from '~/components/page-view-tracker/PageViewTracker'

const basename = '/opensource'

const App = () => (
  <BrowserRouter basename={basename}>
    <div id="app">
      <Route path="/" component={PageViewTracker} />
      <NavBar/>
      <div className="container">
        <Route exact path="/" render={() => <Redirect to="/repositories" />} />
        <Route path="/languages" component={Languages} />
        <Route path="/repositories" component={Repositories} />
        <Route path="/developers" component={Developers} />
        <Route path="/about" component={About} />
      </div>
      <FloatingButton />
    </div>
  </BrowserRouter>
)

export default App
