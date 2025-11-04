<template>
  <div class="py-1">
    <div
      :title="course.nombre"
      class="course-card my-5"
      v-if="course"
      @click="goToCourse()"
    >
      <div style="border-top-left-radius: 15px; border-top-right-radius: 15px">
        <img
          :src="course.portada_url"
          class="card-img-top border-radius-image"
          :alt="course.portada_url"
        />
      </div>

      <div class="content p-2">
        <div class="row">
          <div
            class="col-md-12 col-lg-12 col-sm-12 col-xs-12 py-4 mb-1 content-overflow"
          >
            <p class="text-left text-capitalize course-title">
              {{ course.nombre }}
            </p>
          </div>

          <div class="row pl-4">
            <div
              class="col-md-11 ml-1"
              style="
                background: #131b1e;
                border-bottom-left-radius: 15px;
                border-bottom-right-radius: 15px;
              "
            >
              <strong class="text-left" style="color: white">
                € {{ course.precio }}
              </strong>
              <strong>
                <button
                  class="btn bg-primary-pl btn-sm float-right"
                  style="border-radius: 15px; font-weight: 700"
                >
                  {{ $t('message.cours_information') }}
                </button>
              </strong>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      course_id: this.course.id,
    };
  },
  props: {
    mode: {
      type: String,
      default: "private",
    },
    course: {
      type: Object,
    },
  },
  mounted() {},
  methods: {
    goToCourse() {
      localStorage.setItem("mode", this.mode);
      const config = {
        type: this.getProductType(this.course.tipo_producto_id),
        slug: this.course.slug,
        // mode: this.mode,
        // showPrivateNavbar: this.showPrivateNavbar,
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
.border-radius-image {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.card-img-top {
  min-height: 210px;
  max-height: 210px;
}

.course-title {
  font-size: 1em;
  display: inline;
  font-weight: 500;
}

.course-card {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;

  transition: 0.5s;
  max-width: 280px;
  min-width: 280px;
}
.course-card:hover {
  transform: scale(1.1);
  transition: 0.8s;
  cursor: pointer;
}

.content {
  background: #ffffff;
  transition: 1s;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.content-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bg-primary-pl {
  background-color: #ffc107;
}
</style>
