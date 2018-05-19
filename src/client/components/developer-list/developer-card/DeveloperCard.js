import React from 'react'
import { OutboundLink } from 'react-ga'

const style = {
  avatar: {
    width: 64,
    height: 64,
    verticalAlign: 'middle',
    marginRight: 16,
  },
  action: {
    display: 'inline-block',
  },
  fact: {
    display: 'inline-block',
    marginRight: 20,
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
  <div className="card hoverable">
    <div className="card-content">
      <span style={style.cardNumber}>#{index}</span>
      <OutboundLink
        className="card-title truncate"
        target="_blank"
        eventLabel={user.githubUrl}
        to={user.githubUrl}
      >
        <img className="circle" style={style.avatar} src={user.avatarUrl} />
        {user.name || user.login}
      </OutboundLink>
      <p>Followed by: {user.followers}</p>
      <p>{user.description}</p>
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
