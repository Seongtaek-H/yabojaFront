import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Loading from '../components/loading'
import { getUserFromCookie } from '../utils/cookie'

const GridWrapper = styled.div`
  display: grid;
  height: 90vh;
  min-width: var(--min-width);
  background-size: cover;
  background-position: center center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),
    url(${(props) => props.url});
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 2fr;
`

const Poster = styled.div`
  width: 20rem;
  height: 25rem;
  background-image: url(${(props) => props.url});
  background-size: 100% 100%;
  background-position: center center;
  background-color: white;
  border-radius: 10px;
`
const StyledDetail = styled.div`
  width: 85%;
  background-color: transparent;

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
  margin-top: 2rem;
  font-size: 1.25rem;
`

const Medium = styled.div`
  font-size: 20px;
  display: inline-block;
  font-family: 'Noto500';
`
const Btn = styled.button`
  color: #fff;
  background-color: orange;
  width: 12rem;
  height: 5rem;
  font-size: 1.5rem;
  border: none;
  border-radius: 5px;
  justify-content: center;
  margin-top: 2rem;
  &:hover {
    opacity: 0.8;
    transition: all 0.3s;
  }
`

function Detail() {
  const API_KEY = process.env.REACT_APP_API_KEY
  const navigate = useNavigate()
  const { id, type } = useParams()
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState([])
  useEffect(() => {
    getContent()
  }, [])
  const getContent = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=ko-KR&page=1`
      )
    ).json()
    setLoading(false)
    setContent(json)
  }
  const makeImagePath = (id) => {
    return `https://image.tmdb.org/t/p/original/${id}`
  }
  const handleCheckLogin = () => {
    if (getUserFromCookie()) {
      navigate(`/review/${type}/${content.id}`)
    } else {
      if (
        window.confirm(
          '로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.'
        )
      ) {
        navigate('/login')
      }
    }
  }
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <GridWrapper url={makeImagePath(content.backdrop_path)}>
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
              <Btn onClick={handleCheckLogin}>리뷰게시판</Btn>
            </StyledDetail>
          </GridWrapper>
        </>
      )}
    </>
  )
}

export default Detail
