import styles from './styles.module.css'
import { useState } from 'react';
import { createPortal } from 'react-dom'
import Close from '../Close/Close';
import Input from '../Input/Input';
import Button from '../Button/Button';

interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    onLogin: (username: string, password: string) => Promise<void>
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    if (!isOpen) return null;

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };
    console.log(window.scrollY);
    

    return createPortal(
        <>
            <div style={{ backgroundColor: 'black', position: 'absolute', width: '100%', height: '450vh', top: '0', left: '0', opacity: '0.2' }}>

            </div>
            <div className={styles.modal} style={{top: `${window.scrollY + 80 + 85.5}px`}}>
                <div className={styles.modal_content}>
                    <div className={styles.modal__header}>
                        <h3 className={styles.header__title}>Авторизация</h3>
                        <span className={styles.modal_close} onClick={onClose}><Close /></span>
                    </div>
                    <form onSubmit={handleSubmit} className={styles.modal__form}> 
                        <div>
                            <label htmlFor="login">
                            <span className={styles.modal__label}>Логин <span className={styles.modal__label_star}>*</span></span> 
                            <Input id="login"
                                onChange={setUsername}
                                className={styles.modal__input}
                                value={username}
                                holder={'Введите логин'} />
                            </label>
                        </div>
                        <div>
                            <label htmlFor='password'>
                                <span className={styles.modal__label}>Пароль <span className={styles.modal__label_star}>*</span></span> 
                            <Input id="password"
                                onChange={setPassword}
                                className={styles.modal__input}
                                value={password}
                                holder={'Введите пароль'} />
                                </label>
                        </div>
                        <div className={styles.modal__btns}>
                            <Button inverse={false} text='Войти' type='submit'/>
                            <Button inverse={true} text='Отменить' type='button' func={onClose}/>
                        </div>
                    </form>
                </div>
            </div>
        </>, document.body
    );
};

export default Modal;
