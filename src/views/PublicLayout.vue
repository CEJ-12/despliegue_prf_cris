<template>
  <div>
    <NavBar></NavBar>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "@/views/public/layouts/navbar.vue";
import Footer from "@/views/public/layouts/footer.vue";

export default {
  name: "index",
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {};
  },
};
</script>
