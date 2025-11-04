<template>
  <div id="info">
    <div class="container-fluid mt-5 mb-3">

    
    <!-- //blog block -->

      <!-- BJFG -->

      <!-- <div class="row">
        <div
          class="col-md-6 col-sm-12 col-lg-6 bg-orange text-center center-image"
        >
          <img
            load="lazy"
            class="img-fluid img-info"
            src="@/assets/manual.webp"
            alt="Manual de Seguridad"
          />
        </div>
        <div
          class="col-md-6 col-sm-12 col-lg-6 bg-dark px-5 py-4"
          data-aos="flip-left"
          data-aos-offset="400"
          data-aos-easing="ease-in-sine"
        >
          <div class="my-3 text-white text-center">
            <h2 style="font-size: 1.9em" class="pb-3">
              ¿Quieres conocer los fundamentos de la Seguridad y Salud en el
              Trabajo?
            </h2>
            <span> Descarga ahora el Manual de SST 100% gratuito</span>
          </div>
          <v-form ref="form" v-model="valid" lazy-validation class="px-5">
            <v-text-field
              id="text-white"
              v-model="form.name"
              :counter="255"
              :rules="nameRules"
              label="Nombres y Apellidos"
              required
            ></v-text-field>

            <v-text-field
              id="text-white"
              v-model="form.phone"
              :rules="phoneRules"
              label="Celular"
              required
            ></v-text-field>

            <v-text-field
              id="text-white"
              v-model="form.email"
              :rules="emailRules"
              label="Correo"
              required
            ></v-text-field>

            <v-btn
              color="#ffc107"
              class="mr-4 font-weight-bold mt-4"
              @click="validate"
            >
              <div class="text-capitalize">Obtener </div> <div class="text-lowercase pl-1">manual</div> 
            </v-btn>
          </v-form>
        </div>
      </div> -->
    </div>
    <v-snackbar
      v-model="dialog"
      color="#ffc107"
    >
      <p class="text-dark m-0 p-0">Manual enviado correctamente</p>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="#000"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          x
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      form: {},
      dialog: false,
      nameRules: [
        (v) => !!v || "Nombre completo requerido",
        (v) => (v && v.length <= 255) || "No puede exceder los 255 caracteres",
      ],
      phoneRules: [
        (v) => !!v || "Celular requerido",
        (v) =>
          (v && v.length >= 9) ||
          "El número de celular debe tener al menos 9 caracteres",
      ],
      emailRules: [
        (v) => !!v || "Correo requerido",
        (v) => /.+@.+\..+/.test(v) || "Correo no válido",
      ],
    };
  },

  methods: {
    validate() {
      // validar por respuesta - modifcar api para que retorne un mensaje status
      if (this.$refs.form.validate()) {
        this.$axios.post("/public/save-queries-manual", this.form);
        this.dialog = true;
        this.form = {};
        this.reset();
      } else {
        console.log("Error");
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
#text-white {
  color: white !important;
}
.center-image {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.img-info {
  height: 500px;
  max-height: 500px;
}
.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  /* background-color: rgb(227 206 206 / 12%)!important; */
  background-color: #ffc107 !important;
  color: #ffffff !important;
}
.bg-orange {
  background-color: #ffc107;
}
.bg-dark {
  background-color: #343a40;
}

.theme--light.v-label {
  color: #ffc107 !important;
}
.theme--light.v-counter {
  color: #ffffff !important;
}

.v-text-field > .v-input__control > .v-input__slot::before {
  border-color: #ffffff !important;
}
/* 
.fw-bold {
    font-weight: 700;
}

.font {
    font-family: Roboto !important;
}
img {
    vertical-align: middle;
    border-style: none;
} */
</style>
