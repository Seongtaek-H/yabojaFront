import styles from '../css/What.module.css'
import { useState, useEffect } from 'react'
import Menu from '../components/Menu'

function What() {
  const [movies, setMovies] = useState([])
  const [tvs, setTVs] = useState([])

  const getMovies = async () => {
    const json = await (
      await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=6df683327f9037c362fcff75540a2656&language=en-US&page=1'
      )
    ).json()
    setMovies(json.results)
  }

  const getTVs = async () => {
    const json = await (
      await fetch(
        'https://api.themoviedb.org/3/tv/popular?api_key=6df683327f9037c362fcff75540a2656&language=en-US&page=1'
      )
    ).json()
    setTVs(json.results)
  }
  useEffect(()=>{
    getMovies();
  }, [])
  useEffect(()=>{
    getTVs();
  }, [])

  const [flag, setflag] = useState(true)
  const [flag2, setflag2] = useState(false)
  const [flag3, setflag3] = useState(false)

  const selectType = () => {
    setflag((prev) => !prev)

    if (flag2 === true) {
      setflag2((prev) => !prev)
    }

    if (flag3 === true) {
      setflag3((prev) => !prev)
    }
  }
  const selectType2 = () => {
    setflag2((prev) => !prev)

    if (flag === true) {
      setflag((prev) => !prev)
    }

    if (flag3 === true) {
      setflag3((prev) => !prev)
    }
  }

  const selectType3 = () => {
    setflag3((prev) => !prev)

    if (flag === true) {
      setflag((prev) => !prev)
    }

    if (flag2 === true) {
      setflag2((prev) => !prev)
    }
  }

  const makeImagePath = (id, format) => {
    return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`
  }


  return (
    <div className={styles.wrapper}>
      <Menu />
      <div className={styles.blank}></div>

      <div className={styles.gridContainer}>
        <div className={styles.Netflix}></div>
        <div className={styles.Disney}></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={styles.gridContainer2}>
        <div
          className={flag ? styles.clicked : ''}
          onClick={flag ? '' : selectType}
        >
          All
        </div>
        <div
          className={flag2 ? styles.clicked2 : ''}
          onClick={flag2 ? '' : selectType2}
        >
          영화
        </div>
        <div
          className={flag3 ? styles.clicked3 : ''}
          onClick={flag3 ? '' : selectType3}
        >
          TV
        </div>
      </div>

        {flag ? <><div className={styles.gridContainer3}>{tvs.map((tv) => <div style={{
        height: 100, color: "white"
      }}>{tv.name}</div>)}</div><div className={styles.gridContainer3}>{movies.map((movie) => <div style={{
        height: 100, color: "white"
      }}>{movie.title}</div>)}</div></>
                  
                   : null}
        {flag2 ? <div className={styles.gridContainer3}>{movies.map((movie)=><div style={{
                    height: 100 , color: "white"
                  }}>{movie.title}</div>)}</div> : null}
        {flag3 ? <div className={styles.gridContainer3}>{tvs.map((tv)=><div style={{
                    height: 100 , color: "white"
                  }}>{tv.name}</div>)}</div> : null}
    </div>
    
  )
}

export default What
