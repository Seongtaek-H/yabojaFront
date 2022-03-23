import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getCookie, removeCookie } from '../utils/cookie'

const Container = styled.div`
  width: 100%;
  height: 80px;
  background-color: gray;
  position: fixed;
  font-family: 'NotoSansKr-Medium';
  font-size: x-large;
  display: grid;
  grid-template-columns: 1fr 5fr;
  justify-items: center;
  align-items: center;
  padding: 0 100px 0 100px;
  z-index: 2;
`
const Logo = styled.div`
  font-family: 'DoHyeon-Regular';
  font-size: 45px;
  color: #fff;
  text-shadow: 0 0 7px #f21b75, 0 0 10px #f21b75, 0 0 20px #f21b75,
    0 0 42px #f21b75, 0 0 82px #f21b75, 0 0 92px #f21b75, 0 0 102px #f21b75,
    0 0 151px #f21b75;
`

const MenuDetail = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-family: 'NotoSansKr-bold';
`
const MenuExtra = styled.div`
  width: 10vw;
  display: flex;
  justify-content: space-between;
  font-family: 'NotoSansKr-Regular';
  font-size: medium;
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
`

function Menu() {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const [login, setLogin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (state.yaEmail === '') {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [state])

  return (
    <>
      <Container>
        <StyledLink to="/">
          <Logo>YaboJa</Logo>
        </StyledLink>
        <MenuDetail>
          <StyledLink to="/what">뭐 볼까?</StyledLink>
          <StyledLink to="/when">언제 나오지?</StyledLink>
          <StyledLink to="/search">검색</StyledLink>
          {!login === true ? (
            <MenuExtra>
              <StyledLink to="/me/info">마이페이지</StyledLink>
              <Button
                onClick={() => {
                  removeCookie('jwt')
                  dispatch({ type: 'LOGOUT' })
                  navigate('/')
                }}
              >
                로그아웃
              </Button>
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
