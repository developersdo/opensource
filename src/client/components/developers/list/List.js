import React from 'react'
import ReactList from 'react-list'
import DeveloperCard from './card/DeveloperCard'
import classnames from 'classnames'

const style = {
  first: {
    paddingRight: 10,
  },
  second: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  third: {
    paddingLeft: 10,
  }
}

const DevelopersList = ({users}) => (
  <div className="row">
    <ReactList
      itemRenderer={(index, key) => (
        <div
          key={key}
          className="col s4"
          style={style[['first', 'second', 'third'][index % 3]]}
        >
          <DeveloperCard
            user={users[index]}
          />
        </div>
      )}
      length={users.length}
      type="uniform"
    />
  </div>
)

export default DevelopersList
