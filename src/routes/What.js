import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Loading from '../components/loading'
import Poster from '../components/Poster'

const Wrapper = styled.div`
  width: 100vw;
  min-width: var(--min-width);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FilterContainer = styled.div`
  display: flex;
  width: 60rem;
  color: white;
  height: 4rem;
  margin: 3rem 0;
  background-color: #707070;
  overflow: hidden;
  border-radius: 1rem;
`

const Filter = styled.div`
  width: calc(100% / 2);
  background-color: ${(props) => props.bgcolor || 'gray'};
  color: ${(props) => props.color || 'white'};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GridWrapper2 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem 1rem;
`

function What() {
  const API_KEY = process.env.REACT_APP_API_KEY
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [tvs, setTVs] = useState([])
  const [flag, setflag] = useState(true)
  const [flag2, setflag2] = useState(false)

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json()
    setMovies(json.results)
  }
  const getTVs = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json()
    setTVs(json.results)
  }
  useEffect(() => {
    getMovies()
    getTVs()
    setLoading(false)
  }, [])
  const selectType = () => {
    setflag((prev) => !prev)
    if (flag2 === true) {
      setflag2((prev) => !prev)
    }
  }

  const selectType2 = () => {
    setflag2((prev) => !prev)
    if (flag === true) {
      setflag((prev) => !prev)
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Wrapper>
          <FilterContainer>
            <Filter
              onClick={() => {
                if (!flag) selectType()
              }}
              bgcolor={flag === true ? 'white' : ''}
              color={flag === true ? 'gray' : ''}
            >
              영화
            </Filter>
            <Filter
              onClick={() => {
                if (!flag2) selectType2()
              }}
              bgcolor={flag2 === true ? 'white' : ''}
              color={flag2 === true ? 'gray' : ''}
            >
              TV 시리즈
            </Filter>
          </FilterContainer>

          {flag ? (
            <GridWrapper2>
              {movies.map((poster) => (
                <Poster key={poster.id} type="movie" poster={poster} />
              ))}
            </GridWrapper2>
          ) : null}

          {flag2 ? (
            <GridWrapper2>
              {tvs.map((poster) => (
                <Poster key={poster.id} type="tv" poster={poster} />
              ))}
            </GridWrapper2>
          ) : null}
        </Wrapper>
      )}
    </>
  )
}

export default What
