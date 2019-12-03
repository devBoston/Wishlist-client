import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Items = props => {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/items`)
      .then(response => {
        setItems(response.data.items.reverse())
      })
      .then(() => props.alert({ heading: 'Success', message: 'You got items', variant: 'success' }))
      .catch(() => props.alert({ heading: 'Not able to retrieve items', message: 'Sorry this isn\'t working', variant: 'success' }))
  }, [])

  const itemsJsx = items.map(item => (
    <ListGroup.Item
      key={item._id}
      action
      href={`#items/${item._id}`}
    >
      {item.title}
    </ListGroup.Item>
  ))

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Items</h1>
          {props.user && <Link to="/create-item">Add a item</Link>}
        </div>
        <ListGroup>
          {itemsJsx}
        </ListGroup>
      </div>
    </div>
  )
}

export default Items
