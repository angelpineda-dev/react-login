/* React */
import ReactDOM from 'react-dom/client'
/* Libraries */
import { AxiosInterceptor } from './interceptors/axios.interceptor.ts'
/* Context */
import {AuthProvider} from './components/context/Auth/AuthProvider.tsx';
import { GlobalProvider } from  './components/context/GlobalContext/GlobalProvider.tsx';
/* Components */
import Router from './components/Router/Router.tsx';
import Compose from './components/context/Compose/Compose.tsx';
/* Styles */
import './index.css'

AxiosInterceptor();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Compose components={[AuthProvider, GlobalProvider]}>
        <Router />
    </Compose>,
)
