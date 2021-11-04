import HttpService from '../HttpService';
import store from '@/store/index.js';
const AuthHttpService = new HttpService({
    baseURL: process.env.AUTH_API_URL || 'http://192.168.0.100:3000/api'
});
var token  = () => store.getters['auth/getToken'];
export default {
    login(email, password){
        return AuthHttpService.get('/login', {email, password}, {});
    },
    signIn(name, email, password){
        return AuthHttpService.post('/register', {email, password, name}, {});
    },
    checkAuth(){
        return AuthHttpService.get('/checkAuth', {}, {Authorization: `Bearer ${token()}`});
    }
}