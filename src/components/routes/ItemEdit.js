import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ItemForm from '../shared/ItemForm'

class ItemEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      item: {
        name: '',
        description: ''
      },
      updated: false
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

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedItem = Object.assign(this.state.item, updatedField)

    this.setState({ item: editedItem })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user } = this.props

    axios({
      url: `${apiUrl}/items/${this.state.item.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: { item: this.state.item }
    })
      .then(res => this.setState({ updated: true }))
      .catch(console.error)
  }

  render () {
    const { item, updated } = this.state
    const { handleChange, handleSubmit } = this

    if (updated) {
      return <Redirect to={`/items/${this.props.match.params.id}`} />
    }

    return (
      <Fragment>
        <ItemForm
          item={item}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/items/${this.props.match.params.id}`}
        />
      </Fragment>
    )
  }
}

export default ItemEdit
