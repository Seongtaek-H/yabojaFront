import { useEffect, useState } from "react";

import Menu from "../components/Menu";

import styles from "../css/Home.module.css";

import {motion, AnimatePresence} from "framer-motion";

function Home() {
    const [loading, setLoading] = useState(true);
    const [contents, setContents] = useState([]);
    const getMovies = async() => {
        const json = await (await fetch("https://api.themoviedb.org/3/movie/popular?api_key=6df683327f9037c362fcff75540a2656&language=en-US&page=1"))
        .json();
        setContents(json.results);
        setLoading(false);
    }
    useEffect(getMovies, []);

    const makeImagePath = (id, format) => {
        return `https://image.tmdb.org/t/p/${format?format: "original"}/${id}`;
    }
    
    const [index, setindex] = useState(0);
    const increaseIndex = () => {
        if(contents){
            const totalContents = contents.length;
            const maxIndex = Math.ceil(totalContents/offset)-1;
            setindex((prev)=> prev===maxIndex ? 0 : prev+1);
        }
    }

    const rowVariants = {
        hidden : {
            x : window.outerWidth + 10,
        },
        visible : {
            x: 0,
        },
        exit : {
            x : -window.outerWidth - 10,
        }
    }

    const offset = 4;

    return (
        <div>
            {loading ? (<h1>Loading</h1>) : (
                <div>
                    <Menu />
                    <div
                    style={{backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), url(${makeImagePath(contents[0].backdrop_path)})`}}  
                    className={styles.gridContainer2}>
                        <div className={styles.titleStyle}>{contents[0].title}</div>
                        <div className={styles.overViewStyle}>{contents[0].overview}</div>
                    </div>

                    <div className={styles.gridContainer3}>          
                        <div className={styles.arrowContainer}>
                            <div className={styles.arrowCircle}>
                                <div className={styles.arrow}></div>
                            </div>  
                        </div>

                                <motion.div
                                className={styles.gridContainer4}
                                variants={rowVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{type: "tween", duration:1}}
                                key={index}>
                                    <AnimatePresence>
                                    {contents
                                    .slice(1)
                                    .slice(offset*index, offset*index+offset)
                                    .map((content)=>(
                                        <motion.div
                                        className={styles.contentBox}
                                        style={{backgroundImage: `url(${makeImagePath(content.backdrop_path, "w500")})`}} 
                                        >
                                        </motion.div>
                                    ))}
                                    </AnimatePresence>
                                </motion.div>

                        <div className={styles.arrowContainer2}>
                            <div className={styles.arrowCircle} onClick={increaseIndex}>
                                <div className={styles.arrow2}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default Home;