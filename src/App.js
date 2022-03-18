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
import When from './routes/When'

import Detail from './routes/Detail'
import Review from './routes/Review'
import Search from './routes/Search'
import MyPage from './routes/MyPage'
import FindUserInfo from './routes/Find'
import Menu from './components/Menu'

function App() {
  return (
    <Router>
      <Menu></Menu>
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
        <Route path="/find" element={<FindUserInfo />} />
      </Routes>
      <Routes>
        <Route path="/me/info" element={<MyPage />} />
      </Routes>
      <Routes>
        <Route path="/what" element={<What />} />
      </Routes>
      <Routes>
        <Route path="/when" element={<When />} />
      </Routes>
      {/* <Routes>
        <Route path="/detail/tv/:id" element={<TvDetail />} />
      </Routes> */}
      <Routes>
        <Route path="/detail/:type/:id" element={<Detail />} />
      </Routes>
      <Routes>
        <Route path="/review/:type/:id" element={<Review />} />
        <Route path="/review/:type/:id/write" element={<Review />} />
      </Routes>
      <Routes>
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  )
}

export default App
