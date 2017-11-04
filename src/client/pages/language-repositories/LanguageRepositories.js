import React from 'react'
import DocumentTitle from 'react-document-title'
import { orderBy, each, filter, includes } from 'lodash'
import utils from '~/utils'
import store from '~/store/store'
import Loading from '~/components/loading/Loading'
import RepositoryList from '~/components/repository-list/RepositoryList'

class LanguageRepositories extends React.Component {
  constructor(props) {
    super(props)
    let languageName = this._parseLanguageParam(props)
    this.state = {
      languageName: languageName,
      repos: [],
      loading: true,
      error: false
    }
  }

  _parseLanguageParam(props) {
    return props.match.params.language
  }

  _getRepos = (languageName) => {
    store.getRepos().then((response) => {
      let orderedRepos = orderBy(response.items, ['stargazers', 'forks', 'watchers', 'name'], ['desc', 'desc', 'desc', 'asc'])
      .filter(function(repo) {
        return repo.languages.map(function(l) { return l.name }).includes(languageName);
      })
      each(orderedRepos, (repo, index) => repo.position = index + 1)
      this.setState({
        languageName: languageName,
        repos: orderedRepos,
        loading: !response.ready,
        error: response.error,
        key: Math.random()
      })
    })
  }

  componentDidMount() {
    this._getRepos(this.state.languageName)
  }

  componentWillReceiveProps(newProps) {
    let oldLanguage = this._parseLanguageParam(this.props)
    let language = this._parseLanguageParam(newProps)

    if(oldLanguage !== language) {
      this._getRepos(language)
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }

    return (
      <DocumentTitle title={`${this.state.languageName} repositories – Dominican Open Source`}>
        <RepositoryList repos={this.state.repos} key={this.state.key} />
      </DocumentTitle>
    )
  }
}

export default LanguageRepositories
