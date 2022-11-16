import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper'

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

const Container = styled.div`
  h1 {
    font-size: 2rem;
    font-family: 'Noto500';
    margin-bottom: 1vh;
    padding-left: 10px;
  }
  width: 100%;
  max-width: 1920px;
`

const Poster = styled.img`
  width: 100%;
  max-width: 25vw;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
    transition: opacity 0.2s linear;
  }
`

function Slider({ title, criteria }) {
  const API_KEY = process.env.REACT_APP_API_KEY
  const [contents, setContents] = useState([])

  useEffect(() => {
    getContents()
  }, [])
  const makeContentsPath = (criteria) => {
    return `https://api.themoviedb.org/3/movie/${criteria}?api_key=${API_KEY}`
  }
  const getContents = async () => {
    const json = await (await fetch(makeContentsPath(criteria))).json()
    setContents(json.results)
  }

  const makeImagePath = (id, format) => {
    return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`
  }

  return (
    <Container>
      <h1>{title}</h1>
      <Swiper
        modules={[Navigation, Scrollbar]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        scrollbar={{ draggable: true }}
      >
        {contents.map((content) => (
          <SwiperSlide>
            <Link key={content.id} to={`/detail/movie/${content.id}`}>
              <Poster
                src={makeImagePath(content.backdrop_path, 'w500')}
              ></Poster>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}

export default Slider
