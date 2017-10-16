import React from 'react'
import ReactList from 'react-list'
import RepositoryCard from './card/RepositoryCard'

const RepositoriesList = ({repos}) => (
  <ReactList
    itemRenderer={(index, key) => <RepositoryCard key={key} repo={repos[index]} />}
    length={repos.length}
    type="uniform"
  />
)

export default RepositoriesList
