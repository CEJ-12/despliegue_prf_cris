<template>
  <div>
    <!-- BJFG -->
    <div class="w3l-grids-block-5 py-5" id="course">
      <div class="container py-md-5 py-4">
          <div class="title-main text-center mx-auto mb-md-5 mb-4" style="max-width:500px;">
              <h3 class="title-style">{{ $t('message.our_course') }}</h3>
          </div>
          <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6" v-for="course in products" :key="course.id">
                <ProductCard :course="course" :mode="mode" />
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/public/ProductCard/index.vue";

export default {
  name: "ProductsSlider",
  components: {
    ProductCard
  },
  data() {
    return {
      mode: null,
      model: null
    };
  },
  mounted() {
    this.mode = localStorage.getItem("mode");
  },
  props: {
    products: {
      type: Array,
    }
  },
  methods: {},
};
</script>