<template>
    <div class="bg-light">
      <div class="container-fluid">
        <!-- Primera sección -->
        <div class="row py-5">
          <!-- Detalles del curso -->
          <div class="col-lg-4 col-md-12 pr-5 detailsCourse">
            <h3
              class="mb-4 font-weight-bold"
              :class="{
                loader: !info.name,
                'loader-titles': !info.name,
              }"
            >
              {{ info.name }}
            </h3>
  
            <ul class="pl-3 mb-5 list-unstyled">
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
                  Comprar
                </button>
                <button
                  v-if="mode == 'public'"
                  class="btn mt-3"
                  style="
                    border-radius: 15px;
                    font-weight: 700;
                    background-color: #ffc107;
                  "
                  @click="goToLogin()"
                >
                  Regístrate o inicia sesión
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
                <img
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
              <div v-for="product in products" :key="product.id" class="text-left py-1">
                <button class="btn btn-primary" @click="redirectToProductInfo(product)">{{product.nombre}}</button>
              </div>
            </div>
          </div>
  
          <div class="col-lg-8 pr-0 pl-4">
            <WatchIntro :url="url"></WatchIntro>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import WatchIntro from "@/components/auth/course/video/watch-intro";
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
        products: [],
        info: [],
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
      };
    },
    components: {
      WatchIntro,
      // Card,
    },
    computed: {
      ...mapState("course", ["course", "renderVideo", "isLoading"]),
    },
  
    methods: {
      redirectToProductInfo(product){
        const params = {
          slug: product.slug,
          type: this.productType(product.tipo_producto_id)
        }
        this.$router.push({
          name: "curso",
          params: params
        })
      },
      goToLogin() {
        localStorage.removeItem("access_token");
        this.$router.push("/iniciar-sesion");
      },
      productType(id_type){
        return id_type == 1 ? "curso" : id_type == 2 ? "diplomado" : "producto";
      },
      redirectToPay(){
          this.$router.push("/"+this.slug+"/pay");
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
  
      async getOfferInfo(){
        await this.$axios.get(`/public/offers/info?slug=${this.slug}`).then((response) => {
          this.products = response.data.products_offer;
          this.info = response.data.offer_info;
          this.loadingRelated = false;
          this.isDetailsLoading = true;
        });
      },
    },
    // Buscar curso por slug
    watch: {
    },
    created() {
      this.slug = this.$route.params.slug;
      this.getOfferInfo();
      this.mode = localStorage.getItem("mode");
      window.Vue.use(CulqiCheckout, this.culqiConfig);
    },
  };
  </script>
  
  <style scoped>
  /* .avatar-productor {
    width: 300px;
  } */
  
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

  /* Animaciones de carga para cada elemento */
  
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
  </style>
  