import Menu from "../components/Menu";
import styles from "../css/Search.module.css";
import { useState } from "react";
import MoviePoster from "../components/MoviePoster";
import TVPoster from "../components/TVPoster";

function Search() {

    const [keyword, setKeyword] = useState("");
    const [movies, setMovies] = useState("");
    const [tvs, setTvs] = useState("");

    const searchMovie = async () => {
        const json = await (
            await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=6df683327f9037c362fcff75540a2656&language=en-US&query=${keyword}&page=1&include_adult=false`
            )
        ).json()
        setMovies(json);

    }

    const searchTV = async () => {
        const json = await (
            await fetch(
                `https://api.themoviedb.org/3/search/tv?api_key=6df683327f9037c362fcff75540a2656&language=en-US&query=${keyword}&page=1&include_adult=false`
            )
        ).json()
        setTvs(json);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        searchMovie();
        searchTV();
    }

    const onChange = (e) => {
        setKeyword(e.target.value);
    }

    return (
        <>
        <Menu />
        <div className={styles.blank}></div>
        <div className={styles.gridContainer}>
            <form id="frm" className={styles.search} onChange={onChange} onSubmit={onSubmit}>
                <div className={styles.mainText}>찾고 싶은 영화나 TV 프로그램의 제목을 영어로 입력하세요.</div>
                <div className={styles.searchBar}>
                    <input
                    type="text"
                    required
                    />
                    <i class="fas fa-search"></i>
                </div>
            </form>
            <div>
                {(movies) ? 
                (<>
                    <div className={styles.title}>영화</div>
                    <div className={styles.result}>{movies.results.map((movie) => <MoviePoster movie={movie} styles={styles} />)}</div>
                </>) : ""}
                {(tvs) ? 
                (<>
                    <div className={styles.title}>TV 프로그램</div>
                    <div className={styles.result}>{tvs.results.map((tv) => <TVPoster tv={tv} styles={styles} />)}</div>
                </>) : ""}
            </div>
        </div>
        </>

    );
  }
  
  export default Search
  