import React from 'react'
import InfiniteScroller from 'react-infinite-scroller'
import { get } from 'lodash'
import Loading from '~/components/loading/Loading'

/**
 * The InfiniteScroll class object acts as a wrapper around `react-infinite-scroller`
 * specialized for static array (that doesn't need to be fetched). Also, it detect
 * changes in that static array and then force remount (key-hack-ish).
 */
class InfiniteScroll extends React.Component {

  // Initial state.
  state = {
    page: 0,
    hasMore: true,
    renderCount: 0,
    renderedItems: [],
  }

  /**
   * Return default props.
   */
  static defaultProps = {
    size: 10,
    render: (item) => <div>{item}</div>,
  }

  componentWillReceiveProps(nextProps) {
    const currItems = get(this.props, 'items', [])
    const nextItems = get(nextProps, 'items', [])

    if (currItems.length !== nextItems.length) {
      this.setState({
        page: 0,
        hasMore: true,
        renderedItems: [],
        renderCount: this.state.renderCount + 1,
      })
    }
  }

  /**
   * Render this component.
   */
  render() {
    const { hasMore, renderedItems, renderCount } = this.state
    const { render } = this.props
    return (
      <InfiniteScroller
        key={ renderCount }
        loader={ <Loading/> }
        hasMore={ hasMore }
        loadMore={ () => this.loadMore() }
      >
        { renderedItems.map(render) }
      </InfiniteScroller>
    )
  }

  /**
   * Load more items.
   */
  loadMore() {
    const { items, size } = this.props
    const { renderedItems, page } = this.state

    const nextItems = items.slice(page * size, (page * size) + size)
    const moreRenderedItems = renderedItems.concat(nextItems)

    this.setState({
      page: page + 1,
      hasMore: moreRenderedItems.length < items.length,
      renderedItems: moreRenderedItems,
    })
  }
}

export default InfiniteScroll
