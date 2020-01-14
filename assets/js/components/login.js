export let login = Vue.component("login", {
  props: ["baseUrl"],
    template: /* html */ `
    <div class="home">
    <div class="wrapper fadeInDown">
  <div id="formContent">
    
    <!-- Icon -->

     
    <form v-on:submit.prevent="iniciar_sesion">
      <input type="text" v-model="email" id="login" class="fadeIn second"  name="NombreUsuario" placeholder="login">
      <input type="Password" v-model="password" id="password" class="fadeIn third" name="Password" placeholder="password">
      <input type="submit" value="Ingresar" name="submit">
    </form>

    

  </div>
</div>
  </div>
  `,
	data() {
		return {
        email:'',
        password: ''    
		};
	},
	methods: {
		iniciar_sesion() {
            let config= {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            }

            axios.post(`${this.baseUrl}api/usuario/login`, JSON.stringify({
                nombreUsuario: this.email,
                password: this.password
              }))
              .then(res=>{
                console.log(res);
                localStorage.setItem('token',res.data.data.token);
                console.log(localStorage.getItem('token'));
              })
              .catch(err=>{
                console.log(err.response);
              });
      }

      		}
	
});
