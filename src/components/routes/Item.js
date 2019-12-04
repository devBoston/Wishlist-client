import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'

class Item extends Component {
  constructor (props) {
    super(props)

    this.state = {
      item: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { user } = this.props
    axios({
      url: `${apiUrl}/items/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => this.setState({ item: res.data.item }))
      .catch(console.error)
  }

  destroy = () => {
    const { user } = this.props
    axios({
      url: `${apiUrl}/items/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }

  render () {
    const { item, deleted } = this.state

    if (!item) {
      return <p>Loading...</p>
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/', state: { msg: 'Item succesfully deleted!' } }
      } />
    }

    return (
      <Fragment>
        <h4>{item.name}</h4>
        <p>Description: {item.description}</p>
        <button onClick={this.destroy}>Delete Item</button>
        <Link to={`/items/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to="/items">Back to all items</Link>
      </Fragment>
    )
  }
}

export default Item
