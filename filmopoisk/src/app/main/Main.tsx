import Filter from "./components/Filter/Filter"
import Search from "./components/Search/Search"
import Films from "./components/Films/Films"
import styles from './style.module.css'
const Main = () => {

    return(
        <>
        <main>
        <Filter />
        <div className={styles.main__main}>
            <Search />
            <Films />
        </div>
        </main>
        </>
        
    )
}

export default Main