import React from 'react'
import { Route, withRouter } from 'react-router-dom'

import Items from './components/routes/Items.js'
import Item from './components/routes/Item.js'
import ItemEdit from './components/routes/ItemEdit.js'
import ItemCreate from './components/routes/ItemCreate.js'

const App = props => (
  <React.Fragment>
    <h3>{props.location.state ? props.location.state.msg : null}</h3>
    <Route exact path='/items' component={Items} />
    <Route exact path='/create-item' component={ItemCreate} />
    <Route exact path='/items/:id' component={Item} />
    <Route exact path='/items/:id/edit' component={ItemEdit} />
  </React.Fragment>
)

export default withRouter(App)
