import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// check lines 9 and 16
const Items = props => {
  const [items, setItems] = useState([])
  // const { user } = this.props

  useEffect(() => {
    axios({
      url: `${apiUrl}items/`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(response => {
        setItems(response.data.items.reverse())
      })
      // .then(() => props.alert({ message: 'Here are your wishes!', variant: 'success' }))
      .catch(() => props.alert({ heading: 'Unable to retrieve wishes', message: 'Sorry this isn\'t working', variant: 'danger' }))
  }, [])

  const itemsJsx = items.map(item => (
    <ListGroup.Item
      key={item.id}
      action
      href={`#items/${item.id}`}
    >
      {item.name}
    </ListGroup.Item>
  ))

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Wishes</h1>
          {props.user && <Link to="/create-item" style={{ color: '#ffffff' }}>Add another Wish</Link>}
        </div>
        <ListGroup>
          {itemsJsx}
        </ListGroup>
      </div>
    </div>
  )
}

export default Items
