import ReactDOM from 'react-dom/client'
import App from './App/App.tsx'
import './index.css'
import * as Router from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>

    <Router.BrowserRouter>
    <App />
    </ Router.BrowserRouter>
    </Provider>

)
