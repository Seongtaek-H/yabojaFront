import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { getUserFromCookie } from '../utils/cookie'
import { getMovieReviews, getReviewsWithId, getTvReviews } from '../api/axios'

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
  const [reviews, setReviews] = useState([])
  const [userData, setUserData] = useState('')

  useEffect(() => {
    setUserData(JSON.parse(getUserFromCookie()))
  }, [])

  useEffect(() => {
    const myReview = async () => {
      const res = await getReviewsWithId(JSON.parse(getUserFromCookie()).id)
      setReviews(res.data.reviews)
    }
    myReview()
  }, [])

  return (
    <Container>
      <UserInfo>
        <Avatar>{userData ? userData.name[0] : ''}</Avatar>
        <p>{userData ? userData.name : ''}님</p>
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
                  <span>{review.contents ? review.contents : '내용없음'}</span>
                  <span>{review.title ? review.title : '타이틀 없음'}</span>
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
