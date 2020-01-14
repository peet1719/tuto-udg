import {headerNav} from "./components/layout/headerNav.js";
import {login} from "./components/login.js";
import {conf} from "./config.js"

Vue.component('app',{
    template:`
    <div class="container">
    <header-nav :baseUrl="baseUrl"></header-nav>
    <login :baseUrl="baseUrl"></login>
    </div>
    `,
    data() {
        return {
            baseUrl: conf.baseUrl
        }
    }
})


let vm = new Vue({
    el:'#app',
    data:{
        
    }
})