export let headerNav = Vue.component("header-nav", {
	props: ["baseUrl"],
	template: /* html */ `
<header class="col-12" rol="baner">
    <div class="container-header">
      <a class="logo" href="#">
          <img :src="baseUrl + 'assets/img/logo-temporal.png'"alt="logo">   
      </a>
      
    <nav class="nav-header">
        <ul class="nav-header-list">
            <li><router-link class="nav-header__link" :to="'/tutorias'">Inicio</router-link></li>
            <li class="dropdown">
                <a class="dropdown-toggle nav-header__link remove-arrow-dropdown" href="#" role="button" id="drop-menu-asignaturas" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    Temas
                </a>
                <ul class="dropdown-menu drop-menu-header" aria-labelledby="drop-menu-asignaturas" role="menu">
                    <li class="dropdown-submenu" v-for="item in items" :key="item.idAsignatura">
                        <a class="dropdown-item my-2" href="#">
                            {{item.nombreAsignatura}}
                        </a>
                        <ul class="dropdown-menu drop-menu-header">
                            <li class="my-2 " v-for="temaAsignatura in item.temas" :key="temaAsignatura">
                                <a class="dropdown-item" tabindex="-1" href="#">{{temaAsignatura.tema}}</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li><router-link class="nav-header__link" :to="'/tutores'">Tutores</router-link></li>
            <li><router-link class="nav-header__link" :to="'/asesorado'">Busca tutor</router-link></li>
            <li v-if="sesionIniciada">
                
                <a data-toggle="collapse" href="#usuario_conf" aria-expanded="false" aria-controls="collapseExample">
                    <span>
                        <i class="fas fa-user-circle"></i>
                    </span>
                    {{usuario.nombreUsuario}}
                </a></li>
            <li v-else><router-link class="nav-header__link" :to="'/tutorias/login'">Iniciar sesión</router-link></li>
            </div>
            <ul>
    </nav>

</header>
  `,
	data() {
		return {
      items: [],
      sesionIniciada: false,
      usuario:{
        id: "",
        nombreUsuario: "",
        email: "",
        nombre: "",
        apellido: "",
        time: 0
      },
      token: ""
		};
	},
	methods: {
		getTemas() {
			axios.get(this.baseUrl + "api/temas/menu").then((response) => { 
      this.items = this.formatearTemas(response.data.asignaturas,response.data.temas);
    });

    },
          
    formatearTemas(asignaturas, temas){
      
      let temasMenu = new Array();
      for (let valueAsig of asignaturas){
        temasMenu.push({
          idAsignatura:valueAsig.idAsignatura, 
          nombreAsignatura:valueAsig.nombreAsignatura,
          temas: []
        });
      }
      
      
      for (let valueTem of temas){
          for (let valueAsig of temasMenu){
            if(valueAsig.idAsignatura === valueTem.idAsignatura){
              temasMenu[valueAsig.idAsignatura - 1].temas.push({idTema:valueTem.idTema,tema:valueTem.nombreTema})
          }
        }
      }
      return temasMenu;
    },

    
    verificarSesion(){

      if(localStorage.token){
        axios({
          method: 'get',
          url: `${this.baseUrl}api/usuario/data`,
          headers: {
            'Accept': 'application/json',
            'Authorization': localStorage.token
          }
        }).then(res=>{
            (this.usuario = res.data.data);
            this.sesionIniciada = true;
          })
          .catch(err=>{
            console.log(err);
            this.sesionIniciada = false;
            });

      }else{
        this.sesionIniciada = false;
      }
    }

	},
	created() {
    this.getTemas();
    this.verificarSesion();
  },
  mounted() {
    
    this.$root.$on("sesion-iniciada", sesion =>{
      (this.usuario = sesion);
      this.sesionIniciada = true;
    });
  }
});
