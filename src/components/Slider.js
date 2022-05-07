import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  h2 {
    padding-left: 10px;
    padding-bottom: 10px;
    cursor: pointer;
    font-family: 'Noto100';
  }
  position: relative;
`

const MotionContainer = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
  position: absolute;
  z-index: 5;
`

const MotionBox = styled(motion.div)`
  height: 200px;
  background-image: url(${(props) => props.poster});
  background-color: white;
  background-size: cover;
  background-position: center center;
  margin-bottom: 10px;
  &:hover {
    opacity: 0.5;
    transition: opacity 0.2s linear;
  }
`
const StyleBtn = styled.button`
  font-size: 2rem;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  background-color: gray;
  opacity: 0.8;
  position: absolute;
  right: 1vw;
  top: 15vh;
  z-index: 10;
  @media screen and (max-width: 412px) {
    top: 17vh;
  }
`
function Slider({ title, criteria }) {
  const API_KEY = process.env.REACT_APP_API_KEY

  const makeContentsPath = (criteria) => {
    return `https://api.themoviedb.org/3/movie/${criteria}?api_key=${API_KEY}`
  }

  const [contents, setContents] = useState([])
  const getContents = async () => {
    const json = await (await fetch(makeContentsPath(criteria))).json()
    setContents(json.results)
  }

  useEffect(() => {
    getContents()
  }, [])

  const [index, setindex] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const toggleLeaving = () => setLeaving((prev) => !prev)
  const increaseIndex = () => {
    if (contents) {
      if (leaving) return
      setLeaving(true)
      const totalContents = contents.length
      const maxIndex = Math.ceil(totalContents / offset) - 1
      setindex((prev) => (prev === maxIndex ? 0 : prev + 1))
    }
  }

  const offset = 4

  const makeImagePath = (id, format) => {
    return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`
  }

  const rowVariants = {
    hidden: {
      x: window.outerWidth,
    },
    visible: {
      x: 0,
    },
    exit: {
      x: -window.outerWidth,
    },
  }

  return (
    <Wrapper>
      <h2>{title}</h2>
      <StyleBtn onClick={increaseIndex}>
        <i className="fa-solid fa-chevron-right"></i>
      </StyleBtn>
      <AnimatePresence onExitComplete={toggleLeaving}>
        <MotionContainer
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 2 }}
          key={index}
        >
          {contents
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((content) => (
              <Link key={content.id} to={`/detail/movie/${content.id}`}>
                <MotionBox
                  poster={makeImagePath(content.backdrop_path, 'w500')}
                ></MotionBox>
              </Link>
            ))}
        </MotionContainer>
      </AnimatePresence>
    </Wrapper>
  )
}

export default Slider
