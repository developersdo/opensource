import React from 'react'

const FloatingButton = () => (
  <div className="fixed-action-btn">
    <a className="btn-floating btn-large red darken-2">
      <i className="large material-icons">more_vert</i>
    </a>
    <ul>
      <li>
        <a
          className="btn-floating red darken-2 tooltipped"
          target="_blank"
          href="https://github.com/developersdo/opensource/issues/new"
          data-position="left"
          data-tooltip="Report an issue"
        >
          <i className="material-icons">bug_report</i>
        </a>
      </li>
      <li>
        <a
          className="btn-floating red darken-2 tooltipped"
          target="_blank"
          href="https://github.com/developersdo/opensource/"
          data-position="left"
          data-tooltip="View project on GitHub"
        >
          <i className="material-icons">code</i>
        </a>
      </li>
    </ul>
  </div>
)

export default FloatingButton
