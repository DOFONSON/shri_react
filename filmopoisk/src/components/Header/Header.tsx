"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../../reducers/singleMovieApi';
import { logout } from '../../../features/auth/auth';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import styles from './style.module.css';
import { RootState } from '../../../store/store';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const token: string | null = useSelector((state: RootState) => state.auth.token);

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

  const handleLogin = async (username: string, password: string) => {
    try {
      await login({ username, password }).unwrap();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCookie = (name: string) => {
    console.log(`Deleting cookie: ${name}`);
    setCookie(name, "", {
      'max-age': -1,
    });
  };

  const setCookie = (name: string, value: string, options: any = {}) => {
    options = {
      path: '/',
      ...options,
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }

    document.cookie = updatedCookie;
  };

  const handleLogout = () => {
    const cookies = new Cookies();
    const cookieList = cookies.getAll();
    Object.keys(cookieList).forEach((cookieName) => {
      deleteCookie(cookieName);
    });

    dispatch(logout());
  };

  const modalOpener = () => {
    setIsModalOpen(true);
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.header__link}>
          <h1 className={styles.header_title}>Фильмопоиск</h1>
      </Link>
      {token ? (
        <div className={styles.header__user}>
          <span className={styles.header__user_icon}>
            <ProfileIcon />
          </span>
          <Button inverse={true} func={handleLogout} type="button" text={'Выйти'} />
        </div>
      ) : (
        <Button inverse={false} func={modalOpener} type="button" text={'Войти'} />
      )}
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLogin={handleLogin} />}
    </header>
  );
};

export default Header;
