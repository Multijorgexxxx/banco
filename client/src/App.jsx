import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { UserCrearte } from './components/UserCrearte'
import { UserLoginForm } from './components/UserLogInForm'
import { Consigna } from './pages/Consigna'
import { Cuenta } from './pages/Cuenta'
import { Retira } from './pages/Retira'
import { Consultar_Saldo } from './pages/Consultar_Saldo'


function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path='/' element={<Navigate to="/iniciar_sesion" />} />
                <Route path='/iniciar_sesion' element={<UserLoginForm />} />
                <Route path='/crear_cuenta' element={<UserCrearte />} />
                <Route path='/consultar_saldo' element={<Consultar_Saldo />} />
                <Route path='/consignar' element={<Consigna />} />
                <Route path='/retirar' element={<Retira />} />
                <Route path='/saldo/:id' element={<Cuenta />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App