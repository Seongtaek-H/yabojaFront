import { useState } from 'react'
import Poster from '../components/Poster'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  width: 100%;
  min-width: var(--min-width);
  grid-template-rows: repeat(2, max-content);
  justify-items: center;
  align-items: center;
`
const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`
const MainText = styled(Main)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin: 2rem 0;
`
const SearchBar = styled(Main)`
  position: relative;

  input {
    padding: 1rem;
    width: 70rem;
    border: 5px green solid;
    border-radius: 2rem;
    font-size: 4rem;
  }

  input:focus {
    outline: none;
  }

  i {
    cursor: pointer;
    font-size: 3rem;
    z-index: 10;
    position: absolute;
    color: #707070;
    right: 2rem;
    :hover {
      transform: scale(1.2);
    }
  }
`
const Type = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  margin: 2rem 0;
`
const Result = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem 1rem;
`

function Search() {
  const API_KEY = process.env.REACT_APP_API_KEY
  const [keyword, setKeyword] = useState('')
  const [movies, setMovies] = useState('')
  const [tvs, setTvs] = useState('')

  const searchMovie = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
      )
    ).json()
    setMovies(json)
  }

  const searchTV = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
      )
    ).json()
    setTvs(json)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    searchMovie()
    searchTV()
  }

  const onChange = (e) => {
    setKeyword(e.target.value)
  }

  return (
    <>
      <Container>
        <form id="frm" onChange={onChange} onSubmit={onSubmit}>
          <MainText>?????? ?????? ????????? TV ???????????? ????????? ???????????????.</MainText>
          <SearchBar>
            <input type="text" required />
            <i type="submit" className="fas fa-search" onClick={onSubmit}></i>
          </SearchBar>
        </form>
        <div>
          {movies ? (
            <>
              <Type>??????</Type>
              <Result>
                {movies.results.map((poster) => (
                  <Poster type="movie" poster={poster} />
                ))}
              </Result>
            </>
          ) : (
            ''
          )}
          {tvs ? (
            <>
              <Type>TV ?????????</Type>
              <Result>
                {tvs.results.map((poster) => (
                  <Poster type="tv" poster={poster} />
                ))}
              </Result>
            </>
          ) : (
            ''
          )}
        </div>
      </Container>
    </>
  )
}

export default Search
