import React from 'react'

const style = {
  input: {
    borderBottomColor: '#2196f3',
    boxShadow: '0 1px 0 0 #2196f3'
  }
}

class Filter extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="input-field col s12 m12 l6 offset-l3">
          <input
            className="validate"
            style={style.input}
            placeholder="Filter repositories by name or author ..."
            type="text"
            onChange={(event) => this.filterChanged(event.target.value)}
          />
        </div>
      </div>
    )
  }
  filterChanged(value) {
    const { onChange } = this.props
    onChange.call(null, value)
  }
}

export default Filter
