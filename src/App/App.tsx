import './App.css'
import Main from './pages/Main/Main'
import Header from '../components/Header/Header'
import { Routes, Route } from 'react-router-dom';
import Film from './pages/Film/Film';

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path={`/film`}>
            <Route path=':id' element={<Film />}></Route>
          </Route>
      </Routes>
    </>
  )
}

export default App
