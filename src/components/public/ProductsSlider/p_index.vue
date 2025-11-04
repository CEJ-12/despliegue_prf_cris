<template>
  <div>
    <!-- BJFG -->
    <div class="w3l-grids-block-5 py-5" id="course">
      <div class="container py-md-5 py-4">
          <div class="title-main text-center mx-auto mb-md-5 mb-4" style="max-width:500px;">
              <h3 class="title-style">{{ $t('message.our_course') }}</h3>
          </div>
        <!-- type of courses -->
        <div class="language-banner">
            <div v-for="idioma in idiomas" :key="idioma.value" class="language-item"
            :class="{ active: idiomaSeleccionado === idioma.value }"
            @click="cambiarIdioma(idioma.value)">
            
                <img :src="idioma.flag" class="flag" />
                <span>{{ idioma.label }}</span>
            </div>
        </div>
        <!-- end type of courses -->

        <!-- courses loaded -->
        <div v-show="idiomaSeleccionado" class="row justify-content-center">
            <div class="col-lg-4 col-md-6" v-for="course in filteredProducts" :key="course.id">
            <ProductCard :course="course" :mode="mode" />
            </div>
        </div>
        <!-- end courses loaded -->
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/public/ProductCard/index.vue";

export default {
  name: "ProductsSlider",
  components: {
    ProductCard
  },

  data() {
    return {
      mode: null,
      model: null,
      ///
      idiomaSeleccionado: "",
      cache: {
        frances: [],
        ingles: [],
        espanol: [],
      },
      idiomas: [
        {
          value: "frances",
          label: "Francés",
          flag: "https://images.icon-icons.com/97/PNG/256/france_flags_flag_16999.png",
        },
        {
          value: "ingles",
          label: "Inglés",
          flag: "https://images.icon-icons.com/97/PNG/256/united_states_flags_flag_17080.png",
        },
        {
          value: "espanol",
          label: "Español",
          flag: "https://images.icon-icons.com/97/PNG/256/spain_flags_flag_17068.png",
        },
      ],
      
    };
  },
  mounted() {
    this.mode = localStorage.getItem("mode");
    if (this.products && this.products.length) {
      this.prepararCache(this.products);
    }
  },
  props: {
    products: {
      type: Array,
    }
  },

  watch: {
    products: {
      handler(nuevosProductos) {
        if (nuevosProductos && nuevosProductos.length) {
          this.prepararCache(nuevosProductos);
        }
      },
      immediate: false,
    },
  },

  methods: {

    prepararCache(listaCursos) {
      const texto = (t) => (t ? t.toLowerCase() : "");
      const cache = { frances: [], ingles: [], espanol: [] };
      for (const course of listaCursos){
        const name = texto(course.nombre);
        if (name.includes("france") || name.includes("french")) cache.frances.push(course);
        else if (name.includes("ingl") || name.includes("english")) cache.ingles.push(course);
        else if (name.includes("espa") || name.includes("spanish")) cache.espanol.push(course);
      }
      this.cache = cache;
    },
    cambiarIdioma(idioma) {
      this.idiomaSeleccionado = idioma;
    },
  },
    computed: {
        filteredProducts() {
        if (!this.idiomaSeleccionado) return [];
        return this.cache[this.idiomaSeleccionado] || [];
    },
    },
};

</script>

<style scoped>
.language-banner {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  gap: 1.5rem;
  padding: 20px 0;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.language-banner::-webkit-scrollbar {
  display: none;
}

.language-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 140px;
  height: 140px;
  border-radius: 16px;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-align: center;
  border: 2px solid transparent;
}

.language-item:hover {
  transform: scale(1.08);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.25);
}

.language-item.active {
  border-color: #007bff;
  background-color: #e8f0fe;
  transform: scale(1.1);
}

.flag {
  width: 100px;       
  height: 65px;       
  border-radius: 8px; 
  object-fit: contain;
  margin-bottom: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.language-item:hover .flag {
  transform: scale(1.1);
}

.language-item span {
  font-weight: 700;
  font-size: 16px;
  color: #333;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
</style>