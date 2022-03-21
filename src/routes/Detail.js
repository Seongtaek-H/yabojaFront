import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Button from '../components/Button'
import styled from 'styled-components'

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
    font-family: 'NotoSansKr-Bold';
  }

  div:nth-child(2) {
    font-size: 20px;
    font-family: 'NotoSansKr-Medium';
    display: inline-block;
  }
`

const Thin = styled.div`
  margin-top: 30px;
  font-size: 20px;
  font-family: 'NotoSansKr-Thin';
`

const Medium = styled.div`
  font-size: 20px;
  font-family: 'NotoSansKr-Medium';
  display: inline-block;
`
const Btn = styled.div`
  margin-top: 30px;
  width: 350px;
  height: 500px;
  display: flex;
  justify-content: space-between;
`

function Detail() {
  const { id, type } = useParams()
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState([])

  const getContent = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=6df683327f9037c362fcff75540a2656&language=ko-KR&page=1`
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
        <h1>Loading...</h1>
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
                      <Medium>{genre.name}&nbsp;</Medium>
                    ))
                  : ''}
                <Medium>&nbsp;🕐{content.runtime}min&nbsp;</Medium>
                <Medium>&nbsp;⭐️{content.vote_average}</Medium>
                <Thin>{content.overview}</Thin>
                <Btn>
                  <Link to={`/review/${type}/${content.id}`}>
                    <Button text={'리뷰게시판'} />
                  </Link>
                  <Button text={'자유게시판'} />
                </Btn>
              </StyledDetail>
            </GridWrapper>
          </Bg>
        </>
      )}
    </>
  )
}

export default Detail
