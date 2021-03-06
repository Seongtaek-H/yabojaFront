import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  h2 {
    padding-left: 0.5rem;
    padding-bottom: 0.5rem;
    font-family: 'Noto100';
  }
  position: relative;
`

const MotionContainer = styled(motion.div)`
  width: 100%;
  min-width: var(--min-width);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 0.5rem;
  position: absolute;
  z-index: 50;
`

const MotionBox = styled(motion.div)`
  height: 13rem;
  background-image: url(${(props) => props.poster});
  background-color: white;
  background-size: cover;
  background-position: center center;
  &:hover {
    opacity: 0.5;
    transition: opacity 0.2s linear;
  }
`
const StyledBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 13rem;
  cursor: pointer;
  font-size: 3rem;
  border: none;
  opacity: 0.8;
  position: absolute;
  right: ${(props) => (props.right ? '0px' : '')};
  left: ${(props) => (props.left ? '0px' : '')};
  z-index: 60;
  &:hover {
    background-color: gray;
  }
`
function Slider({ title, criteria }) {
  const offset = 5
  const API_KEY = process.env.REACT_APP_API_KEY
  const [contents, setContents] = useState([])
  const [index, setindex] = useState(0)
  const [reverse, setReverse] = useState(false)
  const [leaving, setLeaving] = useState(false)

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
  const toggleLeaving = () => setLeaving((prev) => !prev)
  const increaseIndex = () => {
    if (contents) {
      if (leaving) return
      setReverse(true)
      setLeaving(true)
      const totalContents = contents.length
      const maxIndex = Math.ceil(totalContents / offset) - 1
      setindex((prev) => (prev === maxIndex ? 0 : prev + 1))
    }
  }
  const decreaseIndex = () => {
    if (contents) {
      if (leaving) return
      setReverse(false)
      setLeaving(true)
      const totalContents = contents.length
      const maxIndex = Math.ceil(totalContents / offset) - 1
      setindex((prev) => (prev === 0 ? maxIndex : prev - 1))
    }
  }

  const makeImagePath = (id, format) => {
    return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`
  }

  const rowVariants = {
    hidden: (reverse) => {
      return {
        x: reverse ? window.outerWidth : -window.outerWidth,
      }
    },
    visible: {
      x: 0,
    },
    exit: (reverse) => {
      return {
        x: reverse ? -window.outerWidth : window.outerWidth,
      }
    },
  }

  return (
    <Wrapper>
      <h2>{title}</h2>
      <StyledBtn left onClick={decreaseIndex}>
        <i className="fa-solid fa-chevron-left"></i>
      </StyledBtn>
      <StyledBtn right onClick={increaseIndex}>
        <i className="fa-solid fa-chevron-right"></i>
      </StyledBtn>
      <AnimatePresence custom={reverse} onExitComplete={toggleLeaving}>
        <MotionContainer
          custom={reverse}
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
