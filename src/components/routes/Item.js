import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../../apiConfig'
import Layout from '../shared/Layout'

class Item extends Component {
  constructor (props) {
    super(props)

    this.state = {
      item: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/items/${this.props.match.params.id}`)
      .then(res => this.setState({ item: res.data.item }))
      .catch(console.error)
  }

  destroy = () => {
    axios({
      url: `${apiUrl}/items/${this.props.match.params.id}`,
      method: 'DELETE'
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
      <Layout>
        <h4>{item.title}</h4>
        <p>Description: {item.description}</p>
        <button onClick={this.destroy}>Delete Item</button>
        <Link to={`/items/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to="/items">Back to all items</Link>
      </Layout>
    )
  }
}

export default Item
