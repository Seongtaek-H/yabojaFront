import {Link} from "react-router-dom";

function TVPoster({tv, styles}) {

  const makeImagePath = (id, format) => {
    return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`
  }

    return (
      <Link style={{
        textDecoration:"none",}}
        to={`/tvDetail/${tv.id}`}>
        <div
          className={styles.box} style={{
          backgroundImage: `url(${makeImagePath(tv.poster_path)})`,
                }}>
          </div>
      </Link>
    );
  }
  
  export default TVPoster
  