import React from 'react'
import { Link } from 'react-router-dom'
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
  languages: {
    paddingBottom: 6,
  },
  language: {
    display: 'inline-block',
    padding: '0 10px',
    margin: '0 10px 10px 0',
    borderRadius: 5,
  },
  cardTitle: {
    wordWrap: 'break-word',
  },
  cardAction: {
    whiteSpace: 'initial',
  },
}

const RepositoryCard = ({repo}) => {
  return (
    <div className="card hoverable">
      <div className="card-content">
        <div className="card-title" style={style.cardTitle}>
          <span style={{ float: 'right' }}>
            <i className="material-icons">star</i>{repo.stargazers}
          </span>
          {repo.position && <strong style={{ marginRight: 20 }}>#{repo.position}</strong>}
          <OutboundLink
            target="_blank"
            eventLabel={repo.url || ''}
            to={repo.url}
          >
            {repo.name}
          </OutboundLink>
        </div>
        <p>{repo.description}</p>
      </div>
      <div className="card-action" style={style.languages}>
        {repo.languages.length === 0
          ? '(no languages)'
          : repo.languages.map((lang, index) => (
            <Link
              style={style.language}
              to={`/repositories/${ lang.name }`}
              className={lang.color}
              key={`${repo.id}-${lang.name}`}
            >{lang.name}</Link>
          ))
        }
      </div>
      <div className="card-action truncate" style={style.cardAction}>
        <OutboundLink
          style={style.action}
          target="_blank"
          eventLabel={repo.user.githubUrl || ''}
          to={repo.user.githubUrl}
        >
          <img className="circle" style={style.avatar} src={repo.user.avatarUrl} />
          {repo.user.name || repo.user.login}
        </OutboundLink>
        <OutboundLink
          style={style.action}
          target="_blank"
          eventLabel={repo.url || ''}
          to={repo.url}
        >
          <i className="material-icons left">link</i>GitHub Project
        </OutboundLink>
      </div>
    </div>
  )
}

export default RepositoryCard
