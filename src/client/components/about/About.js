import React from 'react'
import PopularLanguages from './popular-languages/PopularLanguages'
import Statistics from './statistics/Statistics'

const About = () => (
  <div id="about">
    <h5>About this website</h5>
    <p>
      <strong>Dominican Open Source</strong> is an initiative to gather all possible public data about projects in GitHub from developers of the Dominican Republic using the <a href="https://developer.github.com/v4/" target="_blanks">GitHub GraphQL API</a>.
    </p>
    <p>
      The main purpose of this website is to show local efforts that Dominicans are contributing toward open source communities.
    </p>
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
