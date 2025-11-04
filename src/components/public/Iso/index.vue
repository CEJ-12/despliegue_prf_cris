<template>
  <!-- BJFG -->

  <section class="w3l-service-1 py-5">
        <div class="container py-md-5 py-4">
            <div class="title-main text-center mx-auto mb-md-5 mb-4" style="max-width:500px;">
                <!-- <p class="text-uppercase">Why Choose Us</p> -->
                <h3 class="title-style">{{ $t('message.tool_for_teacher_1') }}</h3>
            </div>
            <div class="row content23-col-2 text-center">
                <div class="col-md-6">
                    <div class="content23-grid content23-grid1">
                        <h4><a href="about.html">{{ $t('message.tool_for_teacher_2') }}</a></h4>
                    </div>
                </div>
                <div class="col-md-6 mt-md-0 mt-4">
                    <div class="content23-grid content23-grid2">
                        <h4><a href="about.html">{{ $t('message.tool_for_teacher_3') }}</a></h4>
                    </div>
                </div>
            </div>
        </div>
    </section>

  <!-- BJFG -->
  <!-- <div style="background-color: #343a40" class="py-5">
    <section v-if="!initialLoading">
      <div id="certificaciones-isos" class="py-5">
        <h2 class="text-center py-5" style="font-size: 1.9em; color: #fff">
          Somos implementadores ISO calificados
        </h2>

        <div class="container">
          <div class="row pt-5">
            <v-carousel v-model="model" hide-delimiters height="100%">
              <v-carousel-item v-for="iso in isos" :key="iso.id">
                <div class="row align-items-center">
                  <div class="col-md-4 offset-md-1 px-5">
                    <v-img
                      data-aos="zoom-in"
                      data-aos-offset="300"
                      data-aos-easing="ease-in-sine"
                      loading="lazy"
                      :src="concat(iso.url_image_cover)"
                      class="rounded-image w-100 m-auto"
                    ></v-img>
                  </div>
                  <div class="col-md-6 px-5 container-iso-description">
                    <h5 style="font-size: 2em; color: #fff">Descripción</h5>
                    <p
                      data-aos="fade-left"
                      data-aos-offset="300"
                      data-aos-easing="ease-in-sine"
                      class="mr-5 text-justify"
                      style="
                        max-block-size: 245px;
                        text-overflow: ellipsis;
                        color: #fff;
                        overflow: hidden;
                      "
                    >
                      {{ iso.intro }}
                    </p>
                    <v-btn
                      color="#fcc404"
                      class="more-info-button"
                      @click="abrirModal(iso)"
                    >
                      <div class="text-capitalize">Más  </div><div class="text-lowercase pl-1"> información</div> 
                    </v-btn>
                  </div>
                </div>
              </v-carousel-item>
            </v-carousel>
          </div>
        </div>
      </div>
    </section>
    <section v-else><h1>CARGANDO...</h1></section>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          <h5>{{ this.isoModal.name }}</h5>
          <v-spacer></v-spacer>
          <v-btn color="#fcc404" @click="dialog = false"> x </v-btn>
        </v-card-title>

        <div v-if="validate(this.isoModal.intro)">
          <v-card-subtitle>
            <strong>Introducción</strong>
          </v-card-subtitle>
          <v-card-text class="text-justify">
            {{ this.isoModal.intro }}
          </v-card-text>
        </div>

        <div v-if="validate(this.isoModal.time_obtaining)">
          <v-card-subtitle>
            <strong>Tiempo de obtención</strong>
          </v-card-subtitle>
          <v-card-text class="text-justify">
            {{ this.isoModal.time_obtaining }}
          </v-card-text>
        </div>

        <div v-if="validate(this.isoModal.time_validity)">
          <v-card-subtitle>
            <strong>Tiempo de validez</strong>
          </v-card-subtitle>
          <v-card-text class="text-justify">
            {{ this.isoModal.time_validity }}
          </v-card-text>
        </div>

        <div v-if="validate(this.isoModal.steps_implementation)">
          <v-card-subtitle>
            <strong>Pasos de implementación</strong>
          </v-card-subtitle>
          <v-card-text class="text-justify">
            {{ this.isoModal.steps_implementation }}
          </v-card-text>
        </div>

        <div v-if="validate(this.isoModal.benefits)">
          <v-card-subtitle>
            <strong>Beneficios</strong>
          </v-card-subtitle>
          <v-card-text class="text-justify">
            {{ this.isoModal.benefits }}
          </v-card-text>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#fcc404" @click="dialog = false"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      model: 0,
      dialog: false,
      isos: [],
      isoModal: [],
      initialLoading: false,
      url: "https://ipssoma-storage.s3.eu-west-1.amazonaws.com/",
    };
  },

  mounted() {
    this.listIsos();
  },

  methods: {
    concat: function (img) {
      return `${this.url}${img}`;
    },

    validate: function (value) {
      return value != undefined && value != "null" ? true : false;
    },

    abrirModal: function (iso) {
      this.isoModal = iso;
      this.dialog = true;
    },

    listIsos: function () {
      this.initialLoading = true;
      this.$axios.get(`/public/isos/list`).then((response) => {
        this.isos = response.data;
        this.initialLoading = false;
      });
    },
  },
};
</script>

<style>
@media (min-width: 0px) and (max-width: 571px) {
  .container-iso-description h5,
  p,
  .more-info-button {
    margin-left: 20px;
  }
}

.rounded-image {
  border-radius: 5%;
}

.w3l-service-1 .content23-grid1 {
    background: url(../../../assets/bg1.jpg) no-repeat center;
    background-size: cover;
}

.w3l-service-1 .content23-grid2 {
    background: url(../../../assets/bg2.jpg) no-repeat center;
    background-size: cover;
}
</style>
