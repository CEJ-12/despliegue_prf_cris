<template>
  <div class="player">
    <video-player
      class="video vjs-custom-skin vjs-big-play-centered"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @ready="playerReadied"
      @statechanged="playerStateChanged($event)"
    >
    </video-player>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState, mapActions } from "vuex";
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";

export default {
  name: "Video",
  components: {
    videoPlayer,
  },
  props: {
    url: String,
    classId: Number,
    productId: Number,
  },
  data() {
    return {
      playerOptions: {},
      idCourse: this.$route.query.course,
      timeReprod: 0,
    };
  },
  mounted() {
    window.addEventListener('unload', this.someMethod);
    this.playerOptions = {
      responsive: true,
      fluid: true,
      // width: "100%",
      // height: 100,
      preload: "auto",
      autoplay: false,
      muted: false,
      language: "es",
      playbackRates: [0.7, 1.0, 1.5, 2.0],
      //techOrder: ["youtube"],
      sources: [
        {
          type: "Video/mp4",
          //baseHost: "https://crm-storage-user.s3.eu-west-1.amazonaws.com/video.mp4",
          // MP4
          src: this.url,
        },
      ],
      poster: "",
      controlBar: {
        durationDisplay: true,
        timeDivider: true,
      },
    };
    setTimeout(() => {
      this.player.muted(false);
    }, 1000);
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
    ...mapGetters("course", ["urlVideo"]),

    ...mapState("course", ["lesson"]),
  },
  methods: {
    ...mapMutations("course", ["CLEAR_VIDEO"]),
    ...mapActions('course', ['updateTime', 'getTimeReproduction']),
    // Eventos del reproductor que podemos usar
    onPlayerPlay() {},
    // Caundo el usaruario ponga pause se actualizara el tiempo en que se esta quedando
    onPlayerPause(player) {
      this.actualizarTiempo(player.currentTime());
    },
    onPlayerEnded() {},
    onPlayerLoadeddata() {},
    onPlayerWaiting() {},
    onPlayerPlaying() {},
    onPlayerTimeupdate() {},
    onPlayerCanplay() {},
    onPlayerCanplaythrough() {},
    playerStateChanged() {},

    // Función para inciar la reproducción
    async playerReadied(player) {
      //  Iniciamos la reproducción en el tiempo que el usuario se quedo
      await this.$axios.get(`/purchased/get-time?courseId=${this.productId}&classId=${this.classId}`).then((response) => {
        this.timeReprod = response.data.time
      })
      player.currentTime(this.timeReprod);
    },

    // Función para actualizar el tiempo de reproduccion de la clase
    async actualizarTiempo( time ) {
      if(time != 0){
        await this.$axios.patch(`purchased/save-time?course_id=${this.productId}&display_time=${this.player.currentTime()}&class_id=${this.classId}`)
      }
    },
    someMethod(player) {
      this.actualizarTiempo(player.currentTime());
    }
  },
  async beforeDestroy() {
    window.removeEventListener('unload', this.someMethod);  
    // Cuando el componente se destruya o cierre por casualidad actualizaremos el tiempo en el que se esta quedando
    // this.updateTime({ course: this.productId,  time: this.player.currentTime() , lessonId: this.classId });
    await this.$axios.patch(`purchased/save-time?course_id=${this.productId}&display_time=${this.player.currentTime()}&class_id=${this.classId}`)
    // Actualizaremos la variable global de vuex para no generar conflicto con otra clase
    
    //this.$store.commit("course/UPDATE_TIME", 0);
  },
  destroyed() {
    // Borramos datos del video al destruir el componente para no generar conflictos
    this.CLEAR_VIDEO();
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
