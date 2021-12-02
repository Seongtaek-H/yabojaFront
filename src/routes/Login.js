import React, { useEffect, useState } from "react"
import { loginUser } from "../api/user"

function Login() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const handleInputId = (event) => {
    setId(event.target.value)
  }
  const handleInputPassword = (event) => {
    setPassword(event.target.value)
  }
  const onClickLogin = async () => {
    try {
      await loginUser({ id, password })
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label htmlFor="input_id">ID : </label>
        <input
          type="text"
          name="input_id"
          value={id}
          onChange={handleInputId}
        />
      </div>
      <div>
        <label htmlFor="input_pw">PW : </label>
        <input
          type="password"
          name="input_pw"
          value={password}
          onChange={handleInputPassword}
        />
      </div>
      <div>
        <button type="button" onClick={onClickLogin}>
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
