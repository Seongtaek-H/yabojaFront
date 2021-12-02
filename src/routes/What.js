import {motion, AnimatePresence} from "framer-motion";
import styles from "../css/What.module.css";
import { useState } from "react";

const boxVariants = {
    visible : {
        x:0,
        opacity: 1,
        scale:1,
        transition:{
        duration: 1
    }},
    invisible : {x:500, scale:0, opacity:0},
    exit : {x:-500, opacity: 0, scale: 0}
};

function What() {
    const [visible, setVisible] = useState(1);
    const nextPlease = () => setVisible((prev) => (prev === 10 ? 1 : prev+1))
    return(
        <div className={styles.flexBox}>
            <AnimatePresence>
                {[1,2,3,4,5,6,7,8,9, 10].map((i)=>(
                i === visible ? <motion.div variants={boxVariants} initial="invisible" animate="visible" exit="exit" className={styles.box} key={i}>{i}</motion.div>: null
                ))}
                <button onClick={nextPlease}>Next</button>
            </AnimatePresence>
        </div>
        


    );
}

export default What;