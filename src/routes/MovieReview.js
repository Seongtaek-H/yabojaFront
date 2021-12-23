import { AnimatePresence, motion, useViewportScroll } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useNavigate, useMatch } from 'react-router-dom'
import Button from '../components/Button'
import Menu from '../components/Menu'
import styles from '../css/Review.module.css'

function MovieReview() {
  const state = useSelector((state) => state)

  const navigate = useNavigate()
  const writeMatch = useMatch('/movieReview/:id/write')
  const { scrollY } = useViewportScroll()

  const { id } = useParams()

  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState([])
  const [reviews, setReviews] = useState([])
  const [score, setScore] = useState(0)
  const [text, setText] = useState('')

  const getContent = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=6df683327f9037c362fcff75540a2656&language=en-US&page=1`
      )
    ).json()
    setContent(json)
    setLoading(false)
  }

  const getReviews = async () => {
    const json = await (
      await fetch(`/buyus/readreview/?reviewTitle=${content.title}`)
    ).json()
    setReviews(json)
  }
  useEffect(() => {
    getContent()
  }, [loading])

  useEffect(() => {
    getReviews()
  }, [content])

  const makeImagePath = (id, format) => {
    return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`
  }

  const onWriteClicked = () => {
    navigate(`/movieReview/${content.id}/write`)
  }

  const onOverlayClick = () => {
    navigate(`/movieReview/${content.id}`)
    setScore(0)
  }

  const scoreChange = (e) => {
    setScore(e.target.value)
  }

  const textChange = (e) => {
    setText(e.target.value)
  }

  const handletheSubmit = (e) => {
    e.preventDefault()
    postHandler()
    navigate(`/movieReview/${content.id}`)
  }

  const refresh = () => {
    window.location.replace(`/movieReview/${content.id}`)
  }

  let body = {
    id: state.yaId,
    reviewTitle: content.title,
    eval: score,
    reviewBody: text,
  }

  const postHandler = () => {
    fetch('/buyus/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(body),
    })
  }

  return (
    <>
      {loading ? (
        ''
      ) : (
        <div>
          <Menu />
          <div className={styles.blank}></div>
          <div>
            <div className={styles.writeBtn} onClick={onWriteClicked}>
              <i class="fas fa-pen-square"></i>
            </div>
          </div>
          <div
            className={styles.background}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,1)), url(${makeImagePath(
                content.backdrop_path
              )})`,
            }}
          >
            <div className={styles.blank}></div>
            <AnimatePresence onExitComplete={refresh}>
              {writeMatch ? (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onOverlayClick}
                    className={styles.overlay}
                  ></motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={styles.writeBox}
                    style={{ top: scrollY }}
                  >
                    <div className={styles.how}>이 작품, 어떠셨나요?</div>
                    <div className={styles.posterBox}>
                      <div
                        className={styles.poster}
                        style={{
                          backgroundImage: `url(${makeImagePath(
                            content.poster_path
                          )})`,
                        }}
                      ></div>
                    </div>
                    <form onSubmit={handletheSubmit} className={styles.formBox}>
                      <div className={styles.rate}>
                        <input
                          onClick={scoreChange}
                          type="radio"
                          name="rating"
                          value="5"
                          id="rate1"
                        />
                        <label for="rate1">
                          <i class="fas fa-star"></i>
                        </label>
                        <input
                          onClick={scoreChange}
                          type="radio"
                          name="rating"
                          value="4"
                          id="rate2"
                        />
                        <label for="rate2">
                          <i class="fas fa-star"></i>
                        </label>
                        <input
                          onClick={scoreChange}
                          type="radio"
                          name="rating"
                          value="3"
                          id="rate3"
                        />
                        <label for="rate3">
                          <i class="fas fa-star"></i>
                        </label>
                        <input
                          onClick={scoreChange}
                          type="radio"
                          name="rating"
                          value="2"
                          id="rate4"
                        />
                        <label for="rate4">
                          <i class="fas fa-star"></i>
                        </label>
                        <input
                          onClick={scoreChange}
                          type="radio"
                          name="rating"
                          value="1"
                          id="rate5"
                        />
                        <label for="rate5">
                          <i class="fas fa-star"></i>
                        </label>
                      </div>
                      <div className={styles.write}>
                        <input
                          onChange={textChange}
                          type="text"
                          placeholder="작품에 대한 감상을 남겨주세요."
                        />
                      </div>
                      <div>
                        <Button type={'submit'} text={'작성하기'} />
                      </div>
                    </form>
                  </motion.div>
                </>
              ) : (
                ''
              )}
            </AnimatePresence>

            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.seq_review} className={styles.reviewBox}>
                  <div>
                    <div className={styles.id}>{review.id}</div>
                    <div className={styles.eval}>⭐️{review.eval}</div>
                    <div className={styles.reviewBody}>{review.reviewBody}</div>
                  </div>
                  <div className={styles.gridContainer}>
                    <div className={styles.like}>
                      <i class="fas fa-heart fa-lg"></i>좋아요
                    </div>
                    <div className={styles.comment}>
                      <i class="fas fa-comment-alt fa-lg"></i>댓글달기
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className={styles.noReview}>작성된 리뷰가 없습니다.</h1>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default MovieReview
