import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Button from '../components/Button'
import Menu from '../components/Menu'
import styles from '../css/Detail.module.css'

function Detail() {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState([])

    const getContent = async () => {
        const json = await (
            await fetch(
                `https://api.themoviedb.org/3/tv/${id}?api_key=6df683327f9037c362fcff75540a2656&language=en-US&page=1`
            )
        ).json()
        setLoading(false)
        setContent(json)
    }
    useEffect(()=>{
        getContent();
    }, [])

    const makeImagePath = (id, format) => {
        return `https://image.tmdb.org/t/p/${
            format ? format : 'original'
        }/${id}`
    }

    return (
        <div>
            {loading ? (
                <h1>Loading</h1>
            ) : (
                <div>
                    <Menu />
                    <div className={styles.blank}></div>
                    <div
                        className={styles.background}
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${makeImagePath(
                                content.backdrop_path
                            )})`,
                        }}
                    >
                        <div className={styles.gridContainer}>
                            <div
                                className={styles.poster}
                                style={{
                                    backgroundImage: `url(${makeImagePath(
                                        content.poster_path
                                    )})`,
                                }}
                            ></div>
                            <div className={styles.detail}>
                                <div className={styles.bold}>
                                    {content.name}
                                </div>

                                <div
                                    className={styles.medium}
                                    style={{ display: 'inline-block' }}
                                >
                                🎦 
                                </div>

                                {content.genres
                                    ? content.genres.map((genre) => (
                                          <div
                                              className={styles.medium}
                                              style={{
                                                  display: 'inline-block',
                                              }}
                                          >
                                              {genre.name}&nbsp;
                                          </div>
                                      ))
                                    : ''}

                                <div
                                    className={styles.medium}
                                    style={{ display: 'inline-block' }}
                                >
                                    &nbsp;📆{content.first_air_date}&nbsp;
                                </div>
                                <div
                                    className={styles.medium}
                                    style={{ display: 'inline-block' }}
                                >
                                    &nbsp;⭐️{content.vote_average}
                                </div>
                                <div className={styles.thin}>
                                    {content.overview}
                                </div>
                                <div className={styles.btn}>
                                    <div>
                                    <Link to={`/tvReview/${content.id}`}>
                                        <Button text={"리뷰게시판"}/>
                                    </Link>    
                                    </div>
                                    <div><Button text={"자유게시판"}/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Detail
