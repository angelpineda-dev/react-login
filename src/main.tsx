import ReactDOM from 'react-dom/client'
import App from './App.tsx'
/* helpers */
import { AxiosInterceptor } from './helpers/axiosInterceptor.ts'

/* Styles */
import './index.css'
import Compose from './components/context/Compose/Compose.tsx';
import {AuthProvider} from './components/context/Auth/AuthProvider.tsx';
import Router from './components/Router/Router.tsx';

AxiosInterceptor();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Compose components={[AuthProvider]}>
        <Router />
    </Compose>,
)
