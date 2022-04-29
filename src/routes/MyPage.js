// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { apiAxios } from '../api/axios'
// import { getCookie } from '../utils/cookie'
import { Link } from 'react-router-dom'
import { userReview } from '../constants/dummy'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { getCookie } from '../utils/cookie'
import { apiAxios } from '../api/axios'
import { useEffect, useState } from 'react'

const Container = styled.div`
  padding: 150px 120px;
`
const UserInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 3%;
  p {
    font-size: 1.5rem;
  }
`
const Avatar = styled.div`
  width: 55px;
  height: 55px;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3d3d3d;
  border-radius: 50%;
`

const ContentContainer = styled.div`
  background-color: #3d3d3d;
  padding: 20px;
  border-radius: 10px;
`

const BtnContainer = styled.div`
  margin-top: 1%;
  display: flex;
  width: 18%;
  justify-content: space-between;
`

const StyledBtn = styled.button`
  cursor: pointer;
  &:hover {
    color: orange;
  }
`

const StyledLink = styled(Link)`
  all: unset;
  cursor: pointer;
`

const ReviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  margin-bottom: 5px;
  padding: 4px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #171721;
  }
`

function MyPage() {
  const state = useSelector((state) => state)
  const token = getCookie('token')
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    getReviews()
  }, [])

  const getReviews = async () => {
    const res = await apiAxios.get(`review?id=${state.id}`)
    if (res.data) {
      setReviews(res.data.reviews)
    }
  }
  // const API_KEY = process.env.REACT_APP_API_KEY
  // const getReviewName = async ({ review }) => {

  //   const res = await apiAxios.get(
  //     `https://api.themoviedb.org/3/${review.targetType}/${review.targetId}?api_key=${API_KEY}&language=ko-KR&page=1`
  //   )
  //   console.log(res)
  // }

  // console.log(reviews[0])

  return (
    <Container>
      <UserInfo>
        <Avatar>{state.name[0]}</Avatar>
        <p>{state.name}님</p>
      </UserInfo>
      <ContentContainer>
        <h4>내가 쓴 리뷰</h4>
        <hr></hr>
        <div>
          {reviews.map((review) => {
            return (
              <StyledLink
                key={review.no}
                to={`/detail/${review.targetType}/${review.targetId}`}
              >
                <ReviewContainer>
                  <span>{review.contents}</span>
                  <span>{review.targetId}</span>
                </ReviewContainer>
              </StyledLink>
            )
          })}
        </div>
      </ContentContainer>
      <BtnContainer>
        <StyledBtn type="button">회원정보 수정</StyledBtn>
        <StyledBtn type="button">회원탈퇴</StyledBtn>
      </BtnContainer>
    </Container>
  )
}

export default MyPage
