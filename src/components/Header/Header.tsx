import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="header">
            <Link to={'/'}><h1 className="header_title">Фильмопоиск</h1></Link>
            <button className="header-btn header-enter-btn">Войти</button>
        </header>
    )
}

export default Header