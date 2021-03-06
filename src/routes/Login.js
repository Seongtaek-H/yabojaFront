import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { login } from '../store/isLoginSlice'

import styled from 'styled-components'

import { getUser, loginUser } from '../api/axios'
import { saveAuthToCookie, saveUserToCookie } from '../utils/cookie'

const Container = styled.div`
  height: 90vh;
  min-height: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
const GridContainer = styled.div`
  width: 50%;
  height: 85%;
  max-width: 40rem;
  max-height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #212529;
  border-radius: 1rem;

  div {
    width: 30rem;
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    margin-bottom: 1rem;
    label {
      justify-self: center;
    }
    input {
      background-color: black;
      height: 4rem;
      padding: 1rem;
      color: white;
      border: none;
      font-size: 1rem;
      :focus {
        outline: #808080 solid 1px;
      }
    }
  }
  div:last-child {
    display: flex;
    justify-content: space-evenly;
    a {
      text-decoration: none;
      color: white;
    }
  }
`
const StyledBtn = styled.button`
  margin: 2rem 0;
  color: white;
  background-color: red;
  width: 20rem;
  height: 4rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 1rem;
  &:hover {
    opacity: 0.7;
    color: white;
    transition: all 0.3s;
  }
`

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginData = {
    email: email,
    password: password,
  }

  const handleLogin = async () => {
    try {
      const { data } = await loginUser(loginData)
      saveAuthToCookie(data.accessToken)
      alert(data.message)

      const {
        data: { user },
      } = await getUser()
      saveUserToCookie(JSON.stringify(user))
      dispatch(login())
      navigate('/')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <Container>
        <GridContainer>
          <div>
            <label htmlFor="email">?????????</label>
            <input
              autoComplete="off"
              type="text"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              placeholder="???????????? ???????????????."
            />
          </div>
          <div>
            <label htmlFor="pwd">????????????</label>
            <input
              autoComplete="off"
              type="password"
              id="pwd"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              placeholder="??????????????? ???????????????."
            />
          </div>
          <StyledBtn onClick={handleLogin}>???????????????</StyledBtn>
          <div>
            <span>?????? ????????? ????????????????</span>
            <Link to={'/join'}>??????????????????</Link>
          </div>
        </GridContainer>
      </Container>
    </>
  )
}
export default Login
