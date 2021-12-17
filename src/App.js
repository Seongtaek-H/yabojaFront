import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom'

import Join from './routes/Join'
import Login from './routes/Login'
import Home from './routes/Home'
import What from './routes/What'
import Where from './routes/Where'
import When from './routes/When'
import Detail from './routes/Detail'
import Menu from './components/Menu'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/join" element={<Join />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/what" element={<What />} />
        </Routes>
        <Routes>
          <Route path="/where" element={<Where />} />
        </Routes>
        <Routes>
          <Route path="/when" element={<When />} />
        </Routes>
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </React.Fragment>
  )
}

export default App
