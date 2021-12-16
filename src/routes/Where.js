import { useEffect, useState } from "react";

import styles from "../css/Where.module.css";
import Menu from "../components/Menu";
import CustomPieChart from "../components/CustomPieChart";

function Where() {

  let data = [
    {
      "id": "php",
      "label": "php",
      "value": 591,
      "color": "hsl(230, 70%, 50%)"
    },
    {
      "id": "elixir",
      "label": "elixir",
      "value": 550,
      "color": "hsl(76, 70%, 50%)"
    },
    {
      "id": "lisp",
      "label": "lisp",
      "value": 225,
      "color": "hsl(217, 70%, 50%)"
    },
    {
      "id": "css",
      "label": "css",
      "value": 411,
      "color": "hsl(157, 70%, 50%)"
    },
    {
      "id": "python",
      "label": "python",
      "value": 47,
      "color": "hsl(91, 70%, 50%)"
    }
  ]

  const [genre, setGenre] = useState();
  const [toggle, setToggle] = useState(true);
  const [service, setService] = useState("OTT 서비스를 선택하세요.");


  const [genres, setGenres] = useState([]);

  const getgenres = async () => {
    const json = await (
      await fetch(
        '/buyus/count'
      )
    ).json()
    setGenres(json);
  }

  useEffect(()=>{
    getgenres();
  }, [])

  const onClick = (e) => {
    let selection = e.target.value;
    if(selection==="넷플릭스"){
      setToggle((prev)=>!prev);
      setService(selection);
      console.log(selection);
    }
    else if(selection==="웨이브"){
      setToggle((prev)=>!prev);
      setService(selection);
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
          <CustomPieChart data={data} />
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
          {/* 그래프 올 자리 */}
        </div>
      </div>
    </div>
  </>
  )
}

export default Where
