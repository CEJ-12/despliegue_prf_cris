<template>
  <main id="productos" class="container-fluid mt-5">
    <div class="row d-flex justify-content-center">
      <h2 class="my-5 font text-justify">Nuestros productos</h2>
      <div class="col-md-11">
        <vueper-slides
          :bullets="false"
          class="no-shadow"
          autoplay
          :visible-slides="4"
          slide-multiple
          :gap="3"
          :slide-ratio="1 / 4"
          :dragging-distance="100"
          :breakpoints="{ 800: { visibleSlides: 3, slideMultiple: 3 } }"
        >
        
          <template #arrow-left>
            <v-icon large color="#ffc107"> mdi-arrow-left </v-icon>
          </template>

          <vueper-slide v-for="course in courses" :key="course.id">
            <template #content>
              <Card :course="course" :cardType="cardType" />
            </template>
          </vueper-slide>

          <template #arrow-right>
            <v-icon large color="#ffc107"> mdi-arrow-right </v-icon>
          </template>
        </vueper-slides>
      </div>
    </div>
    <!-- <vue-horizontal>
      <section class="item" v-for="course in courses" :key="course.id">
        <Card :course="course" :cardType="cardType"/>
      </section>
    </vue-horizontal> -->
  </main>
</template>

<script>
import Card from "@/components/courses/cards/marketplace.vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  name: "CarrouselCourse",
  components: {
    Card,
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      peeked: false,
      timeout: null,
      baseURL: "http://promolider.xyz/storage/",
      cardType: 1,
    };
  },
  props: {
    courses: {
      type: Array,
    },
  },
  methods: {},
};
</script>

<style scoped>
.font {
    font-family: Roboto !important;
}

.text-justify {
    text-align: justify !important;
}

#productos {
    padding: 0 10rem 0 10rem;
    background: #e5e5e5;
}

</style>
