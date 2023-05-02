import axios from 'axios';

const cuentaApi = axios.create({
    baseURL: 'http://localhost:8000/banco/api/v1/cuenta'
})


export const getCuenta = (numero_cuenta) => {
    return cuentaApi.get('?NUMERO_CUENTA=' + numero_cuenta);
}

export const getCuentaUsuario = (id_usuario) => {
    return cuentaApi.get('?USUARIO=' + id_usuario);
}

export const postCuenta = (cuenta) => {
    return cuentaApi.post('/', cuenta);
}

export const putCuenta = (id, cuenta) => {
    return cuentaApi.put(`/${id}/`, cuenta);
}