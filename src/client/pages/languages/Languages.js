import React from 'react'
import { Route, Redirect, NavLink } from 'react-router-dom'
import LanguageRepositories from '~/pages/language-repositories/LanguageRepositories'

const Languages = (props) => (
  <div>
    <Route path="/languages/:language" component={LanguageRepositories} />
    <Route exact path="/languages" render={() => <Redirect to="/repositories/popular" />} />
  </div>
)

export default Languages;
