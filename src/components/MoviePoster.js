import {Link} from "react-router-dom";

function MoviePoster({movie, styles}) {

    const makeImagePath = (id, format) => {
        return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`
      }

    return (
        <Link style={{
            textDecoration:"none",}}
            to={`/Moviedetail/${movie.id}`}>
            <div
            className={styles.box}
            style={{
              backgroundImage: `url(${makeImagePath(movie.poster_path)})`,
              }}>
              </div>
          </Link>
    );
  }
  
  export default MoviePoster
  