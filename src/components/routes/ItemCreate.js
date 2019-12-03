import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ItemForm from '../shared/ItemForm'
import Layout from '../shared/Layout'

class ItemCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      item: {
        title: '',
        description: ''
      },
      createdItemId: null
    }
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedItem = Object.assign(this.state.item, updatedField)

    this.setState({ item: editedItem })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/items`,
      method: 'POST',
      data: { item: this.state.item }
    })
      .then(res => this.setState({ createdItemId: res.data.item.id }))
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { createdItemId, item } = this.state

    if (createdItemId) {
      return <Redirect to={`/items/${createdItemId}`} />
    }

    return (
      <Layout>
        <ItemForm
          item={item}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath="/"
        />
      </Layout>
    )
  }
}

export default ItemCreate
