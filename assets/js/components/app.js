import {headerNav} from "./layout/headerNav.js";
import {conf} from "../config.js"

export let App = Vue.component('app',{
	template: /* html */ `
    <div class="container">
     <div class="row">
      <header-nav :baseUrl="baseUrl"></header-nav>
     </div>
     <hr class="horizontal-line"/>
     <div class="row">
      <router-view :baseUrl="baseUrl"></router-view>
     </div>
    </div>
  `,
	data() {
		return {
            baseUrl: conf.baseUrl,
            displayNav: true
        }
  },
  
  beforeUpdate(){
    this.display();
  },
  created() {
    this.display();
  },
  methods: {
    display(){
      if(this.$route.name === 'login'){
        this.displayNav = false;        
      }else{
        this.displayNav = true;
        console.log(this.displayNav)
      }
    }
  }

	
});


