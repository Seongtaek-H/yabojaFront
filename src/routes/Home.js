import { useEffect, useState } from "react";

import Menu from "../components/Menu";
import Slider from "../components/Slider";

import styles from "../css/Home.module.css";

function Home() {
    const [loading, setLoading] = useState(true);
    const [contents, setContents] = useState([]);
    const getContents = async() => {
        const json = await (await fetch("https://api.themoviedb.org/3/movie/popular?api_key=6df683327f9037c362fcff75540a2656&language=en-US&page=1"))
        .json();
        setContents(json.results);
        setLoading(false);
    }
    useEffect(getContents, []);

    const makeImagePath = (id, format) => {
        return `https://image.tmdb.org/t/p/${format?format: "original"}/${id}`;
    }

    const ranNum = Math.floor(Math.random()*19);

    return (
        <div>
            {loading ? (<h1>Loading</h1>) : (
                <div>
                    <Menu />
                    <div className={styles.blank}></div>
                    <div
                        style={{backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), url(${makeImagePath(contents[ranNum].backdrop_path)})`}}  
                        className={styles.gridContainer}>
                        <div className={styles.titleStyle}>{contents[ranNum].title}</div>
                        <div className={styles.overViewStyle}>{contents[ranNum].overview.length>150 ? contents[ranNum].overview.slice(0,150)+"..." : contents[ranNum].overview}</div>
                    </div>

                    <Slider title="Top Rated" criteria="top_rated"/>
                    <div className={styles.blank2}></div>
                    <Slider title="Now Playing" criteria="now_playing"/>                           
                </div>
            )}
        </div>

    );
}

export default Home;