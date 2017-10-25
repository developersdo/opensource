import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import App from './App/App'

ReactGA.initialize('UA-53810134-2')

const Root = <App />
ReactDOM.render(Root, document.getElementById('root'))
