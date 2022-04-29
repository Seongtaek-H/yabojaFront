import { useState } from 'react'
import Poster from '../components/Poster'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(2, max-content);
  justify-items: center;
  align-items: center;
`
const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  margin-top: 30px;
`
const MainText = styled(Main)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  margin-top: 30px;
`
const SearchBar = styled(Main)`
  position: relative;

  input {
    padding: 20px;
    border: 5px green solid;
    border-radius: 30px;
    width: 60vw;
    font-size: 4rem;
  }

  input:focus {
    outline: none;
  }

  i {
    font-size: 3rem;
    z-index: 10;
    position: absolute;
    color: #707070;
    left: 53vw;
    :hover {
      transform: scale(1.2);
    }
  }
`

const Type = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  margin-top: 30px;
`

const Result = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 20px;
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
          <MainText>찾고 싶은 영화나 TV 시리즈의 제목을 입력하세요.</MainText>
          <SearchBar>
            <input type="text" required />
            <i type="submit" className="fas fa-search"></i>
          </SearchBar>
        </form>
        <div>
          {movies ? (
            <>
              <Type>영화</Type>
              <Result>
                {movies.results.map((poster) => (
                  <Poster type="Movie" poster={poster} />
                ))}
              </Result>
            </>
          ) : (
            ''
          )}
          {tvs ? (
            <>
              <Type>TV 시리즈</Type>
              <Result>
                {tvs.results.map((poster) => (
                  <Poster type="TV" poster={poster} />
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
