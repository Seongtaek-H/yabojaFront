import styles from '../css/Search.module.css'
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
    padding-left: 60px;
    border: none;
    border-radius: 30px;
    width: 100%;
    font-family: 'NotoSansKR-Thin';
  }

  input:focus {
    outline: none;
  }

  i {
    font-size: 35px;
    z-index: 10;
    position: absolute;
    color: #707070;
    left: 20px;
  }
`

const Type = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  font-family: 'NotoSansKR-Thin';
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
  const [keyword, setKeyword] = useState('')
  const [movies, setMovies] = useState('')
  const [tvs, setTvs] = useState('')

  const searchMovie = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=6df683327f9037c362fcff75540a2656&language=en-US&query=${keyword}&page=1&include_adult=false`
      )
    ).json()
    setMovies(json)
  }

  const searchTV = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=6df683327f9037c362fcff75540a2656&language=en-US&query=${keyword}&page=1&include_adult=false`
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
        <form
          id="frm"
          className={styles.search}
          onChange={onChange}
          onSubmit={onSubmit}
        >
          <MainText>찾고 싶은 영화나 TV 시리즈의 제목을 입력하세요.</MainText>
          <SearchBar>
            <input type="text" required />
            <i class="fas fa-search"></i>
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
