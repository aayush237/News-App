
import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5, 
    category: ""
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number, 
    category: PropTypes.string
  }

  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <Routes>          
          <Route exact path="/" element={<News key="general" pageSize={5} country="in" category='general' />} />
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={5} country="in" category='entertainment' />} />
          <Route exact path="/sports" element={<News key="sports" pageSize={5} country="in" category='sports' />} />
          <Route exact path="/business" element={<News key="business"  pageSize={5} country="in" category='business' />} />
          <Route exact path="/technology" element={<News key="technology" pageSize={5} country="in" category='technology' />} />
          <Route exact path="/science" element={<News key="science" pageSize={5} country="in" category='science' />} />
          <Route exact path="/health" element={<News key="health" pageSize={5} country="in" category='health' />} />
        </Routes>
        </Router>
      </div>
    )
  }
}
