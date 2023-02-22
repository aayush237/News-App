
import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import PropTypes from 'prop-types'

export default class App extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5, 
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number, 
    category: PropTypes.string
  }

  render() {
    return (
      <div>
        <NavBar/>
        <News pageSize={5} country="gb" category='sports' />
      </div>
    )
  }
}

