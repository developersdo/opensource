import React from 'react'
import PopularLanguages from './popular-languages/PopularLanguages'
import Statistics from './statistics/Statistics'

const About = () => (
  <div id="about">
    <h1>About</h1>
    <div className="row">
      <div className="col s6">
        <PopularLanguages />
      </div>
      <div className="col s6">
        <Statistics />
      </div>
    </div>
  </div>
)

export default About
