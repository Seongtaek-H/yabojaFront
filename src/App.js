import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyle from './css/globalStyle'
import Join from './routes/Join'
import Login from './routes/Login'
import Home from './routes/Home'
import What from './routes/What'
import When from './routes/When'

import Detail from './routes/Detail'
import Review from './routes/Review'
import Search from './routes/Search'
import MyPage from './routes/MyPage'
import Menu from './components/Menu'
import NoMobile from './components/NoMobile'
import styled from 'styled-components'

const RootContainer = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
  font-family: 'Noto300';
  background-color: black;
  color: white;
`

const Contents = styled.div`
  height: 100%;
`
function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <NoMobile />
        <RootContainer>
          <Menu></Menu>
          <Contents>
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
              <Route path="/me/info" element={<MyPage />} />
            </Routes>
            <Routes>
              <Route path="/what" element={<What />} />
            </Routes>
            <Routes>
              <Route path="/when" element={<When />} />
            </Routes>
            <Routes>
              <Route path="/detail/:type/:id" element={<Detail />} />
            </Routes>
            <Routes>
              <Route path="/review/:type/:id" element={<Review />} />
            </Routes>
            <Routes>
              <Route path="/search" element={<Search />} />
            </Routes>
          </Contents>
        </RootContainer>
      </Router>
    </>
  )
}

export default App
