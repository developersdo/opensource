import React from 'react'
import { OutboundLink } from 'react-ga'
import GithubAvatar from '~/components/github-avatar/GithubAvatar'

const style = {
  avatar: {
    width: 64,
    height: 64,
    verticalAlign: 'middle',
    marginRight: 16,
  },
  follows: {
    fontWeight: '600'
  },
  action: {
    display: 'inline-block',
    textTransform: 'none',
  },
  fact: {
    display: 'block'
  },
  cardNumber: {
    display: 'block',
    fontWeight: 'bold',
    fontSize: '110%',
    position: 'absolute',
    right: 20,
    top: 20
  }
}

const DeveloperCard = ({user, index}) => (
  <div className="card hoverable" title={user.description}>
    <div className="card-content">
      <span style={style.cardNumber}>#{index}</span>
      <OutboundLink
        className="card-title truncate"
        target="_blank"
        eventLabel={user.githubUrl}
        to={user.githubUrl}
      >
        <p className="center-align">
          <GithubAvatar
            className="circle"
            style={ style.avatar }
            user={ user }
            size="64"
          />
        </p>
        <p className="center-align">
          {user.name || user.login}
        </p>
      </OutboundLink>
      <p className="center-align">Followers <span style={ style.follows }>{user.followers}</span> | Following <span style={ style.follows }>{user.following}</span></p>
    </div>
    <div className="card-action">
      <span style={style.fact}>{user.sources} repositories</span>
      <span style={style.fact}>{user.forked} forks</span>
    </div>
    <div className="card-action truncate">
      <OutboundLink
        style={style.action}
        target="_blank"
        eventLabel={user.url || ''}
        to={user.url}
      >
        {user.url}
      </OutboundLink>
    </div>
  </div>
)

export default DeveloperCard
