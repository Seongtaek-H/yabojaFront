import { Link } from 'react-router-dom'

const Upcoming = ({ date, contents, month, year }) => {
  return (
    <div>
      {contents.map((content) =>
        parseInt(content.release_date.split('-')[2]) === date &&
        parseInt(content.release_date.split('-')[1]) === month + 1 &&
        parseInt(content.release_date.split('-')[0]) === year ? (
          <Link
            style={{
              textDecoration: 'none',
              color: 'pink',
              cursor: 'pointer',
            }}
            to={`/MovieDetail/${content.id}`}
          >
            {content.title}
            <br />
          </Link>
        ) : (
          ''
        )
      )}
    </div>
  )
}

export default Upcoming
