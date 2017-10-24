import React from 'react'
import { OutboundLink } from 'react-ga'

const style = {
  avatar: {
    width: 32,
    height: 32,
    verticalAlign: 'middle',
    marginRight: 16,
  },
  action: {
    display: 'inline-block',
  },
  language: {
    display: 'inline-block',
    padding: '0 10px',
    marginRight: 10,
    borderRadius: 5
  }
}

const RepositoryCard = ({repo}) => {
  return (
    <div className="card hoverable">
      <div className="card-content">
        <div className="card-title">
          {repo.position && <strong style={{ marginRight: 20 }}>#{repo.position}</strong>}
          {repo.name}
          <span style={{ float: 'right' }}>
            <i className="material-icons">star</i>{repo.stargazers}
          </span>
        </div>
        <p>{repo.description}</p>
      </div>
      <div className="card-action">
        {repo.languages.length === 0
          ? '(no languages)'
          : repo.languages.map((lang, index) => <span key={index} className={lang.color} style={style.language}>{lang.name}</span>)
        }
      </div>
      <div className="card-action truncate">
        <OutboundLink
          style={style.action}
          target="_blank"
          eventLabel={repo.user.githubUrl}
          to={repo.user.githubUrl}
        >
          <img className="circle" style={style.avatar} src={repo.user.avatarUrl} />
          {repo.user.name || repo.user.login}
        </OutboundLink>
        <OutboundLink
          style={style.action}
          target="_blank"
          eventLabel={repo.url}
          to={repo.url}
        >
          <i className="material-icons left">link</i>GitHub Project
        </OutboundLink>
      </div>
    </div>
  )
}

export default RepositoryCard
