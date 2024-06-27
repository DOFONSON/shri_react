import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { useLoginMutation } from '../../store/reducers/singleMovieApi';
import { logout } from '../../store/slices/authSlice';
import ProfileIcon from './components/ProfileIcon';
import styles from './styles.module.css';
import Button from '../Button/Button';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const [login, ] = useLoginMutation();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    const handleLogin = async (username, password) => {
        try {
            await login({ username, password }).unwrap();
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const modalOpener = () => {
        setIsModalOpen(true);
    };

    return (
        <header className={styles.header}>
            <Link to={-1}><h1 className={styles.header_title}>Фильмопоиск</h1></Link>
            {token ? (
                <div className={styles.header__user}>
                    <span className={styles.header__user_icon}><ProfileIcon /></span>
                    <Button inverse={true} func={handleLogout} type='button' text={'Выйти'}/>
                </div>
            ) : (
                <Button inverse={false} func={modalOpener} type='button' text={'Войти'}/>
            )}
            {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLogin={handleLogin} />}
        </header>
    );
};

export default Header;
