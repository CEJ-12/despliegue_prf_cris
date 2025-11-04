<template>
  <div
    :title="course.title"
    class="course-container"
    v-if="course"
    @click="goToCourse()"
  >
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <div class="course-card" v-bind="attrs" v-on="on">
          <img
            src="https://www.ipssoma.com/images/portada_producto/pKcYusiCj7xtkvw8KQCOus69L9pNCOvpZUMdtZdV.avif"
            alt="no image"
            class="img-fluid course-img"
          />
          <div class="dark-text course-name mb-2">
            <span class="font text-justify">{{ course.nombre }}</span>
          </div>
          <div class="extra-info-container text-color py-3">
            <!-- <p class="fila-precio dark-text" v-if="course.precio == 0">
          <img src="@/assets/free.png" alt="Gratis" width="20" /> GRATIS
        </p> -->
            <div class="row-info">
              <div v-if="course.precio > 0" class="first-row text-white font text-justify">
                S/. {{ course.precio.toFixed(2) }}
              </div>
            </div>

            <div class="row-info">
              <button class="btn bg-primary-pl font text-justify">COMPRAR</button>
            </div>
          </div>
        </div>
      </template>
      <span class="font text-justify">{{ course.nombre }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {};
  },
  props: {
    course: {
      type: Object,
    },
    cardType: Number,
    width: Number,
    height: {
      type: String,
      default: "100%",
    },
  },
  methods: {
    goToCourse() {
      const config = {
        type: this.getProductType(this.course.tipo_producto_id),
        slug: this.course.slug,
      };
      this.$router.push({
        name: "producto",
        params: config,
      });
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

<style scoped>

.font {
    font-family: Roboto !important;
}

.text-justify {
    text-align: justify !important;
}

.course-container {
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  transition: 0.5s;
  max-width: 265px;
  min-width: 265px;
}
.course-container:hover {
  transform: scale(1.1);
  transition: 0.8s;
  cursor: pointer;
}

/* .course-container:hover .course-name {
  transition: 0.8s;
  margin-left: 8px;
} */

.bg-primary-pl {
  background-color: #ffc107;
}

.text-color {
  background-color: #131b1e;
}

.dark-text {
  color: #000000;
}

.course-card {
  width: 235px;
}
.course-img {
  border-radius: 10px 10px 0px 0px;
  height: 154px;
}

.extra-info-container {
  display: flex;
  flex-direction: row;
  border-radius: 0px 0px 10px 10px;
  justify-content: space-around;
  align-items: center;
  padding: 5px 0px;
}
.row-info {
  display: flex;
  flex-direction: column;
}
.course-name {
  /* transition: 0.8s; */
  padding: 5px;
  font-weight: 600;
  text-align: left;
  background-color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-block-size: 50px;
  /* min-block-size: 50px; */
}
.row-info button {
  font-size: 14px;
  font-weight: 700;
  padding: 5px 5px;
  border-radius: 8px;
}
.fila-precio {
  font-size: 18px;
  font-weight: 600;
}
.first-row {
  font-size: 1.2em;
  /* text-decoration-line: line-through; */
}
</style>
