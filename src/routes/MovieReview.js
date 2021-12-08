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
      setLoading(false);
      setContent(json)
  }

  const getReviews = async () => {
      const json = await (
          await fetch('/buyus/readreview?reviewTitle=ironman')
      ).json();
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
                  }}>
                      <div className={styles.title}>{content.title}</div>
                    {reviews.map((review)=>(
                        <div key={review.seq_review} className={styles.reviewBox}>
                            <div>
                                <div className={styles.id}>review.id</div>
                                <div className={styles.eval}>⭐️review.eval</div>
                                <div className={styles.reviewBody}>reviewBody</div>
                            </div>
                            <div className={styles.gridContainer}>
                                <div className={styles.like}><i class="fas fa-heart fa-lg"></i>좋아요</div>
                                <div className={styles.comment}><i class="fas fa-comment-alt fa-lg"></i>댓글달기</div>
                            </div>
                        </div>))}
                  </div>
            </div>
          )}
        </div>
    )
          }
  
  export default MovieReview