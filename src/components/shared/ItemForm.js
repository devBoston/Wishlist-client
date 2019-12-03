import React from 'react'
import { Link } from 'react-router-dom'

const MovieForm = ({ movie, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder="A Wonderful Film"
      value={movie.title}
      name="title"
      onChange={handleChange}
    />

    <label>Director</label>
    <input
      placeholder="John Doe"
      value={movie.director}
      name="director"
      onChange={handleChange}
    />

    <label>Date Released</label>
    <input
      type="date"
      placeholder="YYYY-MM-DD"
      value={movie.year}
      name="year"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default MovieForm
