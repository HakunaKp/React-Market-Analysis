import './reset.css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import GroupedBar from './charts/GroupedBar'
import MultiAxisLine from './charts/MultiAxisLine'
import MultiType from './charts/MultiType'

const App = () => (
  <Router>
    <div className='content'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/grouped-bar' component={GroupedBar} />
        <Route exact path='/multi-axis-line' component={MultiAxisLine} />
        <Route exact path='/multi' component={MultiType} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))
