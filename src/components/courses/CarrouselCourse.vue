<template>
  <main>
    <carousel
      :autoplay="true"
      :loop="true"
      :autoplayLoop="true"
      :autoplayTimeout="3000"
      :autoplayHoverPause="true"
      :navigationEnabled="true"
      :paginationEnabled="false"
      :perPageCustom="[
        [0, 1],
        [450, 1],
        [680, 1],
        [940,2],
        [1100, 3],
        [1200, 4],
      ]"
    >
      <slide v-for="course in courses" :key="course.id">
        <Card :course="course" :cardType="cardType" />
      </slide>
    </carousel>
  </main>
</template>

<script>
import Card from "@/components/courses/cards/misCursosCard.vue";
import { Carousel, Slide } from "vue-carousel";

export default {
  name: "CarrouselCourse",
  components: {
    Card,
    Carousel,
    Slide,
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
.header {
  margin-bottom: 16px;
}

.item {
  width: 300px !important;

  padding: 20px 0px 0px 0px;
}
</style>
