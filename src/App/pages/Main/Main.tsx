import Filter from "./components/Filter/Filter"
import Search from "./components/Search/Search"
import Films from "./components/Films/Films"
const Main = () => {

    return(
        <>
        <main>
        <Filter />
        <div className="main__main">
            <Search />
            <Films />
        </div>
        </main>
        </>
        
    )
}

export default Main