<template>
  <div>
    <section v-if="!initialLoading">
      <div class="row">
        <div v-for="iso in isos" v-bind:key="iso.id" class="col-6">
          <v-card max-width="344" class="mx-auto">
            <v-img :src="concat(iso.url_image_cover)" class="image"></v-img>

            <v-card-subtitle>
              <v-btn
                color="#fcc404"
                class="more-info-button"
                @click="abrirModal(iso)"
              >
                <div class="text-capitalize">Más </div><div class="text-lowercase pl-1">información</div> 
              </v-btn>
            </v-card-subtitle>
          </v-card>
        </div>
      </div>
    </section>
    <section v-else><h1>CARGANDO...</h1></section>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          <h5>{{ isoModal.name }}</h5>
          <v-spacer></v-spacer>
          <v-btn color="#fcc404" @click="dialog = false"> x </v-btn>
        </v-card-title>

        <div v-if="validate(isoModal.intro)">
          <v-card-subtitle>
            <strong>Introducción</strong>
          </v-card-subtitle>
          <v-card-text>
            {{ isoModal.intro }}
          </v-card-text>
        </div>

        <div v-if="validate(isoModal.time_obtaining)">
          <v-card-subtitle>
            <strong>Tiempo de obtención</strong>
          </v-card-subtitle>
          <v-card-text>
            {{ isoModal.time_obtaining }}
          </v-card-text>
        </div>

        <div v-if="validate(isoModal.time_validity)">
          <v-card-subtitle>
            <strong>Tiempo de validez</strong>
          </v-card-subtitle>
          <v-card-text>
            {{ isoModal.time_validity }}
          </v-card-text>
        </div>

        <div v-if="validate(isoModal.steps_implementation)">
          <v-card-subtitle>
            <strong>Pasos de implementación</strong>
          </v-card-subtitle>
          <v-card-text>
            {{ isoModal.steps_implementation }}
          </v-card-text>
        </div>

        <div v-if="validate(isoModal.benefits)">
          <v-card-subtitle>
            <strong>Beneficios</strong>
          </v-card-subtitle>
          <v-card-text>
            {{ isoModal.benefits }}
          </v-card-text>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#fcc404" @click="dialog = false"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: 0,
      show: false,
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
.image {
  width: 100%;
  display: block;
}
</style>
