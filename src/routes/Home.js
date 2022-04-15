import { useEffect, useState } from 'react'
import Slider from '../components/Slider'
// import { useSelector } from 'react-redux'
import { getCookie } from '../utils/cookie'
import Loading from '../components/loading'

import styled from 'styled-components'
import { apiAxios } from '../api/axios'
import { useSelector } from 'react-redux'

const GridWrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-size: cover;
  padding-left: 20px;
`
const TitleContainer = styled.div`
  margin-left: 50px;
  display: inline-block;
  span:nth-child(1) {
    font-family: 'Noto500';
    font-size: 50px;
  }
  span:nth-child(2) {
    display: inline-block;
    font-size: 30px;
  }
  p {
    font-size: 30px;
  }
`
const Blank = styled.div`
  height: 250px;
`

function Home() {
  const [loading, setLoading] = useState(true)
  const [contents, setContents] = useState([])
  const getContents = async () => {
    const json = await (
      await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=6df683327f9037c362fcff75540a2656&language=en-US&page=1'
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
          <GridWrapper
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), url(${makeImagePath(
                contents[ranNum].backdrop_path
              )})`,
            }}
          >
            <TitleContainer>
              <span>야보자! 이거어때?</span>
              <span>에서</span>
              <p>원하는 콘텐츠들을 만나보세요.</p>
            </TitleContainer>
          </GridWrapper>
          <Slider title="Top Rated" criteria="top_rated" />
          <Blank></Blank>
          <Slider title="Now Playing" criteria="now_playing" />
        </>
      )}
    </>
  )
}

export default Home
