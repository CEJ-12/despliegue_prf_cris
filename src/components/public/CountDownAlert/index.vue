<template>
  <div v-if="showAlert && alert">
    <v-alert v-model="showAlert" dismissible color="#ffc107" border="left" elevation="2" style="margin-bottom: 0px">
      <div class="row d-flex align-items-center">
        <div class="col-lg-3 col-md-7 col-sm-6 col-xs-12">
          <a :href="alert.link" target="_blank">
            <!-- <img
              src="@/assets/logo-oficial-segundo-simposio.webp"
              alt="alert"
              style="width: 100%; max-width: 270px"
            /> -->
            <span>{{ alert.title }}</span>
          </a>
        </div>
        <div class="col-lg-5 col-md-4 d-sm-none d-none d-md-block d-lg-block">
          <p style="display: inline; font-weight: 700; font-size: 1.1em;">
            {{ alert.description }}
          </p>
        </div>
        <div class="col-lg-4 col-md-5 col-sm-6 col-xs-12 text-right" style="
            padding: 0px;
            user-select: none;
            -moz-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -o-user-select: none;
          ">
          <flip-countdown class="align-clock" style="font-size: 0.5rem; font-weight: bold; color: #131b1e"
            :deadline="alert.deadline" :labels="labels" @timeElapsed="timeElapsedHandler"></flip-countdown>
        </div>
      </div>
    </v-alert>
  </div>
</template>

<script>
import FlipCountdown from "vue2-flip-countdown";
export default {
  data: () => ({
    showAlert: false,
    labels: {
      days: "días",
      hours: "horas",
      minutes: "minutos",
      seconds: "segundos",
    },
    alert: {},
  }),
  components: {
    FlipCountdown,
  },
  methods: {
    timeElapsedHandler() {
      //   this.showAlert = false; # desaparece la alerta
    },
    getActiveAlert: async function () {
      const { status, data } = await this.$axios.get(`/public/alerts/get-active`);
      if (status === 200) {
        if (data && Object.keys(data).length > 0) {
          this.alert = data;
          this.showAlert = true;
        }
      }
    },
  },
  mounted() {
    this.getActiveAlert();
  },
};
</script>
<style>
/* Styles important */
.flip-clock__card {
  font-size: 3.7em !important;
}

.flip-clock__slot {
  font-size: 1.5em !important;
}

/* .flip-clock {
  text-align: inherit !important;
} */
.flip-card>* {
  text-align: center;
}

.flip-clock__piece {
  text-align: center !important;
}

/* .flip-card__bottom {
  text-align: center;
}
.flip-clock__slot {
  text-align: center;
}
.flip-card__top {
  text-align: center;
}
*/
</style>
