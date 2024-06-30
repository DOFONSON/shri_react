"use client";
import { useState, useEffect } from "react";
import styles from './style.module.css';
import Star from "@/components/Star/Star";
import Cookies from 'universal-cookie';

interface RateProps {
    id: string | undefined;
    userRating: number | null;
    publRate: string;
}

const Rate: React.FC<RateProps> = ({ id, userRating, publRate }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    
    const [rating, setRating] = useState<number>(userRating ?? Number(publRate));
    const [starArr, setStarArr] = useState<number[]>(new Array(5).fill(0));
    const cookies = new Cookies();
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);
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
        if (!token) return;
        try {
            console.log(id);
            
            const response = await fetch(`http://localhost:3030/api/v1/rateMovie`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ movieId: id, user_rate: newRating }),
            });

            if (!response.ok) {
                throw new Error('Failed to rate movie');
            }

            setRating(newRating);
            cookies.set(`rating_${id}`, newRating.toString(), { path: '/' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.rating}>
            {starArr.map((isStar, i) => (
                <div
                    key={i}
                    onClick={() => handleRating(i + 1)}
                    className={styles.rating__rate}
                    style={{ cursor: 'pointer' }}
                >
                    <Star isActive={isStar === 1} className={styles.rate_star} />
                    <span className={isStar === 1 ? styles.rate__number_active : styles.rate__number_disabled}>
                        {i + 1}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Rate;
