<template>
  <div class="container-fluid" id="nosotros">
    <div class="row">

      <section class="w3l-servicesblock pt-lg-5 pt-4 pb-5 mb-lg-5" id="about">
        <div class="container pb-md-5 pb-4">
            <div class="row pb-xl-5 align-items-center">
                <div class="col-lg-6 position-relative home-block-3-left pb-lg-0 pb-5">
                    <div class="position-relative">
                        <img src="https://images.pexels.com/photos/4050323/pexels-photo-4050323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" class="img-fluid radius-image">
                    </div>
                    <div class="imginfo__box">
                        <h6 class="imginfo__title">{{ $t('message.get_an_appointment') }}</h6>
                        <p></p>
                        <a href="tel:http://+33 7 49 63 00 70 "><i class="fas fa-phone-alt"></i> +33 7 49 63 00 70 </a>
                    </div>
                </div>
                <div class="col-xl-5 col-lg-6 offset-xl-1 mt-lg-0 mt-5 pt-lg-0 pt-5 gap-4">
                    <h3 class="title-style">"{{ $t('message.methodology_title') }}"</h3>
                    <p class="mt-4"></p>
                    <ul class="mt-4 my-4 list-style-lis pt-lg-1">
                        <li><i class="fas fa-check-circle"></i>{{ $t('message.sub_methodology_title_1') }}</li>
                        <li><i class="fas fa-check-circle"></i>{{ $t('message.sub_methodology_title_2') }}</li>
                        <li><i class="fas fa-check-circle"></i>{{ $t('message.sub_methodology_title_3') }}</li>
                    </ul>
                    <div class="mt-15">
                      <a href="contact.html" class="btn-style-now">{{ $t('message.apply_now') }}</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  </div>
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
.img-not-selectable {
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
  max-height: 300px;
  height: 300px;
  min-height: 300px;
}

/* estilos agregados */


.sub-banner-image {
  border-radius: 67% 33% 28% 72% / 59% 51% 49% 41%;
  text-align: center;
  max-width: 450px;
  max-height: 450px;
  background: var(--gradient-color-banner);
  margin-top: 80px;
}

.sub-banner-image img {
  position: absolute;
  top: -162px;
  right: 0px;
}

.btn-style-now{
  margin-top: 50px;
  margin-left: 30px;
  padding: 10px;
  background-color: white;
  border: solid 2px #1972b8;
  color: black;
  border-radius: 30px;
}

.btn-style-now:hover{
  background-color: #1972b8;
  border: solid 2px #1972b8;
  color: white;
}

.fa-check-circle{
  color: #1972b8;
}
</style>
