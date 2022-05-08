import { Link, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/isLoginSlice'

import styled from 'styled-components'

import { deleteCookie } from '../utils/cookie'

const Container = styled.div`
  margin-top: 0px;
  width: 100%;
  height: 80px;
  background-color: gray;
  position: fixed;
  font-size: x-large;
  display: grid;
  grid-template-columns: 1fr 5fr;
  justify-items: center;
  align-items: center;
  padding: 0 5vw 0 5vw;
  z-index: 2;

  @media screen and (max-width: 412px) {
    display: flex;
    position: static;
    background-color: transparent;
  }
`
const Logo = styled.div`
  font-family: 'DoHyeon';
  font-size: 40px;
  color: #fff;
  text-shadow: 0 0 7px #f21b75, 0 0 10px #f21b75, 0 0 20px #f21b75,
    0 0 42px #f21b75, 0 0 82px #f21b75, 0 0 92px #f21b75, 0 0 102px #f21b75,
    0 0 151px #f21b75;
`
const MenuDetail = styled.div`
  font-family: 'Noto500';
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const MenuWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  @media screen and (max-width: 412px) {
    display: none;
  }
`
const MenuExtra = styled.div`
  width: 10vw;
  display: flex;
  justify-content: space-between;
  font-size: medium;
  @media screen and (max-width: 412px) {
    width: auto;
    a:nth-child(1) {
      margin: 0vw 5vw;
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
const Button = styled.div`
  appearance: none;
  color: white;
  border: none;
  cursor: pointer;
  &:focus {
    transition: all 0.1s ease-in-out;
    color: orange;
  }
`
const Blank = styled.div`
  height: 80px;
  @media screen and (max-width: 412px) {
    display: none;
  }
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
      <Container>
        <StyledLink to="/">
          <Logo>YaBoja</Logo>
        </StyledLink>
        <MenuDetail>
          <MenuWrapper>
            <StyledLink to="/what">뭐 볼까?</StyledLink>
            <StyledLink to="/when">언제 나오지?</StyledLink>
            <StyledLink to="/search">검색</StyledLink>
          </MenuWrapper>
          {isLogin === true ? (
            <MenuExtra>
              <StyledLink to="/me/info">마이페이지</StyledLink>
              <Button onClick={handleLogout}>로그아웃</Button>
            </MenuExtra>
          ) : (
            <MenuExtra>
              <StyledLink to="/login">로그인</StyledLink>
              <StyledLink to="join">회원가입</StyledLink>
            </MenuExtra>
          )}
        </MenuDetail>
      </Container>
      <Blank></Blank>
    </>
  )
}

export default Menu
