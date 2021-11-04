import { createStore } from "vuex";
import auth from "./auth.js"
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

export default createStore({
  strict: true,
  state: {},
  plugins: [
    createPersistedState({
      path: ['auth'],
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ],
  mutations: {},
  actions: {},
  modules: {
    auth
  },
});
