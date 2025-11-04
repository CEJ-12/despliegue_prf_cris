<template>
  <Courses />
</template>
<script>
import Courses from "@/components/courses/Courses.vue";
export default {
  name: "Products",
  components: {
    Courses,
  },
  created() {
    localStorage.setItem("mode", "private");
    localStorage.setItem("showPrivateNavbar", false);
    // this.showPrivateNavbar = localStorage.getItem("showPrivateNavbar");
    // this.mode = localStorage.getItem("mode");
  },
};
</script>
