import React from 'react'
import { OutboundLink } from 'react-ga'

const FloatingButton = () => (
  <div className="fixed-action-btn">
    <a className="btn-floating btn-large red darken-2">
      <i className="large material-icons">more_vert</i>
    </a>
    <ul>
      <li>
        <OutboundLink
          className="btn-floating red darken-2 tooltipped"
          target="_blank"
          eventLabel="https://github.com/developersdo/opensource/issues/new"
          to="https://github.com/developersdo/opensource/issues/new"
          data-position="left"
          data-tooltip="Report an issue"
        >
          <i className="material-icons">bug_report</i>
        </OutboundLink>
      </li>
      <li>
        <OutboundLink
          className="btn-floating red darken-2 tooltipped"
          target="_blank"
          eventLabel="https://github.com/developersdo/opensource/"
          to="https://github.com/developersdo/opensource/"
          data-position="left"
          data-tooltip="View project on GitHub"
        >
          <i className="material-icons">code</i>
        </OutboundLink>
      </li>
    </ul>
  </div>
)

export default FloatingButton
