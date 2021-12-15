import { useState } from "react";

import styles from "../css/Where.module.css";

import PieChart from "../components/Piechart";
import Menu from "../components/Menu";

function Where() {

  let Netflix = [
    {
      "id": "액션",
      "label": "액션",
      "value": 235,
      "color": "hsl(176, 70%, 50%)"
    },
    {
      "id": "로맨스",
      "label": "로맨스",
      "value": 284,
      "color": "hsl(220, 70%, 50%)"
    },
    {
      "id": "코미디",
      "label": "코미디",
      "value": 391,
      "color": "hsl(337, 70%, 50%)"
    },
    {
      "id": "공포",
      "label": "공포",
      "value": 248,
      "color": "hsl(355, 70%, 50%)"
    },
    {
      "id": "스릴러",
      "label": "스릴러",
      "value": 87,
      "color": "hsl(298, 70%, 50%)"
    }
  ]

  const [genre, setGenre] = useState(Netflix);
  const [toggle, setToggle] = useState(true);
  const [service, setService] = useState("OTT 서비스를 선택하세요.");

  let user = [
    {
      "id": "넷플릭스",
      "label": "넷플릭스",
      "value": 122,
      "color": "hsl(0, 100%, 50%)"
    },
    {
      "id": "웨이브",
      "label": "웨이브",
      "value": 515,
      "color": "hsl(175, 70%, 50%)"
    },
    {
      "id": "티빙",
      "label": "티빙",
      "value": 413,
      "color": "hsl(186, 70%, 50%)"
    },
    {
      "id": "디즈니+",
      "label": "디즈니+",
      "value": 202,
      "color": "hsl(341, 70%, 50%)"
    },
    {
      "id": "왓챠",
      "label": "왓챠",
      "value": 423,
      "color": "hsl(309, 70%, 50%)"
    }
  ]

  let Wave = [
    {
      "id": "액션",
      "label": "액션",
      "value": 100,
      "color": "hsl(176, 70%, 50%)"
    },
    {
      "id": "로맨스",
      "label": "로맨스",
      "value": 324,
      "color": "hsl(220, 70%, 50%)"
    },
    {
      "id": "코미디",
      "label": "코미디",
      "value": 299,
      "color": "hsl(337, 70%, 50%)"
    },
    {
      "id": "공포",
      "label": "공포",
      "value": 178,
      "color": "hsl(355, 70%, 50%)"
    },
    {
      "id": "스릴러",
      "label": "스릴러",
      "value": 43,
      "color": "hsl(298, 70%, 50%)"
    }
  ]

  const onClick = (e) => {
    let selection = e.target.value;
    if(selection==="넷플릭스"){
      setToggle((prev)=>!prev);
      setService(selection);
      setGenre(Netflix);
      console.log(selection);
    }
    else if(selection==="웨이브"){
      setToggle((prev)=>!prev);
      setService(selection);
      setGenre(Wave);
      console.log(selection);
    }
    else if(selection==="티빙"){
      setToggle((prev)=>!prev);
      setService(selection);
      console.log(selection);
    }
    else if(selection==="디즈니+"){
      setToggle((prev)=>!prev);
      setService(selection);
      console.log(selection);
    }
    else if(selection==="왓챠"){
      setToggle((prev)=>!prev);
      setService(selection);
      console.log(selection);
    }
    else {
      setToggle((prev)=>!prev);
      setService(selection);
      console.log(selection);
    }
  }

  const toggleClass = () => {
    setToggle((prev)=>!prev);
    console.log(toggle)
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
          <PieChart data={user} />
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
        <PieChart data={genre} />
        </div>
      </div>
    </div>
  </>
  )
}

export default Where
