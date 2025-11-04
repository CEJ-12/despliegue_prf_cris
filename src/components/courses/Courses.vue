<template>
  <div style="min-height: 100vh">
    <!-- <SectionTitle title="Marketplace" /> -->

    <div class="row px-4">
      <div class="col-md-12 col-sm-12">
        <!-- <div v-if="notCourses" class="mb-4">
          <h3 class="m-0 font-weight-bold">Cursos</h3>
          <div class="no-result sad-face">
            <span>Lo sentimos, aún no hay cursos disponibles.</span>
          </div>
        </div> -->

        <div class="mt-5" v-if="loading">
          <loadingCourses />
        </div>

        <!-- <div class="mb-4 ml-2" v-if="relatedCourses.length > 0 && !loading">
          <h3 class="mb-1 font-weight-normal">Más recientes</h3>
          <CarrouselCourseMarketplace :courses="relatedCourses" />
        </div> -->

        <div class="mb-4 ml-2" v-if="all_products.length > 0 && !loading">
          <h3 class="mb-2 font-weight-normal">{{ $t('message.all_courses') }}</h3>
          <!-- <CarrouselCourseMarketplace :courses="all_products" /> -->
          <ProductsSlider :products="all_products"></ProductsSlider>
        </div>
        <div class="mb-4 ml-2" v-if="offers.length > 0 && !loading">
          <h3 class="mb-2 font-weight-normal">Ofertas</h3>
          <!-- <CarrouselCourseMarketplace :courses="all_products" /> -->
          <ProductsSlider :products="offers"></ProductsSlider>
        </div>

        <!-- <div class="mb-4" v-if="interesCourses.length > 0 && !loading">
          <h3 class="m-0 font-weight-normal">Cursos de interés</h3>
          <CarrouselCourseMarketplace :courses="interesCourses" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import CarrouselCourseMarketplace from "@/components/courses/CarrouselCourseMarketplace";
import ProductsSlider from "@/components/public/ProductsSlider/index.vue";
import loadingCourses from "@/components/courses/loadingCourses";
// import SectionTitle from "../Navbar/SectionTitle.vue";
export default {
  name: "Courses",
  components: {
    ProductsSlider,
    loadingCourses,
    // SectionTitle,
  },
  data() {
    return {
      all_products: [],
      loading: true,
      offers: [],
    };
  },

  methods: {
    async getCourses() {
      var user_id = localStorage.getItem("id_user");
      const { data } = await this.$axios.get(`/course/list-marketplace/${user_id}`);
      this.all_products = data;
    },
    async getOffers(){
      const { data } = await this.$axios.get('/offers/list');
      this.offers = data;
    },
  },
  mounted() {
    this.getCourses();
    this.getOffers();
    this.loading = false;
  },
  created() {

    localStorage.setItem("showPrivateNavbar", true);
    localStorage.setItem("showPublicNavbar", false);
    localStorage.setItem("showPublicFooter", false);
  },
};
</script>
<style>
.sad-face {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
