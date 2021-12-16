import { useEffect, useState } from "react";

import styles from "../css/Where.module.css";
import Menu from "../components/Menu";
import CustomPieChart from "../components/CustomPieChart";

function Where() {

  const [toggle, setToggle] = useState(true);
  const [service, setService] = useState("OTT 서비스를 선택하세요.");
  const [genresData, setGenresData] = useState([]);

  const getgenresData = async () => {
    const json = await (
      await fetch(
        '/buyus/count'
      )
    ).json()
    console.log(json);
    setGenresData(json);
  }

  useEffect(()=>{
    getgenresData();
  }, [])

  let movieDB = [
    {
      "id": "액션",
      "label": "액션",
      "value": genresData.Action,
    },
    {
      "id": "어드벤처",
      "label": "어드벤처",
      "value": genresData.Adventure,
    },
    {
      "id": "애니메이션",
      "label": "애니메이션",
      "value": genresData.Animation,
    },
    {
      "id": "코미디",
      "label": "코미디",
      "value": genresData.Comedy,
    },
    {
      "id": "범죄",
      "label": "범죄",
      "value": genresData.Crime,
    },
  ]
  // 실제로 데이터베이스에서 가져온 데이터

  const [genre, setGenre] = useState([]);

  let ottGenreData = [
    {
      "id": "액션",
      "label": "액션",
      "value": Math.floor( ( Math.random() * (500 - 1) + 300 ) ),
    },
    {
      "id": "어드벤처",
      "label": "어드벤처",
      "value": Math.floor( ( Math.random() * (500 - 1) + 300 ) ),
    },
    {
      "id": "애니메이션",
      "label": "애니메이션",
      "value": Math.floor( ( Math.random() * (500 - 1) + 300 ) ),
    },
    {
      "id": "코미디",
      "label": "코미디",
      "value": Math.floor( ( Math.random() * (500 - 1) + 300 ) ),
    },
    {
      "id": "범죄",
      "label": "범죄",
      "value": Math.floor( ( Math.random() * (500 - 1) + 300 ) ),
    },
  ]

  let userData = [
    {
      "id": "넷플릭스",
      "label": "넷플릭스",
      "value": 770,
    },
    {
      "id": "웨이브",
      "label": "웨이브",
      "value": 550,
    },
    {
      "id": "티빙",
      "label": "티빙",
      "value": 225,
    },
    {
      "id": "디즈니+",
      "label": "디즈니+",
      "value": 411,
    },
    {
      "id": "왓챠",
      "label": "왓챠",
      "value": 100,
    }
  ]
  // 더미데이터

  const onClick = (e) => {
    let selection = e.target.value;
    if(selection==="무비DB"){
      setToggle((prev)=>!prev);
      setService(selection);
      setGenre(movieDB);

    }
    else if(selection==="넷플릭스"){
      setToggle((prev)=>!prev);
      setService(selection);
      setGenre(ottGenreData);

    }
    else if(selection==="웨이브"){
      setToggle((prev)=>!prev);
      setService(selection);
      setGenre(ottGenreData);

    }
    else if(selection==="티빙"){
      setToggle((prev)=>!prev);
      setService(selection);
      setGenre(ottGenreData);

    }
    else if(selection==="디즈니+"){
      setToggle((prev)=>!prev);
      setService(selection);
      setGenre(ottGenreData);

    }
    else if(selection==="왓챠"){
      setToggle((prev)=>!prev);
      setService(selection);
      setGenre(ottGenreData);

    }
    else {
      setToggle((prev)=>!prev);
      setService(selection);
      setGenre(ottGenreData);

    }
  }

  const toggleClass = () => {
    setToggle((prev)=>!prev);
    console.log(toggle);
  }


  return (
  <>
    <Menu />
    <div className={styles.blank}></div>
    <div className={styles.container}>

      <div className={styles.innerContainer}>
        <div className={styles.graphTitle}>
          OTT 서비스별 사용자 이용률
        </div>
        <div>
          <CustomPieChart data={userData} />
        </div>
      </div>

      <div className={styles.innerContainer}>
        <div className={styles.graphTitle}>

          <div className={styles.selectContainer}>  

            <div className={styles.select_box}>

              <div className={(toggle) ? styles.options_container : styles.active}>

              <div className={styles.option} >
                  <input
                  type="radio"
                  className={styles.radio}
                  id="movieDB"
                  value="무비DB"
                  onClick={onClick}/>
                  <label for="movieDB">무비DB</label>
                </div>

                <div className={styles.option} >
                  <input
                  type="radio"
                  className={styles.radio}
                  id="Netflix"
                  value="넷플릭스"
                  onClick={onClick}/>
                  <label for="Netflix">넷플릭스</label>
                </div>

                <div className={styles.option} >
                  <input
                  type="radio"
                  className={styles.radio}
                  id="Wave"
                  value="웨이브"
                  onClick={onClick}/>
                  <label for="Wave">웨이브</label>
                </div>

                <div className={styles.option} >
                  <input
                  type="radio"
                  className={styles.radio}
                  id="Tiving"
                  value="티빙"
                  onClick={onClick}/>
                  <label for="Tiving">티빙</label>
                </div>

                <div className={styles.option} >
                  <input
                  type="radio"
                  className={styles.radio}
                  id="Disney+"
                  value="디즈니+"
                  onClick={onClick}/>
                  <label for="Disney+">디즈니+</label>
                </div>

                <div className={styles.option} >
                  <input
                  type="radio"
                  className={styles.radio}
                  id="Whatcha"
                  value="왓챠"
                  onClick={onClick}/>
                  <label for="Whatcha">왓챠</label>
                </div>

              </div>

              <div onClick={toggleClass} className={styles.selected}>
                    {service}
              </div>
            </div>
          </div>
        </div>
        <div>
        <CustomPieChart data={genre} />
        </div>
      </div>
    </div>
  </>
  )
}

export default Where
