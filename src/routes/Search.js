import Menu from "../components/Menu";
import styles from "../css/Search.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Search() {

    const [movies, setMovies] = useState("");

    const navigate = useNavigate(); 
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");

    const searchMovie = async () => {
        const json = await (
            await fetch(
                `https://api.themoviedb.org/3/search/multi?api_key=6df683327f9037c362fcff75540a2656&language=en-US&query=${keyword}&page=1&include_adult=false`
            )
        ).json()
        setMovies(json);
    }

    // const searchMovie = async () => {
    //     const json = await (
    //         await fetch(
    //             `https://api.themoviedb.org/3/search/multi?api_key=6df683327f9037c362fcff75540a2656&language=en-US&query=${keyword}&page=1&include_adult=false`
    //         )
    //     ).json()
    //     setMovies(json)
    // }

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        console.log(keyword);
        searchMovie();
        navigate(`/search?keyword=${data.keyword}`);
        console.log(movies);
    }
    const onError = (error) => {
        console.log(error);

    }
    return (
        <>
        <Menu />
        <div className={styles.blank}></div>
        <div className={styles.gridContainer}>
            <form id="frm" className={styles.search} onSubmit={handleSubmit(onSubmit, onError)}>
                <div className={styles.mainText}>찾고 싶은 영화나 TV 프로그램의 제목을 입력하세요.</div>
                <div className={styles.searchBar}>
                    <input {...register("keyword", {required : true, minLength : 2})}
                    type="text"
                    /><i class="fas fa-search"></i>
                </div>
            </form>
            <div className={styles.result}>
                {(movies) ? movies.results.map((movie)=><span>{movie.title}</span>) : ""}
            </div>
        </div>
        </>

    );
  }
  
  export default Search
  