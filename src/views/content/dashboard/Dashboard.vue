<template>
  <div>
    <p>dashboard</p>
  </div>
</template>
<script>
export default {
  name: "Dashboard",
  components: {
  },
  data() {
    return {
      producer: false,
      distributor: false,
    };
  },
  created() {
    if (localStorage.getItem("rol_user") == 1) {
      this.producer = !this.producer;
    } else if (localStorage.getItem("rol_user") == 3) {
      this.distributor = !this.distributor;
    } else if (localStorage.getItem("rol_user") == 2) {
      this.producer = !this.producer;
    }
  },
};
</script>

<style scoped>
@media (max-width: 1000px) {
  .v-application--wrap {
    background-color: none !important;
  }
}

::-webkit-scrollbar {
  display: none;
}
</style>
