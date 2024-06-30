import Filter from '@/components/Filter/Filter'
import styles from './style.module.css'
import Films from '../../components/Films/Films'
import Search from '@/components/Search/Search'
const Main = () => {

    return(
        <main>
        <Filter />
        <div>
        <Search />
        <Films  className={styles.main__main}/>
        </div>
        </main>
        
    )
}

export default Main