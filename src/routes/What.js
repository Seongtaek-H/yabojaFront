import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Poster from '../components/Poster'

const Wrapper = styled.div`
  display: grid;
`

const GridWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  color: white;
  width: 50vw;
  height: 50px;
  margin-top: 50px;
  justify-self: center;
  background-color: #707070;
  overflow: hidden;
  border-radius: 10px;
`

const Filter = styled.div`
  background-color: ${(props) => props.bgcolor || 'gray'};
  color: ${(props) => props.color || 'white'};
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GridWrapper2 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 20px;
  margin-top: 50px;
  margin-bottom: 50px;
  justify-self: center;
`

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
  useEffect(() => {
    getMovies()
  }, [])
  useEffect(() => {
    getTVs()
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

  return (
    <Wrapper>
      <GridWrapper>
        <Filter
          onClick={flag ? '' : selectType}
          bgcolor={flag === true ? 'white' : ''}
          color={flag === true ? 'gray' : ''}
        >
          All
        </Filter>
        <Filter
          onClick={flag2 ? '' : selectType2}
          bgcolor={flag2 === true ? 'white' : ''}
          color={flag2 === true ? 'gray' : ''}
        >
          영화
        </Filter>
        <Filter
          onClick={flag3 ? '' : selectType3}
          bgcolor={flag3 === true ? 'white' : ''}
          color={flag3 === true ? 'gray' : ''}
        >
          TV 시리즈
        </Filter>
      </GridWrapper>

      {flag ? (
        <GridWrapper2>
          {tvs.map((poster) => (
            <Poster type="tv" poster={poster} />
          ))}
          {movies.map((poster) => (
            <Poster type="movie" poster={poster} />
          ))}
        </GridWrapper2>
      ) : null}

      {flag2 ? (
        <GridWrapper2>
          {movies.map((poster) => (
            <Poster type="movie" poster={poster} />
          ))}
        </GridWrapper2>
      ) : null}

      {flag3 ? (
        <GridWrapper2>
          {tvs.map((poster) => (
            <Poster type="tv" poster={poster} />
          ))}
        </GridWrapper2>
      ) : null}
    </Wrapper>
  )
}

export default What
