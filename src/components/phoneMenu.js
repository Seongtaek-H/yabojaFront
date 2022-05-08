import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 8vh;
  position: fixed;
  bottom: 0%;
  background-color: gray;
  padding: 0 12vw;
  display: none;
  font-size: 2rem;
  justify-content: space-between;
  @media screen and (max-width: 412px) {
    display: flex;
    align-items: center;
  } ;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  cursor: pointer;
  &:hover,
  &:focus {
    transition: all 0.1s ease-in-out;
    transform: scale(1.1);
  }
`

export const PhoneMenu = () => {
  return (
    <Container>
      <StyledLink to="/what">
        <i className="fa-solid fa-film"></i>
      </StyledLink>
      <StyledLink to="/when">
        <i className="fas fa-calendar-alt"></i>
      </StyledLink>
      <StyledLink to="/search">
        <i className="fas fa-search"></i>
      </StyledLink>
    </Container>
  )
}
