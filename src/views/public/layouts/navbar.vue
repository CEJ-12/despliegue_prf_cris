<script>
import { mapState, mapActions } from 'vuex';

export default {
  data(){
    return {
      optionsLanguage: [
        { value: '1', label: 'Frances', imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1024px-Flag_of_France.svg.png'},
        { value: '2', label: 'Español', imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Bandera_Nacional_de_Espa%C3%B1a.png/800px-Bandera_Nacional_de_Espa%C3%B1a.png'},
      ]
    }
  },
  computed: {
    ...mapState({
      idiomaSeleccionado: state => state.useStoreLanguage.idiomaSeleccionado,
    }),
  },
  methods: {
    ...mapActions(['seleccionarIdioma']),
    cambiarIdioma(event) {
      const nuevoIdioma = event;
      this.seleccionarIdioma(nuevoIdioma);
      this.$i18n.locale = nuevoIdioma === "1" ? "fr" : "es";
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top" style="box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img class="img-logo-profe-cris" src="../../../assets/logo-la-profe-cris.webp">
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarTogglerDemo02"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/" id="nav-link">{{ $t('message.title_1') }} </router-link>
          </li>
          <li class="nav-item">
            <a id="nav-link1" class="nav-link" href="/#course">{{ $t('message.title_2') }}</a>
          </li>
          <li class="nav-item">
            <a id="nav-link1" class="nav-link" href="/#course">{{ $t('message.title_4') }}</a>
          </li>
          <li class="nav-item">
            <router-link id="nav-link2" class="nav-link" to="/iniciar-sesion" target= '_blank'>
              Login
            </router-link>
          </li>
          <li class="nav-item">
            <a id="nav-link2" class="nav-link" href="https://crm.laprofechris.com" target= '_blank'>
              Admin
            </a>
          </li>
          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" style="font-weight: bold;" href="javascript:void(0)" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img style="width: 25px;" :src="$t('message.flag')" class="bandera-img">
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                  <li>
                    <a @click="cambiarIdioma(1)" class="dropdown-item" href="javascript:void(0)">
                      <img style="width: 25px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1024px-Flag_of_France.svg.png" class="bandera-img">
                    </a>
                  </li>
                  <li>
                    <a @click="cambiarIdioma(2)" class="dropdown-item" href="javascript:void(0)">
                      <img style="width: 25px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Bandera_Nacional_de_Espa%C3%B1a.png/800px-Bandera_Nacional_de_Espa%C3%B1a.png" class="bandera-img">
                    </a>
                  </li>
              </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>


</template>
<style scoped>
@import "../../../assets/styles/style.css";
.navbar-light .navbar-toggler-icon {
    /* background-image: none; */
}
.dropdown-menu > a {
  text-decoration: none !important;
  color: rgba(0, 0, 0, 0.5);
}
html {
  scroll-behavior: smooth;
}

.fixed-top{
  background-color: rgb(255, 255, 255);
}

.containerl2{
  width: 100vw;
  height: max-content;
  padding: 0 30px;
  margin: 0 auto;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 5px 7px rgba(131, 131, 131, 0.226);
}

.img-logo-profe-cris{
  width: 140px;
  height: 70px;
}

#nav-link, #nav-link1, #nav-link2{
  font-size: 17px;
  font-family: 600;
  font-weight: bold;
}

.navbar-light .navbar-nav .nav-link {
    color: #000;
}
</style>
