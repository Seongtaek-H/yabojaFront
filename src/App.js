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

import TvDetail from './routes/TvDetail'
import MovieDetail from './routes/MovieDetail'
import MovieReview from './routes/MovieReview'
import TVReview from './routes/TVReview'
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
      <Routes>
        <Route path="/tvDetail/:id" element={<TvDetail />} />
      </Routes>
      <Routes>
        <Route path="/movieDetail/:id" element={<MovieDetail />} />
      </Routes>
      <Routes>
        <Route path="/movieReview/:id" element={<MovieReview />} />
        <Route path="/movieReview/:id/write" element={<MovieReview />} />
      </Routes>
      <Routes>
        <Route path="/tvReview/:id" element={<TVReview />} />
        <Route path="/tvReview/:id/write" element={<TVReview />} />
      </Routes>
      <Routes>
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  )
}

export default App
