# 야보자(Yaboja)

**[바로가기](https://yaboja.netlify.app/)**

최신 영화 및 TV 시리즈 정보를 제공하고, 리뷰 및 댓글을 통해 이용자들의 의견을 교환할 수 있는 커뮤니티 사이트
<br>
![](https://i.imgur.com/fUIiR5K.jpg)

## 목차

- [🎯 Project's Goal](#---project-s-goal)
- [🖥 Function](#---function)
- [🧑🏻‍💻 Skills](#--------skills)
- [⚙ Environment](#--environment)
- [🔧 Deployment](#---deployment)
- [📒 Usage](#---usage)
  - [실행하기](#----)
  - [OS별 명령어 수정](#os--------)
- [🙋🏻‍♂️ Members](#--------members)

<br>

## 🎯 Project's Goal

컨텐츠가 넘쳐나는 요즘, 정작 볼만한게 없다며 불평하는 사람들이 늘어나고 있다. 최신 컨텐츠들의 정보와 다른 소비자들이 공유한 의견을 참고하여 내가 볼 컨텐츠를 선택할 수 있게 하고, 내가 본 영화나 드라마의 진한 여운을 여러 사람들과 공유하며 2차적으로 컨텐츠를 소비할 수 있는 공간을 만들고 싶었다.
<br>

## 🖥 Function

- 회원가입 및 로그인 - [동영상보기](https://youtu.be/TyLJzet6xIM)
- 최신 영화 및 TV 시리즈 보기 - [동영상보기](https://youtu.be/yPLXd0lBRmM)
- 컨텐츠 검색 페이지 - [동영상보기](https://youtu.be/KVZLj39vkgk)
- 컨텐츠별 리뷰 게시판 - [동영상보기](https://youtu.be/4rcm3tqrw8w)
- 리뷰별 댓글, 좋아요 - [동영상보기](https://youtu.be/FiGCMYCEUjU)
  <br>

## 🧑🏻‍💻 Skills

`Front-end` : <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/><img src="https://img.shields.io/badge/javascript-yellow?style=flat-square&logo=javascript&logoColor=black"/><img src="https://camo.githubusercontent.com/0e2d61e6eed05d238f8996c0ea0c3f7d37994dd107a5b172275b4c85669aaf3d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f7374796c656420636f6d706f6e656e74732d4442373039333f7374796c653d666c61742d737175617265266c6f676f3d7374796c65642d636f6d706f6e656e7473266c6f676f436f6c6f723d7768697465"/>

`Back-end` : <img src="https://img.shields.io/badge/nestJS-black?style=flat-square&logo=nestjs&logoColor=red"/><img src="https://img.shields.io/badge/Typescript-blue?style=flat-square&logo=Typescript&logoColor=white"/><img src="https://img.shields.io/badge/passport-green?style=flat-square&logo=passport&logoColor=black"/><img src="https://img.shields.io/badge/axios-purple?style=flat-square&logo=Axios&logoColor=black"/><img src="https://img.shields.io/badge/bcrypt-navy?style=flat-square&logo=bcrypt&logoColor=black"/>
<br>

## ⚙ Environment

<img src="https://img.shields.io/badge/Eslint-4B32C3?style=flat-square&logo=Eslint&logoColor="/><img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white"/>
<img src="https://img.shields.io/badge/node17.3.1-green?style=flat-square&logo=node.js&logoColor=black"/><img src="https://img.shields.io/badge/yarn 1.22.10-black?style=flat-square&logo=yarn&logoColor=red"/><img src="https://img.shields.io/badge/postgres-blue?style=flat-square&logo=postgres&logoColor=red"/>
<br>

## 🔧 Deployment

<img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=Netlify&logoColor=black"/><img src="https://img.shields.io/badge/HEROKU-purple?style=flat-square&logo=HEROKU&logoColor=white"/>
<br>

## 📒 Usage

### 실행 전 주의사항

야보자 프로젝트는 tmdb api로 컨텐츠 관련 정보를 받아오고 있다. 보안을 높이기 위해 env 파일에 tmdb api키를 정의했고, gitignore 파일에 env 파일을 추가했다. 따라서 실행을 위해서는 tmdb api키를 발급받아 env 파일에 정의하는 작업이 먼저 이루어져야 한다.

```
// .env

REACT_APP_API_KEY=발급받은 API키
```

> https://www.themoviedb.org/
>
> 위 링크로 들어가 tmdb에 가입만 하면 api키를 바로 발급받을 수 있다.

### 실행하기

```
> npm run start
```

### OS별 명령어 수정

- 로컬에서 사용시 포트번호 4000번 적용
- package.json 파일에서 각 OS에 맞게 수정해준다.

```
// Window
...
  "scripts": {
    "start": "set PORT=4000 && craco start",
...
// Mac
...
  "scripts": {
    "start": "PORT=4000 craco start",
...

```

<br>

## 🙋🏻‍♂️ Members

`Front-end` : Seongtaek Hwang, Jung Young Jun

`Back-end` : lucid-jin

| Seongtaek Hwang                                           | Jung Young Jun                                            | lucid-jin                                                 |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| ![](https://avatars.githubusercontent.com/u/88193063?v=4) | ![](https://avatars.githubusercontent.com/u/83502672?v=4) | ![](https://avatars.githubusercontent.com/u/72450781?v=4) |
| [github](https://github.com/Seongtaek-H)                  | [github](https://github.com/dudwns0921)                   | [github](https://github.com/lucid-jin)                    |
