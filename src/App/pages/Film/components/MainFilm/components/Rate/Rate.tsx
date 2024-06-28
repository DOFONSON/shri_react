import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRateMovieMutation } from "../../../../../../../store/reducers/singleMovieApi";
import styles from './style.module.css';
import Star from "../../../../../../../components/Star/Star";
import Cookies from 'universal-cookie';

interface RateProps {
    id: string | undefined;
    userRating: number | null;
    publRate: string;
}

const Rate: React.FC<RateProps> = ({ id, userRating, publRate }) => {
    const token = useSelector((state: any) => state.auth.token);
    const [rateMovie] = useRateMovieMutation();
    const [rating, setRating] = useState<number>(userRating ?? Number(publRate));
    const [starArr, setStarArr] = useState<number[]>(new Array(5).fill(0));
    const cookies = new Cookies();

    useEffect(() => {
        if (userRating !== null) {
            setRating(userRating);
        }
    }, [userRating]);

    useEffect(() => {
        const stars = Math.round(Number(rating));
        const newStarArr = new Array(5).fill(0).map((_, index) => index < stars ? 1 : 0);
        setStarArr(newStarArr);
    }, [rating]);

    useEffect(() => {
        const userRatingCookie = cookies.get(`rating_${id}`);
        if (userRatingCookie !== undefined) {
            setRating(Number(userRatingCookie));
        }
    }, [id]);

    const handleRating = async (newRating: number) => {
        try {
            await rateMovie({ id, rating: newRating }).unwrap();
            setRating(newRating); 
            cookies.set(`rating_${id}`, newRating.toString(), { path: '/' }); 
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {token && (
                <div className={styles.rating}>
                    {starArr.map((isStar, i) => (
                        <div
                            key={i}
                            onClick={() => handleRating(i + 1)}
                            className={styles.rating__rate}
                        >
                            <Star isActive={isStar === 1} className={styles.rate_star} />
                            <span className={isStar === 1 ? styles.rate__number_active : styles.rate__number_disabled}>
                                {i + 1}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Rate;
