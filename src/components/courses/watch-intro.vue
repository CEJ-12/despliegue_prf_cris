<template>
  <div class="bg-light">
    <NavBar></NavBar>
    <div class="container-fluid">
      <!-- Primera sección -->
      <div class="row py-5">
        <!-- Detalles del curso -->
        <div class="col-lg-4 col-md-12 pr-5 detailsCourse">
          <h3
            class="mb-4 font-weight-bold"
            :class="{
              loader: !mCourse.nombre,
              'loader-titles': !mCourse.nombre,
            }"
          >
            {{ mCourse.nombre }}
          </h3>

          <ul class="pl-3 mb-5 list-unstyled">
            <li
              class="my-1"
              :class="{
                loader: !mCourse.created_at,
                'loader-text-small': !mCourse.created_at,
              }"
            >
              <em class="fas fa-calendar-alt mr-3"></em
              ><strong>Publicado:</strong>
              {{ mCourse.created_at }}
            </li>
            <li
              class="my-1"
              :class="{
                loader: !mCourse.categoria,
                'loader-text-small': !mCourse.categoria,
              }"
            >
              <em class="fas fa-bezier-curve mr-2"></em
              ><strong>Categoría:</strong>
              {{ mCourse.categoria }}
            </li>
            <li>
              <button class="btn btn-primary" @click="pay()">Comprar</button>
            </li>
          </ul>
          <div>
            <button
              v-if="this.courseFilter == false"
              class="btn-custom"
              @click="BuyCourse()"
              style="
                font-size: 18px;
                color: black;
                font-weight: 600;
                line-height: 1.5rem;
              "
              :class="{ loader: !mCourse.nombre }"
            >
              <emmg
                v-if="mCourse.precio == ''"
                width="25"
                :src="require('@/assets/free.png')"
                alt=""
              />
              {{
                mCourse.precio > 0
                  ? "Comprar ahora $" + mCourse.precio + ""
                  : "Inscribete ahora"
              }}
            </button>
          </div>
        </div>

        <div class="col-lg-8 pr-0 pl-4">
          <WatchIntro :slug="mCourse.slug"></WatchIntro>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-9 col-md-12 mt-4">
          <div class="border-box">
            <v-expansion-panels accordion v-if="isDetailsLoading">
              <v-expansion-panel>
                <v-expansion-panel-header style="font-weight: bold">
                  Descripción del curso
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  <div v-html="mCourse.descripcion"></div>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header style="font-weight: bold">
                  Acerca de este curso
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  <div v-html="mCourse.objetivo"></div>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header style="font-weight: bold">
                  ¿Qué aprenderás?
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  <div v-html="mCourse.will_learn"></div>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header style="font-weight: bold">
                  ¿Qué conocimientos previos necesitas?
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  <div v-html="mCourse.prev_knowledge"></div>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header style="font-weight: bold">
                  ¿A quién está dirigido?
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  <div v-html="mCourse.course_for"></div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-skeleton-loader v-else type="sentences@5"></v-skeleton-loader>
          </div>

          <div>
            <h4
              class="font-weight-bold my-5"
              :class="{ loader: isLoading, 'loader-text-small': isLoading }"
            >
              Temario del curso
            </h4>
            <div v-if="isLoading" class="loader loader-temary"></div>
            <ul class="list-group" v-if="course">
              <li
                class="list-group-item"
                v-for="(model, index) in course.modules"
                :key="index"
              >
                <span
                  v-b-toggle="model.name.replace(/ /g, '')"
                  class="cursor-pointer"
                >
                  <strong> {{ index + 1 }}. {{ model.name }}</strong>
                </span>
                <b-collapse
                  :visible="index === 0"
                  :id="model.name.replace(/ /g, '')"
                >
                  <ul class="list-unstyled">
                    <li
                      v-for="(less, index) in course.modules[index].lessons"
                      :key="index"
                      class="my-4"
                    >
                      <div
                        class="cursor-pointer"
                        v-if="course.modules[0].lessons[0].id === less.id"
                        @click="getVideo(less.id)"
                        data-toggle="modal"
                        data-target="#video"
                      >
                        <em class="far fa-play-circle text-success mr-3"></em
                        >{{ less.name }}
                      </div>
                      <div v-else>
                        <em class="fas fa-lock mr-3"></em>{{ less.name }}
                      </div>
                    </li>
                  </ul>
                </b-collapse>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-lg-3 col-md-12 mt-4 pr-0">
          <!-- Recomendaciones -->
          <div class="mt-4">
            <h5
              class="font-weight-bold my-3"
              :class="{
                loader: loadingRelated,
                'loader-text-small': loadingRelated,
              }"
            >
              Recomendaciones
            </h5>
            <div v-if="loadingRelated">
              <div class="loader loader-card my-4"></div>
              <div class="loader loader-card my-4"></div>
              <div class="loader loader-card my-4"></div>
            </div>
            <div class="card-container">
              <div
                class="mb-4 cursor-pointer"
                v-for="course in all_courses"
                :key="course.id"
              >
                <Card
                  :course="course"
                  :cardType="1"
                  :isMouseOverActive="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="video"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content bg-dark">
            <div class="modal-header">
              <h3
                class="modal-title text-white text-center"
                id="staticBackdropLabel"
              >
                {{ mCourse.nombre }}
              </h3>
            </div>
            <div class="modal-body">
              <div class="video">
                <WatchIntro v-if="renderVideo" />
                <div v-else class="center-spinner">
                  <b-spinner
                    style="width: 3rem; height: 3rem"
                    variant="secondary"
                    label="Large Spinner"
                  ></b-spinner>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import WatchIntro from "@/components/course/video/watch-intro";
import NavBar from "@/views/public/layouts/navbar.vue";
import Footer from "@/views/public/layouts/footer.vue";

import Card from "@/components/courses/cards";
import { mapState, mapActions } from "vuex";
import CulqiCheckout from "vue-culqi-checkout";

export default {
  name: "VirtualClassroomBuyCursos",

  props: ["ide"],
  data() {
    return {
      mCourse: {},
      all_courses: [],
      slug: null,
      loadingRelated: true,
      isDetailsLoading: false,
      courseFilter: null,
      culqiConfig: {
        publicKey: "sk_live_fddfcb5d2c8ddbb0",
        title: "INSTITUTO PERUANO SSOMA",
        currency: "PEN",
        style: {
          logo: "https://www.ipssoma.com/images/s2.png",
          maincolor: "#ffbf00",
          buttontext: "#ffffff",
        },
      },
    };
  },
  components: {
    WatchIntro,
    NavBar,
    Footer,
    Card,
  },
  computed: {
    ...mapState("course", ["course", "renderVideo", "isLoading"]),
  },

  methods: {
    async pay() {
      const token = await this.$culqi.openCheckout();
    },

    ...mapActions("course", {
      getCourse: "getCourse",
      getVideo: "getVideo",
      buyCourse: "buyCourse",
    }),

    GoCourse() {
      this.$router.push("/suscription-user");
    },

    async getAttributes() {
      this.slug = this.$route.params.slug;
      const { data } = await this.$axios.get(
        `/public/course/details/${this.slug}`
      );
      this.mCourse = data;
      this.culqiConfig.amount = data.precio.toFixed(2).replace(".", "");
      this.culqiConfig.description = data.nombre;
      this.isDetailsLoading = true;
    },

    async getCourses() {
      const { data } = await this.$axios.get(`/public/course/list`);
      this.all_courses = data;
      this.loadingRelated = false;
      //   this.lord = false;
      //   this.guardar = true;
      //   this.loading = false;
      //   this.mostrar = true;
      //   this.courses = datos.data.data;
      //   this.courses1 = this.courses.slice(0, 3);
    },
  },

  watch: {
    slug() {
      this.getAttributes();
    },
  },
  created() {
    this.getAttributes();
    this.getCourse(this.$route.params.slug);
    window.Vue.use(CulqiCheckout, this.culqiConfig);
    this.getCourses();
  },
};
</script>

<style scoped>
.avatar-productor {
  width: 300px;
}

.container-fluid {
  width: 100%;
  margin-inline: auto;
  padding-bottom: 50px;
  background-image: none !important;
}

.title-course {
  text-transform: uppercase;
}

.img-course {
  width: 100%;
  max-width: 900px;
  max-height: 427px;
  border-radius: 25px;
}

.img-card {
  width: 100%;
  border-radius: 25px 25px 0px 0;
  height: 50%;
}

@media (max-width: 700px) and (min-width: 577px) {
  .img-card {
    height: 40%;
  }
}

.img-productor {
  width: 100% !important;
  height: 100% !important;
  max-width: 100px;
  max-height: 100px;
}

.list-group {
  padding-left: 0;
  border-radius: 25px;
}

.video {
  width: 100%;
  margin: auto;
  height: 600px;
}

.puntuacion {
  font-size: 1.04rem;
}

.detalles p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (min-width: 1800px) {
  .container-fluid {
    width: 76%;
  }
}

@media (max-width: 1500px) {
  .detalles {
    font-size: 10px;
  }
}

@media (max-width: 1200px) {
  .img-productor {
    width: 70% !important;
    height: 80% !important;
  }
}

@media (max-width: 991px) {
  .loader-img-course {
    display: none !important;
  }

  .img-course {
    display: none !important;
  }

  .detailsCourse {
    display: flex;
    flex-direction: column;
    justify-content: center !important;
    text-align: center !important;
    padding-right: 1rem !important;
  }

  .detailsCourse p {
    text-align: center !important;
  }

  p {
    padding-right: 0 !important;
  }

  .cardCursos {
    width: 40% !important;
    flex: none !important;
  }

  .card-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .detalles {
    font-size: 20px;
  }
}

@media (max-width: 576px) {
  .img-productor {
    width: 155% !important;
    margin-left: 0 !important;
  }

  .productor {
    display: flex !important;
    flex-direction: row !important;
  }

  .productor .image {
    width: 20% !important;
  }

  .productor .detalles {
    width: 80% !important;
  }

  .cardCursos {
    width: 100% !important;
    flex: none !important;
  }
}

/* Animaciones de carga para cada elemento */

.loader-titles {
  height: 40px;
  width: 100%;
}

.loader-descriptions {
  height: 50px;
}

.loader-text-small {
  height: 30px;
  width: 70%;
}

.loader-card {
  height: 300px;
}

.loader-temary {
  height: 800px;
}

.loader-img-productor {
  height: 100%;
  width: 100%;
}

.loader-img-course {
  height: 427px;
}
</style>
