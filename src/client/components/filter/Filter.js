import React from 'react'

const style = {
  input: {
    borderBottomColor: '#2196f3',
    boxShadow: '0 1px 0 0 #2196f3'
  }
}

class Filter extends React.Component {

  /**
   * Render this component.
   */
  render() {
    const { placeholder } = this.props

    return (
      <div className="card hoverable">
        <div className="input-field">
          <input
            id="search"
            className="validate"
            style={style.input}
            placeholder={placeholder}
            type="search"
            onChange={(event) => this.filterChanged(event.target.value)}
          />
          <label className="label-icon" htmlFor="search">
            <i className="material-icons">search</i>
          </label>
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
