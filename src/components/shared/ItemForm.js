import React from 'react'
import { Link } from 'react-router-dom'

const ItemForm = ({ item, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>I want ...</label>
    <input
      placeholder="socks"
      value={item.name}
      name="name"
      onChange={handleChange}
    />

    <label>   Description  </label>
    <input
      placeholder="fuzzy"
      value={item.description}
      name="description"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default ItemForm
