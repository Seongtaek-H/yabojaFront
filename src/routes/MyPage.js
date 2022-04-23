// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { apiAxios } from '../api/axios'
// import { getCookie } from '../utils/cookie'
import { Link } from 'react-router-dom'
import { userData, userReview } from '../constants/dummy'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { getCookie } from '../utils/cookie'

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
  let state = useSelector((state) => state)
  const token = getCookie('token')
  console.log(state)
  // const [review, setReview] = useState([])
  // const navigate = useNavigate()
  // const [showModal, setShowModal] = useState('')

  // const myJwt = {
  //   jwt: jwt,
  // }

  // const user = async () => {
  //   const result = await apiAxios.post('/buyus/me/info', JSON.stringify(myJwt))
  //   return result
  // }
  // const userData = async () => {
  //   try {
  //     const response = await user()
  //     setReview(response.data.review)
  //   } catch (error) {
  //     console.error(error.response)
  //   }
  // }
  // useEffect(() => {
  //   userData()
  // }, [])

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
          {userReview.map((review) => (
            <StyledLink to={`/detail/${review.type}/${review.id}`}>
              <ReviewContainer>
                <span>{review.content}</span>
                <span>{review.reviewTitle}</span>
              </ReviewContainer>
            </StyledLink>
          ))}
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
