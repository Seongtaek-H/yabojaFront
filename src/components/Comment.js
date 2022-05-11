import styled from 'styled-components'

const StyledTextarea = styled.div`
  margin-top: 5px;
  background-color: #171721;
  border-radius: 10px;
  width: 40vw;
  height: 10vh;
  padding: 20px;
  align-items: center;
  display: flex;
  input {
    all: unset;
    margin-left: 30px;
    width: 80%;
    height: 100%;
    border-bottom: 1px gray solid;
  }
  button {
    background-color: gray;
    cursor: pointer;
  }
`

export const Comment = (props) => {
  return (
    <StyledTextarea>
      <span>↳ 내 아이디 </span>
      <p>{props.data.contents}</p>
    </StyledTextarea>
  )
}
