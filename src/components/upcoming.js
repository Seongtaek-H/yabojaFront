import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: pink;
  cursor: pointer;

  &:hover {
    transition: all 0.1s ease-in-out;
    color: orange;
  }
`

const Upcoming = ({ date, contents, month, year }) => {
  return (
    <div>
      {contents.map((content) =>
        parseInt(content.release_date.split('-')[2]) === date &&
        parseInt(content.release_date.split('-')[1]) === month + 1 &&
        parseInt(content.release_date.split('-')[0]) === year ? (
          <StyledLink to={`/detail/movie/${content.id}`}>
            {content.title}
          </StyledLink>
        ) : (
          ''
        )
      )}
    </div>
  )
}

export default Upcoming
