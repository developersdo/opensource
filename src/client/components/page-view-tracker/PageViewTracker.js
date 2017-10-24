import React from 'react'
import ReactGA from 'react-ga'

const PageViewTracker = () => {
  const page = window.location.pathname + window.location.search
  ReactGA.set({ page })
  ReactGA.pageview(page)
  return null
}

export default PageViewTracker
