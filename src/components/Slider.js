import styles from "../css/Slider.module.css";
import {motion, AnimatePresence} from "framer-motion";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

function Slider({title, criteria}) {

    const makeContentsPath = (text) => {
        return `https://api.themoviedb.org/3/movie/${text}?api_key=6df683327f9037c362fcff75540a2656&language=en-US&page=1`;
    }

    const [contents, setContents] = useState([]);
    const getContents = async() => {
        const json = await (await fetch(makeContentsPath(criteria)))
        .json();
        setContents(json.results);
    }

    useEffect(getContents, []);

    const [index, setindex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving(prev => !prev);
    const increaseIndex = () => {
        if(contents){
            if(leaving) return;
            setLeaving(true);
            const totalContents = contents.length;
            const maxIndex = Math.ceil(totalContents/offset)-1;
            setindex((prev)=> prev===maxIndex ? 0 : prev+1);
        }
    }

    const offset = 4;

    const makeImagePath = (id, format) => {
        return `https://image.tmdb.org/t/p/${format?format: "original"}/${id}`;
    }

    const rowVariants = {
        hidden : {
            x : window.outerWidth
        },
        visible : {
            x : 0
        },
        exit : {
            x : -window.outerWidth
        }
    }

    return(
        <div className={styles.wrapper}>
        <h2 onClick={increaseIndex} className={styles.titleStyle}>{title}</h2>
        <AnimatePresence onExitComplete={toggleLeaving}>
            <motion.div
                className={styles.gridContainer}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{duration:2}}
                key={index}>
                    {contents
                    .slice(1)
                    .slice(offset*index, offset*index+offset)
                    .map((content)=>(
                        <Link to={`/detail/${content.id}`}>
                        <motion.div
                        className={styles.contentBox}
                        style={{backgroundImage: `url(${makeImagePath(content.backdrop_path, "w500")})`}} 
                        >
                        </motion.div>
                        </Link>
                    ))}
            </motion.div>
        </AnimatePresence>
    </div>

    );
}

export default Slider;