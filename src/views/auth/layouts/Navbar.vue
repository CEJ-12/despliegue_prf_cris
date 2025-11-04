<template>
  <div style="margin-bottom: 60px">
    <v-app-bar app color="#0078D7">
      <v-app-bar-nav-icon
        @click="changeDrawer"
        v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
      ></v-app-bar-nav-icon>

      <!-- Mensaje de Bienvenida -->
      <div class="text-bold banner-text" style="font-weight: 700">
        <p style="color: #f0f0f0" class="py-5 my-5">
          {{ $t('message.welcome_to') }}
        </p>
      </div>
      <v-spacer></v-spacer>

      <!-- Barra de búsqueda -->
      <div class="mx-2" style="min-width: 25%" v-if="!$vuetify.breakpoint.xs">
        <v-autocomplete
          style="border-radius: 12px"
          @keypress.enter="onSearchCourse"
          hide-no-data
          :search-input.sync="search"
          color="dark"
          solo
          dense
          append-icon=""
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details
          hide-selected
          item-text="name"
          item-value="symbol"
          return-object
          :label="$t('message.find_a_course')"
          >.
        </v-autocomplete>
      </div>

      <v-menu left bottom >
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mx-1" x-large icon v-bind="attrs" v-on="on">
            <img width="20px" height="15px" :src="$t('message.flag')" class="bandera-img">
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(language, index) in languages" :key="index" link @click="cambiarIdioma(language.id)" >
            <v-list-item-title>
              <img width="20px" height="15px" :src="language.link" class="bandera-img">
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu left bottom >
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mx-1" x-large icon v-bind="attrs" v-on="on">
            <v-icon size="25" style="color: #009FE3">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(link, index) in links"
            :key="index"
            link
            :to="{ name: link.nameRouter }"
            @click="optionAction(link.action, link.nameRouter)"
          >
            <v-list-item-title>{{ $t('message.'+link.nombre) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  components: {},
  data() {
    return {
      attrs: {
        class: "pa-2",
      },
      sheet: false,
      search: null,
      numberItems: 0,
      // tooltip: false,
      isBadgeActive: false,
      drawer: false,
      dialogCertificate: false,
      stateCertificate: false,
      isLoading: true,
      links: [
        { nombre: "my_perfil", name: "perfil" , nameRouter : "profile" },
        { nombre: "sign_off", name: "login", action: "logout" },
      ],
      languages: [
        { link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1024px-Flag_of_France.svg.png', id: "1"},
        { link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Bandera_Nacional_de_Espa%C3%B1a.png/800px-Bandera_Nacional_de_Espa%C3%B1a.png', id: "2"},
      ],
      items: [],
      certificate: null,
      certificateData: {
        data: {},
      },
      course: [],
      finalPrice: null,
      certificateBought: false,
      showCertificateIcon: false,
    };
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
    },
    optionAction(action, link) {
      console.log(link);
      if (action === "logout") {
        window.localStorage.clear();
        this.$router.push({ name: "login" });
      }
    },
    onSearchCourse() {
      if (!this.search) return;
      this.sheet = !this.sheet;
      this.$router
        .push({ name: "search", query: { q: this.search } })
        .catch(() => {});
    },
    changeDrawer() {
      this.$emit("click", !this.drawer);
    },
  },

  mounted() {},
  created() {},
  watch: {},
};
</script>

<style lang="scss">
.v-label {
  font-size: 0.8em;
}

.scroll {
  height: 100%;
  max-height: 450px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
a:hover {
  text-decoration: none;
}
.tooltip-box {
  position: absolute;
  background: #000000;
  color: #ffffff;
  padding: 8px 15px;
  z-index: 10;
  top: 35px;
  left: -94px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 15px;
  box-shadow: 2px 2px 2px 2px #000000;
  opacity: 80%;
}
.tooltip-box:hover {
  opacity: 100%;
  transition: 0.3s ease-in;
}
.tooltip-box::after {
  content: "";
  display: block;
  border-bottom: 7px solid #131b1e;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  position: absolute;
  top: -7px;
  left: calc(50% - 7px);
}
.pulse {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% {
    color: #0078D7;
  }
  100% {
    color: #000000;
  }
}

.ga:hover {
  .box {
    background-color: #fff;
    transform: translatey(50px);
    height: 50px;
    width: 230px;
    color: rgb(0, 0, 0);
    box-shadow: 2px 2px 2px #131b1e;
  }
}

@media screen and (max-width: 900px) {
  .banner-text {
    display: none;
  }
}
</style>
