import HttpService from '../HttpService';
import store from '@/store/index.js';
const AuthHttpService = new HttpService({
    baseURL: process.env.VUE_APP_AUTH_API_URL
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