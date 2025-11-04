<template>
  <div style="min-height: 100vh">
    <div class="row px-4">
      <div class="col-md-12 col-sm-12">
        <h3 class="mb-2 font-weight-normal">{{ $t('message.my_courses') }}</h3>
        <div v-if="notCourses" class="mb-4">
          <div class="no-result sad-face">
            <span>Lo sentimos, aún no hay cursos disponibles.</span>
          </div>
        </div>

        <div class="mt-5" v-if="loading">
          <loadingCourses />
        </div>

        <div class="mb-4 ml-2" v-if="products.length > 0 && !loading">
          <CarrouselCourse :courses="products" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CarrouselCourse from "@/components/courses/CarrouselCourse";
import loadingCourses from "@/components/courses/loadingCourses";
export default {
  data() {
    return {
      products: [],
      loading: true,
      notCourses: false,
    };
  },
  components: {
    CarrouselCourse,
    loadingCourses,
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        let user_id = localStorage.getItem("id_user");
        const { data } = await this.$axios.get(
          `/user/${user_id}/purchased-products`
        );
        this.products = data;
        this.loading = false;
      } catch (error) {
        // reload page
        window.location.reload();
      }
    },
  },
};
</script>
