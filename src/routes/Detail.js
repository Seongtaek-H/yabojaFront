import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import Loading from '../components/loading'

const Bg = styled.div`
  width: 100vw;
  height: 90vh;
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),
    url(${(props) => props.url});
`

const GridWrapper = styled.div`
  display: grid;
  width: 100vw;
  height: 90vh;
  grid-auto-flow: column;
  grid-template-columns: 1fr 2fr;
`

const Poster = styled.div`
  width: 20vw;
  height: 30vw;
  position: relative;
  justify-self: center;
  top: 18vh;
  background-image: url(${(props) => props.url});
  background-size: 100% 100%;
  background-position: center center;
  background-color: white;
  border-radius: 10px;
`
const StyledDetail = styled.div`
  width: 85%;
  height: 500px;
  background-color: transparent;
  align-self: center;

  div:nth-child(1) {
    font-size: 50px;
    font-family: 'Noto700';
  }

  div:nth-child(2) {
    font-size: 20px;
    display: inline-block;
  }
`

const Thin = styled.div`
  margin-top: 30px;
  font-size: 20px;
`

const Medium = styled.div`
  font-size: 20px;
  display: inline-block;
  font-family: 'Noto500';
`
const Btn = styled.button`
  color: #fff;
  background-color: orange;
  width: 10vw;
  height: 5vh;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  justify-content: center;
  margin-top: 5vh;
  &:hover {
    opacity: 0.8;
    transition: all 0.3s;
  }
`

function Detail() {
  const API_KEY = process.env.REACT_APP_API_KEY
  const { id, type } = useParams()
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState([])

  const getContent = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=ko-KR&page=1`
      )
    ).json()
    setLoading(false)
    setContent(json)
  }
  useEffect(() => {
    getContent()
  }, [])

  const makeImagePath = (id) => {
    return `https://image.tmdb.org/t/p/original/${id}`
  }

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Bg url={makeImagePath(content.backdrop_path)}>
            <GridWrapper>
              <Poster url={makeImagePath(content.poster_path)}></Poster>

              <StyledDetail>
                <div>{type === 'movie' ? content.title : content.name}</div>
                <div>🎦</div>
                {content.genres
                  ? content.genres.map((genre) => (
                      <Medium key={genre.name}>{genre.name}&nbsp;</Medium>
                    ))
                  : '등록된 정보가 없습니다.'}
                <Medium>
                  &nbsp;🕐
                  {content.runtime
                    ? `${content.runtime}min`
                    : '등록된 정보가 없습니다.'}
                </Medium>
                <Medium>
                  &nbsp;⭐️
                  {content.vote_average
                    ? `${content.vote_average}`
                    : '등록된 정보가 없습니다.'}
                </Medium>
                <Thin>
                  {content.overview
                    ? content.overview
                    : '등록된 정보가 없습니다.'}
                </Thin>
                <Link to={`/review/${type}/${content.id}`}>
                  <Btn>리뷰게시판</Btn>
                </Link>
              </StyledDetail>
            </GridWrapper>
          </Bg>
        </>
      )}
    </>
  )
}

export default Detail
