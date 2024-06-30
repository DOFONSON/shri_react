import styles from './style.module.css'

const ErrorStub = () => {
    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Фильмы не найдены</h3>
            <p className={styles.descr}>Измените запрос и попробуйте снова</p>
        </div>
    )
}

export default ErrorStub