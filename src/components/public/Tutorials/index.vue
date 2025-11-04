<template>
  <!-- BJFG -->

  <!-- stats block -->
  <section class="w3-stats pt-4 pb-5" id="stats">
        <div class="container pb-md-5 pb-4">
            <div class="title-main text-center mx-auto mb-md-5 mb-4" style="max-width:500px;">
                <p class="text-uppercase">{{ $t('message.education_tour_title') }}</p>
                <h3 class="title-style">{{ $t('message.education_tour') }}</h3>
            </div>
            <div class="row text-center pt-4 justify-content-center">
                <div class="col-md-3 col-6">
                    <div class="counter">
                        <img src="../../../assets/icon-1.png" alt="" class="img-fluid">
                        <div class="timer count-title count-number mt-sm-1" data-to="+1000" data-speed="9500">+1000</div>
                        <p class="count-text">{{ $t('message.education_tour_student') }}</p>
                    </div>
                </div>
                <div class="col-md-3 col-6 mt-md-0 mt-5">
                    <div class="counter">
                        <img src="../../../assets/icon-3.png" alt="" class="img-fluid">
                        <div class="timer count-title count-number mt-3" data-to="3630" data-speed="1500">+1500</div>
                        <p class="count-text">{{ $t('message.class') }}</p>
                    </div>
                </div>
                <div class="col-md-3 col-6 mt-md-0 mt-5">
                    <div class="counter">
                        <img src="../../../assets/icon-4.png" alt="" class="img-fluid">
                        <div class="timer count-title count-number mt-3" data-to="6300" data-speed="1500">100%</div>
                        <p class="count-text">{{ $t('message.education_tour_exam') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- //stats block -->

  <!-- BJFG -->


  <!-- <div id="videos-tutoriales">
    <div class="container">
      <div class="row px-2">
        <div class="col-sm-12 col-md-6 video-tutorial">
          <div class="text-center font py-5">
            <h5 style="min-block-size: 60px; font-size: 1.5em">
              Conoce cómo ingresar a tu campus virtual del IPSSOMA
            </h5>
          </div>
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              class="embed-responsive-item"
              loading="lazy"
              src="https://www.youtube.com/embed/UFL2NUmCRkU"
            ></iframe>
          </div>
        </div>
        <div class="col-sm-12 col-md-6 video-tutorial">
          <div class="text-center font py-5">
            <h5 style="min-block-size: 60px; font-size: 1.5em">
              Conoce cómo usar tu campus virtual del IPSSOMA
            </h5>
          </div>
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              class="embed-responsive-item"
              loading="lazy"
              src="https://www.youtube.com/embed/waHtoiQRHXQ"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {},
};
</script>

<style>
.font {
  font-family: Roboto !important;
  /* font-size: 1.5em; */
}

.row {
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
</style>
