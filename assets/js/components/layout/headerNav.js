export let headerNav = Vue.component("header-nav", {
	props: ["baseUrl"],
	template: /* html */ `
<header class="encabezado" rol="baner">
    <div class="container-header">
      <a class="logo" href="#">
          <img :src="baseUrl + 'assets/img/logo-temporal.png'"alt="logo">   
      </a>
      <nav class="nav-header">
        <ul>
          <li><a href="#">Inicio</a></li>
          <li class="dropdown">
            <a class="dropdown-toggle" href="#" role="button"  id="drop-menu-temas" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
              Temas
            </a>
            <div class="dropdown-menu" aria-labelledby="drop-menu-temas"> 
              <a class="dropdown-item" v-for="item in items" :key="item.idAsignatura" href="#">{{item.nombreAsignatura}}</a> 
            </div>
          </li>
          <li><a href="#">Tutores</a></li>
          <li><a href="">Busca Tutor</a></li>
          <li><a href="">Iniciar sesión</a></li>
        </ul>
      </nav>
    </div>
</header>
  `,
	data() {
		return {
			items: []
		};
	},
	methods: {
		getTemas() {
			axios.get(this.baseUrl + "api/temas/menu").then((response) => {
      this.items = response.data.asignaturas;
      });

      		}
	},
	created() {
		this.getTemas();
	}
});
