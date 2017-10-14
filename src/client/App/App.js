import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import NavBar from '../components/navbar/NavBar'
import Repositories from '../components/repositories/Repositories'
import Developers from '../components/developers/Developers'
import About from '../components/about/About'

// // While in development, we serve the app from http://localhost:3000/ (no basename).
// // However, in production we serve the app from https://developersdo.github.com/opensource
// // (it does contains a basename, a directory).
// const basename = process.env.NODE_ENV === 'development' ? '' : '/opensource'
const basename = '/opensource'

const App = () => (
  <BrowserRouter basename={basename}>
    <div className="container">
      <NavBar/>
      <Route exact path="/" render={() => <Redirect to="/repositories" />} />
      <Route path="/repositories" component={Repositories} />
      <Route path="/developers" component={Developers} />
      <Route path="/about" component={About} />
    </div>
  </BrowserRouter>
)

export default App
