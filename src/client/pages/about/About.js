import React from 'react'
import DocumentTitle from 'react-document-title'
import { OutboundLink } from 'react-ga'
import PopularLanguages from '~/pages/popular-languages/PopularLanguages'
import Statistics from '~/pages/statistics/Statistics'

const About = () => (
  <DocumentTitle title="About and Statistics – Dominican Open Source">
    <div>
      <h5>About this website</h5>
      <p>
        <strong>Dominican Open Source</strong> is an initiative to gather all possible public data about projects in GitHub from developers of the <strong>Dominican Republic</strong> using the <strong>
        <OutboundLink
          target="_blank"
          eventLabel="https://developer.github.com/v4/"
          to="https://developer.github.com/v4/">
           GitHub GraphQL API
        </OutboundLink>.
        </strong>
      </p>
      <p>
        The main purpose of this website is to show local efforts that <strong>Dominicans</strong> are contributing toward open source communities.
      </p>
      <div className="row">
        <div className="col s6 m4 l6">
          <PopularLanguages />
        </div>
        <div className="col s6 m4 l6">
          <Statistics />
        </div>
      </div>
    </div>
  </DocumentTitle>
)

export default About
