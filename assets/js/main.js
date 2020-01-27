import {Home} from "./components/home.js";
import {Login} from "./components/login.js";
import {App} from "./components/app.js"

Vue.use(VueRouter);


const routes = [
    {
        path:'/tutorias/', 
        component: Home
    },
    {
        path:'/tutorias/login',
        component: Login,
        name: 'login'
    }
];

const router = new VueRouter(
    {
        routes:routes,
        mode:'history'
    }
);

let vm = new Vue({
    el:'#app',
    router,
    components: {App}
})