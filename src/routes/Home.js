import { useEffect, useState } from "react";

import MainContent from "../components/MainContent";
import Menu from "../components/Menu";
import Content from "../components/Content";

import styles from "../css/Home.module.css";

function Home() {
    const [loading, setLoading] = useState(true);
    const [contents, setContents] = useState([]);
    const [Maincontents, setMainContents] = useState([]);
    const getMovies = async() => {
        const json = await (await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year")).json();
        setContents((json.data.movies).slice(0,10));
        setMainContents((json.data.movies).slice(0,4));
        setLoading(false);

    }
    useEffect(getMovies, []);
    
    return(
        <div>
            {loading ? (<h1>Loading</h1>) :
            <div>
                <Menu />
            <div className={styles.gridContainer}>
                <div className={styles.gridContainer2}>
                    {Maincontents.map((content)=><Content coverImg={content.large_cover_image}/>)}
                </div>
                <div className={styles.gridContainer2}>
                    {contents.map((content)=><Content coverImg={content.medium_cover_image} title={content.title}/>)}
                </div>
            </div>
            </div>
            }
        </div>

    );
}

export default Home;