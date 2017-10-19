import React from 'react'
import store from '../../../store/store'
import Loading from '../../loading/Loading'
import { map } from 'lodash'

const style = {
  position: {
    width: 40,
    display: 'inline-block',
    fontSize: 18,
  },
  name: {
    fontSize: 22,
    marginRight: 10,
  },
  progress: {
    height: 10,
  }
}

class AboutPopularLanguages extends React.Component {
  state = {
    repos: [],
    loading: true,
    error: false
  }
  componentDidMount() {
    store.getRepos().then((response) => {
      this.setState({
        repos: response.items,
        loading: !response.ready,
        error: response.error
      })
    })
  }
  render() {
    const { repos, loading, error } = this.state
    if (loading) {
      return <Loading />
    }

    // Count languages for each repos.
    const totals = repos.reduce((total, repo) => {
      repo.languages.forEach((lang) => {
        if (!total[lang.name]) {
          total[lang.name] = 0
        }
        total[lang.name]++
      })
      return total
    }, {})

    // Create language stats.
    const languages = map(totals, (total, name) => ({
      name,
      total,
      percentage: ((total / repos.length) * 100).toFixed(2)
    }))

    languages.sort((a, b) => b.total - a.total)

    const topLanguages = languages.slice(0, 10)

    return (
      <div>
        <h4>Popular Languages</h4>
        {topLanguages.map(({name, total, percentage}, index) => (
          <div key={name}>
            <span className="grey-text text-darken-3" style={style.position}>#{index + 1}</span>
            <span style={style.name}>{name}</span>
            <strong className="grey-text text-darken-2">{percentage}%</strong>
            <div className="progress blue lighten-4" style={style.progress}>
              <div className="determinate blue darken-2" style={{ width: `${percentage}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default AboutPopularLanguages
