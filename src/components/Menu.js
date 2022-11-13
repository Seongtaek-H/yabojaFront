import { Link, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/isLoginSlice'

import styled from 'styled-components'

import { deleteCookie } from '../utils/cookie'

// css 변수
const MenuHeight = `100px`

const MenuContainer = styled.div`
  width: 100%;
  max-width: 1920px;
  height: ${MenuHeight};
  font-size: 1.5rem;
  position: fixed;
  top: 0;
  background-color: gray;
  font-family: 'Noto700';
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 99;
  h1 {
    font-family: 'DoHyeon';
    font-size: 2rem;
    color: #fff;
    text-shadow: 0 0 7px #f21b75, 0 0 10px #f21b75, 0 0 20px #f21b75,
      0 0 42px #f21b75, 0 0 82px #f21b75, 0 0 92px #f21b75, 0 0 102px #f21b75,
      0 0 151px #f21b75;
  }
  div {
    display: flex;
    font-family: 'Noto300';
    a:nth-child(1) {
      margin-right: 1vw;
    }
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  cursor: pointer;
  &:hover,
  &:focus {
    transition: all 0.1s ease-in-out;
    color: orange;
  }
`
const StyledBtn = styled.div`
  appearance: none;
  color: white;
  border: none;
  &:focus {
    transition: all 0.1s ease-in-out;
    color: orange;
  }
`
const Blank = styled.div`
  height: ${MenuHeight};
`
function Menu() {
  const isLogin = useSelector((state) => state.isLogin.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    deleteCookie('til_auth')
    deleteCookie('til_user')
    dispatch(logout())
    navigate('/')
  }

  return (
    <>
      <Blank></Blank>
      <MenuContainer>
        <StyledLink to="/">
          <h1>YaBoja</h1>
        </StyledLink>
        <StyledLink to="/what">뭐 볼까?</StyledLink>
        <StyledLink to="/when">언제 나오지?</StyledLink>
        <StyledLink to="/search">검색</StyledLink>
        {isLogin === true ? (
          <div>
            <StyledLink to="/me/info">마이페이지</StyledLink>
            <StyledBtn onClick={handleLogout}>로그아웃</StyledBtn>
          </div>
        ) : (
          <div>
            <StyledLink to="/login">로그인</StyledLink>
            <StyledLink to="join">회원가입</StyledLink>
          </div>
        )}
      </MenuContainer>
    </>
  )
}

export default Menu
