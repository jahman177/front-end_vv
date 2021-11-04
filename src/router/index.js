import { createRouter, createWebHistory } from "vue-router";
import store from '@/store/index.js';
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import VideoView from "../views/VideoView.vue";
import SignIn from "../views/SignIn.vue";
import ForgetPassword from "../views/ForgetPassword.vue";
import MainPage from "../views/MainPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn
  },
  {
    path: "/forgetpassword",
    name: "ForgetPassword",
    component: ForgetPassword
  },
  {
    path: "/main-page",
    name: "MainPage",
    component: MainPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/view/:videoId",
    name: "VideoView",
    component: VideoView,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.getters['auth/isAuth']) {
      next({
        name: 'Login'
      });
    } else {
      next()
    }
  } else {
    next();
  }
})

export default router;
