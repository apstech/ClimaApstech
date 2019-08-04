import React from 'react';
import  Header from './Header'
import  Consulta from './Consulta'

import {
  BrowserRouter as Router
} from 'react-router-dom'

function App() {

  return (
    <Router>
      <div>
      <Header />
      
      <Consulta />
      </div>
    </Router>
  )
}

export default App;