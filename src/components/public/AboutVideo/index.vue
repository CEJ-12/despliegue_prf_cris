<template>
<div></div>


  <!-- <div class="px-2 pt-5">
    <div class="py-5 text-center"
      data-aos="zoom-in-down"
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"
    >
      cddjhbcjhdsbcjhdbcj
    </div>
    <div class="row pb-5 px-5 m-0">


      (comentar) <div class="embed-responsive embed-responsive-16by9 col-12 col-md-6 m-auto">
        <video src="@/assets/presentacion_vertical.mp4" controls class="mx-2"></video>
      </div> (comentar)


      <div class="embed-responsive embed-responsive-16by9 col-12 col-md-6">
        <iframe
        class="embed-responsive-item mx-2"
        frameborder="0"
        load="lazy"
        src="https://www.youtube.com/embed/UK4ogq-_rE4"

        ></iframe>
      </div>
      <div class="embed-responsive embed-responsive-16by9 col-12 col-md-6">
        <video src="@/assets/presentacion_horizontal.mp4" controls class="mx-2"></video>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
        slides: []
    };
  },

  methods: {
    async getCurses (){
        await this.$axios.get('/public/banners/list').then((res) => { this.slides = res.data; })
    }
  },
};
</script>

<style>
.font {
  font-family: Roboto !important;
}

</style>
