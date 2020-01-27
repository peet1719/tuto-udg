export let Login = Vue.component("login", {
  props: ["baseUrl"],
    template: /* html */ `
    <!-- <div class="home">
    <div class="wrapper fadeInDown">
  <div id="formContent">
    <form v-on:submit.prevent="iniciar_sesion">
      <input type="text" v-model="email" id="login" class="fadeIn second"  name="NombreUsuario" placeholder="login">
      <input type="Password" v-model="password" id="password" class="fadeIn third" name="Password" placeholder="password">
      <input type="submit" value="Ingresar" name="submit">
    </form>
  </div>
</div>
  </div>
  -->
   <div class="col-12">
      <div class="login">
        <form v-on:submit.prevent="iniciar_sesion" class="form">
            <div class="form__group">
                <div class="error-mensaje" v-if="error">{{errorMessage}}</div>
                <input class="form__input" v-model="email" id="usuario" type="text" name="NombreUsuario" placeholder="Usuario/E-mail" required>
                <label for="usuario"  class="form__label">Usuario/E-mail</label>
            </div>
            <div class="form__group">
                <input class="form__input" v-model="password" id="password" type="password" name="Password" placeholder="Constraseña" required>
                <label for="password"  class="form__label">Contraseña</label>
                <a class="forgot-password" href="#">¿Olvidaste tu constraseña?</a>
            </div>
           <div class="form__group">
              <input class="btn btn--primary" type="submit" value="ingresar" name="submit">
           </div>
        </form>
      </div>
   </div> 

  `,
	data() {
		return {
        email:'',
        password: '',
        error: false,
        errorMessage: ''
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
              }), config)
              .then(res=>{
                localStorage.setItem('token',res.data.data.token);
                this.$root.$emit("sesion-iniciada", res.data.data);
              })
              .catch(err=>{
                  this.showError(err.response.data.mensaje);
                });
      },

      showError(mensaje){
        this.error = true;
        this.errorMessage = mensaje;
      }

      		}
	
});
