<template>
  <div class="background pb-5">
    <div v-if="$route.params.mode == 'preview'" class="bg-danger text-white py-1 ajuste z-index-2 px-4">
      Usted se encuentra en un entorno de pre-visualización
    </div>
    <div v-if="error" class="no-result center-element">
      <span>Lo sentimos se produjo un error</span>
    </div>
    <div class="row" style="margin-left: 1px">
      <div class="col-lg-8" style="margin-top: 15px">
        <strong class="h5 pb-2">{{productName}}</strong>
        <template v-if="showPlayer">
          <Video :url="urlVideo" :classId="classId" :productId="productId"></Video>
        </template>
        <template v-else>
          <img src="@/assets/no-video.png" class="img-fluid">
        </template>

        <!-- <div v-else class="center-spinner">
          <b-spinner
            style="width: 3rem; height: 3rem"
            variant="secondary"
            label="Large Spinner"
          ></b-spinner>
        </div> -->
        <!-- <DatosCurso></DatosCurso> -->

        <div class="">
          <Descripcion :course="classes"></Descripcion>
        </div>
      </div>
      <div class="col-lg-4 z-index-1" style="background-color: #e8e9ea; top: 12px;">
        <Temario :course="classes" :productType="productType"></Temario>
        <!-- <Comentarios></Comentarios> -->
      </div>
    </div>
  </div>
</template>

<script>
import Temario from "@/components/auth/course/temario";
import Descripcion from "@/components/auth/course/descripcion";
// import Comentarios from "@/components/auth/course/comentarios";
import Video from "@/components/auth/course/video";
// import DatosCurso from "@/components/course/datosCurso";

export default {
  name: "Course",
  data() {
    return {
      error: false,
      slugClass: null,
      slugProduct: "",
      classes: {},
      productType: null,
      urlVideo: null,
      showPlayer: false,
      productSlug: "",
      classId: null,
      productName: "",
    };
  },
  components: {
    Temario,
    Descripcion,
    // Comentarios,
    Video,
  },
  computed: {},
  watch: {
    "$route.params.slug": {
      handler: function () {
        this.getUrlVideo();
        this.showPlayer = false;
        this.activeLesson();
      },
    },
  },
  methods: {
    async getUrlVideo() {
      var slug = this.$route.params.slug;
      await this.$axios
        .get(`/video/stream-video`, {
          params: { slug: slug, product_id: this.productId },
        })
        .then((response) => {
          this.urlVideo = response.data;
          this.showPlayer = true;
        });
    },
    // Leccion activa al momento de renderizar el componente
    async activeLesson() {
      this.slugClass = this.$route.params.slug == "No+hay+clases" ? "empty slug" : this.$route.params.slug;
      this.productSlug = this.$route.params.productSlug;
      await this.$axios
        .get(`/public/course/info/${this.productSlug}/${this.slugClass}`)
        .then((response) => {
          this.productType = response.data.tipo_producto_id;
          this.slugProduct = response.data.slug;
          this.productId = response.data.id;
          this.classId = response.data.class_id;
          this.productName = response.data.nombre;
          this.$axios
            .get(`/course/temary/get-all-class/${this.productSlug}`)
            .then((response) => {
              this.classes = response.data;
              this.getUrlVideo();
            });
        });
    },
  },
  created() {
    this.activeLesson();
    this.getUrlVideo();
    this.slugClass = this.$route.params.slug;
  },
  destroyed() {
    this.DESTROY_PROGRESS();

    // Enviando la ultima clase que esta visualizando
    let sendData = {
      course_id: this.$route.query.course,
      class_id: this.lesson.id,
    };

    this.lastSeenLesson(sendData);
  },
};
</script>

<style scoped>
.background {
  background-color: #f2f5fa !important;
}
/* .caja-course {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
}
.caja-video {
  min-height: 500px;
  grid-column: 1/9;
  grid-row: 1/2;
  box-shadow: -4px 4px 5px rgb(108, 108, 108);
}
.caja-temario {
  grid-column: 9/13;
  grid-row: 1/2;
  box-shadow: -4px 4px 5px rgb(108, 108, 108);
}
.caja-descrption {
  grid-column: 1/9;
  grid-row: 2/3;
  box-shadow: -4px 4px 5px rgb(108, 108, 108);
}
.caja-comentario {
  grid-column: 9/13;
  grid-row: 2/3;
  box-shadow: -4px 4px 5px rgb(108, 108, 108);
}

@media screen and (max-width: 1000px) {
  .caja-course {
    grid-template-rows: repeat(4, 1fr);
    padding: 20px !important;
  }
  .caja-video {
    grid-column: 1/13;
    grid-row: 1/2;
  }
  .caja-temario {
    grid-column: 1/13;
    grid-row: 2/3;
  }
  .caja-descrption {
    grid-column: 1/13;
    grid-row: 3/4;
  }
  .caja-comentario {
    grid-column: 1/13;
    grid-row: 4/5;
  }
}
@media screen and (max-width: 500px) {
  .caja-course {
    padding: 10px !important;
  }
} */
</style>
