import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Menu from "../components/Menu";
import styles from "../css/Review.module.css";

function MovieReview() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState([])
  const [reviews, setReviews] = useState([])

  const getContent = async () => {
      const json = await (
          await fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=6df683327f9037c362fcff75540a2656&language=en-US&page=1`
          )
      ).json()
      setContent(json)
  }

  const getReviews = async () => {
      const json = await (
          await fetch('/buyus/readreview?reviewTitle=')

          // url 수정 필요
      ).json();
      setLoading(false);
      setReviews(json);
  }

  useEffect(()=>{
      getContent();
  }, [])

  useEffect(()=>{
    getReviews();
}, [])

  const makeImagePath = (id, format) => {
      return `https://image.tmdb.org/t/p/${
          format ? format : 'original'
      }/${id}`
  }
    return (
        <div>
          {loading ? <h1>Loading</h1> :(
            <div>
              <Menu />
              <div className={styles.blank}></div>
              <div
                  className={styles.background}
                  style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${makeImagePath(
                          content.backdrop_path
                      )})`,
                  }}></div>
                {reviews.map((review)=>(<div>{review.reviewBody}</div>))}
            </div>
          )}
        </div>
    )
          }
  
  export default MovieReview