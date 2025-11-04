<template>
  <div>
    <!-- Crear contador para los simposios -->
    <CountDownAlert />
    <!-- listo -->
    <AnnouncementSlider  class="bg-image-size"></AnnouncementSlider>
    <!-- BEST FEATURES -->

    <section class="services-w3l-block py-5" id="features">
        <div class="container py-md-5 py-4">
            <div class="title-main text-center mx-auto mb-md-5 mb-4" style="max-width:500px;">
                <p class="text-uppercase"></p>
                <h3 class="title-style">{{ $t('message.title_bilingue') }}</h3>
            </div>
            <div class="row justify-content-center pt-7">
                <div class="col-md-6 col-lg-3 d-flex align-items-stretch">
                    <div class="icon-box icon-box-clr-1">
                        <div class="icon"><i class="fas fa-user-friends"></i></div>
                        <h4 class="title"><a href="#about">{{ $t('message.best_title_1') }}</a></h4>
                        <p>"{{ $t('message.best_sub_title_1') }}"</p>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1024px-Flag_of_France.svg.png" class="bandera-img">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png" class="bandera-img">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Bandera_Nacional_de_Espa%C3%B1a.png/800px-Bandera_Nacional_de_Espa%C3%B1a.png" class="bandera-img">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/1280px-Flag_of_Portugal.svg.png" class="bandera-img">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1500px-Flag_of_Italy.svg.png" class="bandera-img">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/800px-Flag_of_Germany.svg.png" class="bandera-img">
                    </div>
                </div>
                <div class="col-md-6 col-lg-3 d-flex align-items-stretch mt-md-0 mt-4">
                    <div class="icon-box icon-box-clr-2">
                        <div class="icon"><i class="fas fa-book-reader"></i></div>
                        <h4 class="title"><a href="#about">{{ $t('message.best_title_2') }}</a></h4>
                        <p>"{{ $t('message.best_sub_title_2') }}"</p>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3 d-flex align-items-stretch mt-lg-0 mt-4">
                    <div class="icon-box icon-box-clr-3">
                        <div class="icon"><i class="fas fa-user-graduate"></i></div>
                        <h4 class="title"><a href="#about">{{ $t('message.best_title_3') }}</a></h4>
                        <p>"{{ $t('message.best_sub_title_3') }}"</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- listo -->
    <AboutUs class="my-5"></AboutUs>
    <AboutVideo></AboutVideo>
    <Iso></Iso>
    <Tutorials></Tutorials>
    <Info></Info>
    <ProductsSlider
      :products="all_products"
      class="m-5"
      id="graduates"
    />
    <Checker></Checker>
  </div>
</template>
<script>
import CountDownAlert from "@/components/public/CountDownAlert/index.vue";
import AnnouncementSlider from "@/components/public/AnnouncementSlider/index.vue";
import AboutUs from "@/components/public/AboutUs/index.vue";
import AboutVideo from "@/components/public/AboutVideo/index.vue";
import ProductsSlider from "@/components/public/ProductsSlider/p_index.vue";
import Iso from "@/components/public/Iso/index.vue";
import Tutorials from "@/components/public/Tutorials/index.vue";
import Info from "@/components/public/Info/index.vue";
import Checker from "@/components/public/Checker/index.vue";

export default {
  data() {
    return {
      all_products: [],
      alert: true,
      mode: "public",
      showPrivateNavbar: true,
      loading: true,
    };
  },
  methods: {
    async getProducts() {
      const { data } = await this.$axios.get(`/public/course/list`);
      this.all_products = data;
      console.log(this.all_products)
    },
  },
  mounted() {
    this.getProducts();
  },

  components: {
    CountDownAlert,
    AnnouncementSlider,
    AboutVideo,
    AboutUs,
    ProductsSlider,
    Iso,
    Tutorials,
    Info,
    Checker,
  },

  created() {
    localStorage.setItem("mode", "public");
    localStorage.setItem("showPrivateNavbar", false);
    localStorage.setItem("showPublicNavbar", true);
    localStorage.setItem("showPublicFooter", true);
  },
};
</script>
<style>
body {
  background-color: #f5f3f3;
}
  @media screen and (max-width: 923px) {
    .bg-image-size {
      padding-top: 70px !important;
      -webkit-padding-top: 70px !important;
    }
  }

.bandera-img{
  width: 25px;
  margin-right: 10px;
} 

/* a {
  background-color: #fff !important;
} */
</style>
