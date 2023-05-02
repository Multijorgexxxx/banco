import axios from 'axios';

const userApi = axios.create({
    baseURL: 'http://localhost:8000/banco/api/v1/user'
})


export const getUsuario = (username) => {
    return userApi.get('?username=' + username);
}

export const getUsuarioid = (id) => {
    return userApi.get('?id=' + id);
}


export const postUser = (user) => {
    return userApi.post('/', user);
}
