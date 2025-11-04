<template>
  <div id="home">
    <!-- aqui comienza -->
    <section id="" class="w3l-banner py-5">
        <div class="banner-content">
            <section class="container py-4">
                <div class="row align-items-center pt-sm-5 pt-4">
                    <div class="col-md-6">
                        <h1 class="mb-lg-4 mb-3">
                          {{ $t('message.title_presentation') }}
                        </h1>
                        <p class="banner-sub">
                          {{ $t('message.sub_title_presentation') }}
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1024px-Flag_of_France.svg.png" class="bandera-img">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png" class="bandera-img">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Bandera_Nacional_de_Espa%C3%B1a.png/800px-Bandera_Nacional_de_Espa%C3%B1a.png" class="bandera-img">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/1280px-Flag_of_Portugal.svg.png" class="bandera-img">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1500px-Flag_of_Italy.svg.png" class="bandera-img">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/800px-Flag_of_Germany.svg.png" class="bandera-img">
                        </p>
                        <div class="d-flex align-items-center buttons-banner">
                            <a href="#contact" class="btn-style-home mt-lg-5 mt-4 text-white">{{ $t('message.signUp') }}</a>
                        </div>
                    </div>
                    <div class="bubble col-md-6 right-banner-2 text-end position-relative mt-md-0 mt-5">
                        <div class="sub-banner-image mx-auto my-1">
                        </div>
                        <img src="../../../assets/persona-banner1.png"  class="img-fluid img-persona-banner position-relative " alt="">
                    </div>
                </div>
            </section>
        </div>
    </section>
  </div>
</template>

<script>
 import "vueperslides/dist/vueperslides.css";

export default {
  name: "AnnouncementSlider",
  components: {
  },
  data() {
    return {
      sliderHeight: "",
      slides: [],
    };
  },
  methods: {
    screen() {
      let screenWidth = screen.width;
      if (screenWidth < 576) {
        this.sliderHeight = "200px";
      } else if (screenWidth >= 576 && screenWidth < 768) {
        this.sliderHeight = "400px";
      } else if (screenWidth >= 768) {
        this.sliderHeight = "580px";
      }
    },
    async getBanners(){
      await this.$axios.get('/public/banners/list').then((response) => {
        this.slides = response.data;
      })
    }
  },
  mounted() {
    this.screen();
    this.getBanners();
  },
};
</script>

<style >
:root{
  --banner-layer: #ffffffc2;
  --gradient-color-banner: linear-gradient(to left, #019ee1 0%, #0078D7 100%);
}
  
*, *::before, *::after {
      box-sizing: border-box;
}

.bandera-img{
  width: 25px;
  margin-right: 10px;
}

.vueperslides__progress {
  background: rgba(0, 0, 0, 0.25);
  color: #ffc107;
}

.vueperslides__fractions {
  font-weight: 600;
  background: #ffc107;
  color: #000;
}

  
  body {
    margin: 0;
    font-family: var(--bs-font-sans-serif);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  
  .w3l-banner {
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    min-height: 100vh;
    position: relative;
    z-index: 1;
    background: url(../../../assets/torre-eiffel-pexels1.jpg) no-repeat center;
  }

  .w3l-banner:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--banner-layer);
    z-index: -1;
    top: 0;
  }
  
  
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
  
    50% {
      background-position: 200% 50%;
    }
  
    100% {
      background-position: 0% 50%;
    }
  }


  .buttons-banner{
    /* background-color: #0078D7; */
  }

  .buttons-banner a{
    background-color: #0078D7;
    text-decoration: none;
    color: rgb(255, 255, 255);
    font-size: 20px;
    transition: all .3s ease-in-out;
  }

  .buttons-banner a:hover{
    color: black;
  }

  
  .img-persona-banner{

  }


  .btn-style-home {
  padding: 12px 36px 14px;
  font-size: 16px;
  color: #fff;
  border-radius: var(--border-radius-full);
  font-weight: bold;
  outline: none;
  border: none;
  background: var(--primary-color);
  text-decoration: none;
  transition: all .8s ease-in-out;
}

.btn-style-home:hover {
  color: #fff;
  outline: none;
  text-decoration: none;
}
  
  
  
  .w3l-banner h1 {
    font-size: 74px;
    line-height: 84px;
    font-weight: 700;
    color: rgb(0, 0, 0);
  }
  
  p.banner-sub {
    font-size: 20px;
    line-height: 30px;
    color: rgb(0, 0, 0);
  }
  
  @media (max-width: 1199px) {
  
    .w3l-banner h3 {
      font-size: 55px;
      line-height: 65px;
    }
  
    p.banner-sub {
      font-size: 16px;
      line-height: 28px;
    }
  }
  
  
  @media (max-width: 480px) {
    .w3l-banner h3 {
      font-size: 40px;
      line-height: 45px;
    }
  
    p.banner-sub {
      font-size: 15px;
      line-height: 26px;
    }
  }
  
  .sub-banner-image {
    border-radius: 67% 33% 28% 72% / 59% 51% 49% 41%;
    text-align: center;
    width: 320px;
    height: 320px;
    background: var(--gradient-color-banner);
    position: absolute;
    padding-top: 100px;
    left: 100px;
  }
  
  .bubble img {
    position: absolute;
    top: -50px;
    left: -70px;
    width: 450px;
    height: 450px;
  }
  
  @media (max-width: 1440px) {
    .sub-banner-image {
      max-width: 400px;
      max-height: 400px;
    }
  
    .sub-banner-image img {
      width: 94%;
    }
  }
  
  @media (max-width: 1050px) {
    .sub-banner-image {
      max-width: 360px;
      max-height: 360px;

    }

    .bubble img{
      left: 25px;
    }
  }
  
  @media (max-width:991px) {
  
    .w3l-banner {
      animation: gradient 30s ease infinite;
    }
  
    .w3l-banner h1 {
      font-size: 45px;
      line-height: 55px;
    }
  
    .sub-banner-image {
      max-width: 320px;
      max-height: 320px;
      left: 10px
    }
  }
  
  @media (max-width: 414px) {
    .sub-banner-image {
      top: 50px;
      left: 30px;
    }

  }
  
  @media (max-width: 330px) {
    .w3l-banner h3 {
      font-size: 35px;
      line-height: 40px;
    }
  }


</style>
