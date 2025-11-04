<template>
  <div class="bg-light" style="margin-top: 100px;" id="superior">
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
                loader: !mCourse.categoria,
                'loader-text-small': !mCourse.categoria,
              }"
            >
              <em class="fas fa-bezier-curve mr-2"></em
              ><strong>{{ $t('message.cour_category') }}:</strong>
              {{ mCourse.categoria }}
            </li>
            <li>
              <button
                v-if="mode == 'private'"
                class="btn mt-3"
                style="
                  border-radius: 15px;
                  font-weight: 700;
                  background-color: #ffc107;
                "
                @click="redirectToPay()"
              >
                {{ $t('message.cour_purchase') }}
              </button> 
              <button
                v-else
                class="btn mt-3"
                style="
                  border-radius: 15px;
                  font-weight: 700;
                  background-color: #ffc107;
                "
                @click="dialog2 = true"
              >
              {{ $t('message.cour_purchase') }}
              </button>
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
          <WatchIntro :url="url"></WatchIntro>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-9 col-md-12 mt-4">
          <div class="border-box">
            <v-expansion-panels accordion v-if="isDetailsLoading">
              <v-expansion-panel>
                <v-expansion-panel-header style="font-weight: bold">
                  <!-- Descripción del curso -->
                  1. {{ $t('message.cour_information_1') }}
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  <div v-html="mCourse.descripcion"></div>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header style="font-weight: bold">
                  <!-- Acerca de este curso -->
                  2. {{ $t('message.cour_information_2') }}
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  <div v-html="mCourse.objetivo"></div>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header style="font-weight: bold">
                  3. {{ $t('message.cour_information_3') }}
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  <div v-html="mCourse.course_for"></div>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header style="font-weight: bold">
                  4. {{ $t('message.cour_information_4') }}
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  <div v-html="mCourse.will_learn"></div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-skeleton-loader v-else type="sentences@5"></v-skeleton-loader>
          </div>

          <div class="mt-5">
            <span
              class="ml-5"
              style="
                background-color: #f8f9fa;
                font-weight: bold;
                font-size: 1em;
              "
            >
              5. {{ $t('message.cour_information_plan') }}
            </span>

            <v-expansion-panels accordion v-if="isDetailsLoading" class="mt-5">
              <v-expansion-panel
                v-for="(module, index) in course.modules"
                :key="index + 1"
              >
                <v-expansion-panel-header
                  style="font-weight: bold; background-color: #0078D7; color: #f8f9fa;"
                >
                  {{ $t('message.cour_information_module') }} {{ index + 1 }}. {{ module.name }}
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-justify">
                  <ul class="list-unstyled">
                    <div v-if="course.modules[index].lessons.length > 0">
                      <li
                        v-for="(less, subindex) in course.modules[index]
                          .lessons"
                        :key="subindex + 1"
                        class="my-4"
                      >
                        <div
                          class="cursor-pointer"
                          v-if="less.is_preview === 1"
                        >
                          <em
                            class="far fa-play-circle mr-3"
                            style="color: #ffc700; font-size: 1em"
                          ></em
                          >{{ index + 1 }}.{{ subindex + 1 }} {{ less.name }}
                        </div>
                        <div v-else>
                          <em class="fas fa-lock mr-3"></em>{{ index + 1 }}.{{
                            subindex + 1
                          }}
                          {{ less.name }}
                        </div>
                      </li>
                    </div>
                    <div v-else>
                      <li class="my-4">
                        <em
                          class="fas fa-exclamation-circle mr-3"
                          style="color: #ffc700; font-size: 1em"
                        ></em
                        ><strong>Aún no hay lecciones en este módulo</strong>
                      </li>
                    </div>
                  </ul>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-skeleton-loader v-else type="sentences@5"></v-skeleton-loader>
          </div>
        </div>

        <div class="col-lg-3 col-md-12 mt-4 pr-0">
          <div class="mt-4">
            <h5
              class="font-weight-bold my-3"
              :class="{
                loader: loadingRelated,
                'loader-text-small': loadingRelated,
              }"
            >
              {{ $t('message.cour_recomendation') }}
            </h5>

            <div v-if="loadingRelated">
              <div class="loader loader-card my-4"></div>
              <div class="loader loader-card my-4"></div>
              <div class="loader loader-card my-4"></div>
            </div>
            <div
              class="my-5 cursor-pointer"
              v-for="course in all_courses.slice(0, 3)"
              :key="course.id"
            >
              <Card :course="course" :mode="mode" />
            </div>
          </div>
        </div>
      </div>

    </div>
    <div id="registerModal">
      <v-dialog v-model="dialog2" width="1000">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            <div>Registro</div>
            <v-spacer></v-spacer>
            <v-btn color="#ffc700" class="mr-4" @click="dialog2 = false">
              x
            </v-btn>
          </v-card-title>

          <v-card-text class="mt-6">
            <v-form ref="form2" v-model="valid2" lazy-validation>
              <div class="row">
                <div class="col">
                  <v-text-field
                    outlined
                    v-model="form2.name"
                    label="Nombres completos"
                    required
                  ></v-text-field>
                  <v-text-field
                    outlined
                    v-model="form2.password"
                    label="Contraseña"
                    type="password"
                    required
                  ></v-text-field>
                  <v-text-field
                    outlined
                    v-model="form2.email"
                    label="Correo"
                    required
                    typeof="email"
                    type="email"
                  ></v-text-field>
                  <v-text-field
                    outlined
                    v-model="form2.phone"
                    label="Numero de celular"
                    required
                  ></v-text-field>
                </div>
                <div class="col">
                  <v-select
                    outlined
                    v-model="form2.doc_type_id"
                    item-text="name"
                    item-value="id"
                    :items="documentType"
                    label="Tipo de documento"
                  ></v-select>
                  <v-text-field
                    outlined
                    v-model="form2.number_doc"
                    label="Numero de documento"
                    required
                  ></v-text-field>
                  <v-select
                    outlined
                    v-model="form2.country"
                    item-text="name"
                    item-value="name"
                    :items="country"
                    label="Pais"
                  ></v-select>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        v-model="form2.birthday"
                        label="Elije una fecha de nacimiento"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="form2.birthday" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="#ffc700" @click="menu = false">
                        Cancelar
                      </v-btn>
                      <v-btn
                        text
                        color="#ffc700"
                        @click="$refs.menu.save(date)"
                      >
                        Aceptar
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </div>
              </div>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#ffc700" @click="register" :disabled="loadingRegister"> {{ loadingRegister ? 'Registrando...' : 'Registrar'}} </v-btn>
            <v-btn color="#ffc700" @click="dialog2 = false"> Cancelar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import WatchIntro from "@/components/auth/course/video/watch-intro";
import Card from "@/components/courses/cards";
import { mapState, mapActions } from "vuex";
import CulqiCheckout from "vue-culqi-checkout";

export default {
  name: "Product",
  data() {
    return {
      slug: "",
      url: "",
      mCourse: {},
      mode: "",
      all_courses: [],
      course_id: null,
      loadingRelated: true,
      isDetailsLoading: false,
      courseFilter: null,
      culqiConfig: {
        // publicKey: "pk_live_bb31092d20cc0fac",
        publicKey: "pk_test_cdbcffcc00366c42",
        title: "INSTITUTO PERUANO SSOMA",
        currency: "PEN",
        style: {
          logo: "https://www.ipssoma.com/images/s2.png",
          maincolor: "#ffbf00",
          buttontext: "#ffffff",
        },
      },
      //
      form2: {},
      dialog2: false,
      valid2: true,
      loadingRegister: false,
      statusErrorRegister: false,
      message: "",
      documentType: {},
      country: {},
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      email: "",
    };
  },
  components: {
    WatchIntro,
    Card,
  },
  computed: {
    ...mapState("course", ["course", "renderVideo", "isLoading"]),
  },

  methods: {
    goToLogin() {
      localStorage.removeItem("access_token");
      this.$router.push("/iniciar-sesion");
    },
    redirectToPay() {
      this.$router.push("/" + this.slug + "/pay");
    },
    async pay() {
      const token = await this.$culqi.openCheckout();

      let url = "https://api.culqi.com/v2/charges";
      let config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer sk_test_IgMIsYRwitu2jb5m",
          // Authorization: "Bearer sk_live_fddfcb5d2c8ddbb0",
        },
      };
      let body = {
        amount: this.culqiConfig.amount,
        currency_code: "PEN",
        email: token.email,
        source_id: token.id,
      };

      await this.$axios.post(url, body, config).then((request) => {
        if (request.data.outcome.type == "venta_exitosa") {
          this.modalTitle = "Felicidades";
          this.modalMessage = "El pago se realizó con éxito";
          const form = {
            user_id: localStorage.getItem("id_user"),
            product_id: this.mCourse.id,
            amount: this.culqiConfig.amount,
            reference_code: request.data.reference_code,
          };
          this.$axios.post("/payments/save-payment", form);
        } else {
          this.modalTitle = "Lo sentimos";
          this.modalMessage = "No se ha efectuado el pago";
        }
      });
    },

    ...mapActions("course", {
      getCourse: "getCourse",
      getVideo: "getVideo",
      buyCourse: "buyCourse",
    }),

    async getAttributes() {
      const { data } = await this.$axios.get(
        `/public/course/details/${this.$route.params.slug}`
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
    },

    async getVideo() {
      const { data } = await this.$axios.get(
        `/public/video/get-video-intro/${this.slug}`
      );
      this.url = data;
    },
    scrollInto() {
      const section = document.querySelector(`#superior`);
      section.scrollIntoView({
        behavior: "smooth",
      });
    },
    async register() {
      this.loadingRegister = true;
      try {
        const { status, data: response } = await this.$axios.post(
          "/public/registerAcademyUser",
          this.form2
        );
   
        if (status == 200) {

          this.login();
        } else {
          alert(response.message)
        }
      } catch (error) {
        this.loadingRegister = false;
        alert('El correo o documento ya existe')
      }
    },
    async login(){
      const { status, data: response } = await this.$axios.post(
            "/public/auth/login",
            {
              email: this.form2.email,
              password: this.form2.password,
            }
          );
          if (status === 200) {
            const { data } = await response;
            const { access_token, user } = await data;
            localStorage.setItem("id_user", user.id);
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("name_user", user.name);
            localStorage.setItem("email_user", user.email);
            localStorage.setItem("mode", "private");
            localStorage.setItem("showPrivateNavbar", true);
            localStorage.setItem("showPublicNavbar", false);
            localStorage.setItem("showPublicFooter", false);

            window.location.href = "/" + this.slug + "/pay";
          }
    },
    async listDocumentType() {
      try {
        const { status, data: response } = await this.$axios.get(
          "/public/listDocumentType"
        );
        if (status === 200) {
          this.documentType = response;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async listCountry() {
      try {
        const { status, data: response } = await this.$axios.get(
          "/public/listCountry"
        );
        if (status === 200) {
          this.country = response;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  // Buscar curso por slug
  watch: {
    $route: {
      handler: function () {
        this.slug = this.$route.params.slug;
        this.getCourses();
        this.getAttributes();
        this.getCourse(this.slug);
        this.getVideo();
      },
      immediate: true,
    },
  },
  created() {
    this.slug = this.$route.params.slug;
    this.mode = localStorage.getItem("mode");
    this.getAttributes();
    this.getCourse(this.slug);
    window.Vue.use(CulqiCheckout, this.culqiConfig);
    this.getCourses();
  },
  mounted() {
    this.scrollInto();

    this.listDocumentType();
    this.listCountry();
  },
};
</script>

<style scoped>
.container-fluid {
  width: 97%;
  margin-inline: auto;
  padding-bottom: 50px;
  background-image: none !important;
}

@media (min-width: 1800px) {
  .container-fluid {
    width: 76%;
  }
}

@media (max-width: 991px) {
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

  .card-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

.loader-titles {
  height: 40px;
  width: 100%;
}

.loader-text-small {
  height: 30px;
  width: 70%;
}

.loader-card {
  height: 300px;
}
.registerModal label{
  color: rgba(0,0,0,.6)!important;
}
</style>
