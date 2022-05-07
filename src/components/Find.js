// import { useState } from 'react'

// export const FindUserEmail = (name, phNum) => {
//   const [Email, setEmail] = useState('')

//   if (name && phNum) {
//     const findEmail = async () => {
//       try {
//         const response = await apiAxios.post(
//           `/login/findEmail`,
//           JSON.stringify({
//             name,
//             phNum,
//           })
//         )
//         setEmail(response.data.Email)
//       } catch (e) {
//         alert('올바른 값이 아닙니다')
//         console.error(e.response.error)
//       }
//     }
//     findEmail()
//   }
//   return Email
// }

// export const FindUserPwd = (email, phNum) => {
//   const [pwd, setPwd] = useState('')

//   if (email && phNum) {
//     const findPwd = async () => {
//       try {
//         const response = await apiAxios.post(
//           `/login/findEmail`,
//           JSON.stringify({
//             email,
//             phNum,
//           })
//         )
//         setPwd(response.data.pwd)
//       } catch (e) {
//         alert('올바른 값이 아닙니다')
//         console.error(e.response.error)
//       }
//     }
//     findPwd()
//   }
//   return pwd
// }
