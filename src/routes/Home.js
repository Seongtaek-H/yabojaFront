import { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import Loading from '../components/loading'
import styled from 'styled-components'

const TitleContainer = styled.div`
  height: 45rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),
    url(${(props) => props.url});
  background-size: cover;
  div {
    margin-left: 3rem;
    span:nth-child(1) {
      font-family: 'Noto500';
      font-size: 3rem;
    }
    span:nth-child(2) {
      display: inline-block;
      font-size: 2rem;
    }
    p {
      font-size: 2rem;
    }
  }
  @media screen and (max-width: 412px) {
    display: none;
    height: auto;
  }
`
const SliderContainer = styled.div`
  height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
function Home() {
  const API_KEY = process.env.REACT_APP_API_KEY
  const [loading, setLoading] = useState(true)
  const [contents, setContents] = useState([])
  const getContents = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json()
    setContents(json.results)
    setLoading(false)
  }
  useEffect(() => {
    getContents()
  }, [])

  const makeImagePath = (id) => {
    return `https://image.tmdb.org/t/p/original/${id}`
  }

  const ranNum = Math.floor(Math.random() * 19)

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <TitleContainer url={makeImagePath(contents[ranNum].backdrop_path)}>
            <div>
              <span>야보자! 이거어때?</span>
              <span>에서</span>
              <p>원하는 콘텐츠들을 만나보세요.</p>
            </div>
          </TitleContainer>
          <SliderContainer>
            <Slider title="Top Rated" criteria="top_rated" />
            <Slider title="Now Playing" criteria="now_playing" />
          </SliderContainer>
        </>
      )}
    </>
  )
}

export default Home
