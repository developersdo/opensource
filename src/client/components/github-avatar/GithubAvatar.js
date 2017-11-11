import React from 'react'

const GithubAvatar = ({ user, size, ...otherProps }) => (
  <img
    alt={ '@' + user.login }
    src={ user.avatarUrl + '&s=' + (size * 2) }
    width={ size }
    height={ size }
    { ...otherProps }
  />
)

export default GithubAvatar
