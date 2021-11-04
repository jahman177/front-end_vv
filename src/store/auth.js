const state = {
    token: null,
    user: null,
};
const getters = {
    isAuth: state => {
        return Boolean(state.user);
    },
    getUser: state => {
        return state.user
    },
    getToken: state => {
        return state.token;
    }
};
const actions = {
    loggedIn(context, data) {
        context.commit('setAuth',{
            token: data.token,
            user: {
                id: data.payload.id,
                name: data.payload.name,
                email: data.payload.email
            }
        })
    },
    logout(context){
        context.commit('deleteAuth');
    }
};
const mutations = {
    setAuth(state, data) {
        state.token = data.token;
        state.user = data.user;
    },
    deleteAuth(state){
        state.token = null;
        state.user = null;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}