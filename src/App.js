
import React, { useState } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App = () => {

  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0)


    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <NavBar/>

        <Routes>          
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={5} country="in" category='general' />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={5} country="in" category='entertainment' />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={5} country="in" category='sports' />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business"  pageSize={5} country="in" category='business' />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={5} country="in" category='technology' />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={5} country="in" category='science' />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={5} country="in" category='health' />} />
        </Routes>
        </Router>
      </div>
    )
}

export default App