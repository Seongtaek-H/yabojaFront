import { useEffect, useState } from 'react'

import Menu from '../components/Menu'
import Slider from '../components/Slider'
import styles from '../css/Home.module.css'
import { useSelector } from 'react-redux'
import { getCookie } from '../utils/cookie'

function Home() {
  //   let state = useSelector((state) => state)
  //   console.log(state)
  //   const cookie = getCookie('jwt')
  //   console.log(cookie)
  const [loading, setLoading] = useState(true)
  const [contents, setContents] = useState([])
  const getContents = async () => {
    const json = await (
      await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=6df683327f9037c362fcff75540a2656&language=en-US&page=1'
      )
    ).json()
    setContents(json.results)
    setLoading(false)
  }
  useEffect(() => {
    getContents()
  }, [])

  const makeImagePath = (id, format) => {
    return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`
  }

  const ranNum = Math.floor(Math.random() * 19)

  return (
    <div>
      {loading ? (
        ''
      ) : (
        <div>
          <Menu />
          <div className={styles.blank}></div>
          <div
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), url(${makeImagePath(
                contents[ranNum].backdrop_path
              )})`,
            }}
            className={styles.gridContainer}
          >
            <div className={styles.titleContainer}>
              <span className={styles.title1}>야보자! 이거어때?</span>
              <span className={styles.title2}>에서</span>
              <span style={{ display: 'block' }} className={styles.title2}>
                원하는 콘텐츠들을 만나보세요.
              </span>
            </div>
          </div>
          <Slider title="Top Rated" criteria="top_rated" />
          <div className={styles.blank2}></div>
          <Slider title="Now Playing" criteria="now_playing" />
        </div>
      )}
    </div>
  )
}

export default Home
