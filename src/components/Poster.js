import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledPoster = styled.div`
  width: 200px;
  height: 300px;
  background-image: url(${(props) => props.poster});
  background-size: 100% 100%;
  background-position: center center;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: 0.7;
  border: #707070 solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  &:hover {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    transform: translateY(-15px);
    opacity: 1;
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

function Poster({ poster, type }) {
  const makeImagePath = (id) => {
    return `https://image.tmdb.org/t/p/original/${id}`
  }

  return (
    <StyledLink to={`/detail/${type}/${poster.id}`}>
      <StyledPoster poster={makeImagePath(poster.poster_path)}>
        {poster.poster_path
          ? ''
          : type === 'Movie'
          ? poster.title
          : poster.name}
      </StyledPoster>
    </StyledLink>
  )
}

export default Poster
