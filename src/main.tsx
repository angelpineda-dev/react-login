/* React */
import ReactDOM from 'react-dom/client'
/* Libraries */
import { AxiosInterceptor } from './interceptors/axios.interceptor.ts'
/* Context */
import { AuthProvider } from './components/context/Auth/AuthProvider.tsx';
import { GlobalProvider } from './components/context/GlobalContext/GlobalProvider.tsx';
import { ModalProvider } from './components/context/Modals/ModalProvider.tsx';
/* Components */
import Router from './components/Router/Router.tsx';
import Compose from './components/context/Compose/Compose.tsx';
/* Styles */
import './styles/index.scss'

AxiosInterceptor();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Compose components={[AuthProvider, GlobalProvider, ModalProvider]}>
        <Router />
    </Compose>,
)
