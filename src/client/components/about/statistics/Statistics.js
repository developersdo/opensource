import React from 'react'
import store from '../../../store/store'
import Loading from '../../loading/Loading'
import { map } from 'lodash'

class AboutStatistics extends React.Component {
  state = {
    repos: [],
    users: [],
    loading: true,
    error: false
  }
  componentDidMount() {
    Promise.all([store.getRepos(), store.getUsers()])
      .then(([repoResponse, userResponse]) => {
        this.setState({
          repos: repoResponse.items,
          users: userResponse.items,
          loading: !repoResponse.ready || !userResponse.ready,
          error: repoResponse || userResponse
        })
      })
  }
  render() {
    const { repos, users, loading, error } = this.state
    if (loading) {
      return <Loading />
    }

    const usersWithMoreThanTenRepo = users
      .filter((user) => user.sources > 10)
      .length

    const reposWithMoreThanOneStargazer = repos
      .filter((repo) => repo.stargazers > 1)
      .length

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

    return (
      <div>
        <h4>Statistics</h4>
        <ul className="collection">
          <li className="collection-item">
            <h4>
              <i className="material-icons">perm_identity</i>
              {users.length.toLocaleString()} developers <small>are contributing to open source.</small>
            </h4>
            <p>(organizations are not counted)</p>
            <p>Among that number of developers, <strong>{usersWithMoreThanTenRepo.toLocaleString()} have more 10 repos</strong>.</p>
          </li>
          <li className="collection-item">
            <h4>
              <i className="material-icons">code</i>
              {repos.length.toLocaleString()} repos <small>created on GitHub. In average, each user contribute with {(repos.length / users.length).toFixed(1).toLocaleString()} repos.</small>
            </h4>
            <p>(excluding forks)</p>
            <p>Interesting, the fact that there are <strong>{reposWithMoreThanOneStargazer.toLocaleString()} repos with more than one star</strong>.</p>
          </li>
          <li className="collection-item">
            <h4>
              <i className="material-icons">assessment</i>
              {languages.length.toLocaleString()} programming languages <small>in use across {repos.length.toLocaleString()} repos.</small>
            </h4>
            <p>The <strong>less used languages</strong> among dominican developers in open source via GitHub are: {languages.slice(-10).map((lang) => lang.name).join(', ')}.</p>
          </li>
        </ul>
      </div>
    )
  }
}

export default AboutStatistics
