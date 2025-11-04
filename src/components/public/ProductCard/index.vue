<template>
    <div class="coursecard-single" v-once>
      <div class="grids5-info position-relative">
          <img :src="course.portada_url" alt="" class="img-fluid">
          <div class="meta-list">
              <a href="javascript:void(0)">FR</a>
          </div>
      </div>
      <div class="content-main-top">
          <div class="content-top mb-4 mt-3">
              <ul class="list-unstyled d-flex align-items-center justify-content-between">
                  <li> <i class="fas fa-book-open"></i> </li>
                  <li> <i class="fas fa-star"></i> 5</li>
              </ul>
          </div>
          <h4><a href="javascript:void(0)">{{ course.nombre }}</a></h4>
          <!-- <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> -->
          <div class="top-content-border d-flex align-items-center justify-content-between mt-4 pt-4">
              <h6 v-if="course.precio > 0">€ {{ course.precio.toFixed(2) }}</h6>
              <a class="btn btn-style-primary" v-if="course" @click="goToCourse()">
                {{ $t('message.cours_information') }}
                <i class="fas fa-arrow-right"></i>
              </a>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  data() {
    return {};
  },
  props: {
    course: {
      type: Object,
    },
    mode: {
      type: String,
      default: "private",
    },
    width: Number,
    height: {
      type: String,
      default: "100%",
    },
  },

  methods: {
    goToCourse() {
      localStorage.setItem("mode", this.mode);
      var type = this.getProductType(this.course.tipo_producto_id) == null ? 'oferta' : this.getProductType(this.course.tipo_producto_id);
      if(type == 'oferta'){
        const config = {
          slug: this.course.slug,
        };  
        this.$router.push({
          name: "oferta",
          params: config,
        });
      }else{
        const config = {
          type: type,
          slug: this.course.slug,
        };  
        this.$router.push({
          name: "producto",
          params: config,
        });
      }
    },

    getProductType(id) {
      if (id == 1) {
        return "curso";
      } else if (id == 2) {
        return "diplomado";
      }
    },
  },
};
</script>
