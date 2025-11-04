<template>
  <div
    class="mb-3 px-4 bg-white"
    style="border-radius: 20px; margin-top: 40px; margin-right: 10px"
  >
  <div class="row">
    <div class="col-lg-6 col-md-6">
      <p
        class="text-left"
        style="
          font-size: 1.3em;
          font-weight: 600;
          margin-left: 20px;
          display: inline;
        "
      >
        {{ $t('message.'+title) }}
      </p>
    </div>
  </div>
    <div class="temario pb-3 overflow-auto">

      <div>
        <div v-if="content == 'temary'">
          <template v-if="course.modules.length !== 0">
            <ul
              v-for="(model, index) in course.modules"
              :key="index"
              class="mt-3"
            >
              <li class="nav-temario" :title="model.name">
                <p class="module-text" b-toggle="model.name.replace(/ /g, '')">
                  {{ index + 1 }}. {{ model.name }}
                </p>
  
                  <ul class="p-0">
                    <li
                      v-for="(less, index) in course.modules[index].lessons"
                      :key="index"
                    >
                      <a
                        class="m-0"
                        @click="changeClass(less)"
                        :class="{ activo: less.name === clase}"                      
                        :title="less.name"
                        >
                        <input
                          type="checkbox"
                          :value="less.id"
                          disabled
                          :checked="less.checkpoint"
                        />
                        <div class="ml-7 pl-2" :class="{ selected: less.name === clase }">
                          {{ less.name }}
                        </div>
                      </a>
                    </li>
                  </ul>
                <!-- </b-collapse> -->
              </li>
            </ul>
          </template>
          <template v-else>
            <div class="py-5 px-2 text-danger">
              Este curso aún no tiene clases
            </div>
          </template>
        </div>
       </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Temario",
  props: {
    course: Object,
    productType: Number,
  },
  data() {
    return {
      content: "temary",
      title: "syllabus",

      items: [
        { title: "syllabus", action: "temary" },
        { title: "exams", action: "tests" },
        { title: "dynamics", action: "games" },
      ],
      progress: 0,
      clase: null,
      completedLessons: [],
      loading: true,
    };
  },
  methods: {
    menuActionClick(action) {
      if (action === "temary") {
        this.content = "temary";
        this.title = "syllabus";
        
      } else if (action === "tests") {
        this.content = "tests";
        this.title = "exams";
      } else if (action === "games") {
        this.content = "games";
        this.title = "dynamics";
      }
    },

    //Ir al Examen Modulo
    goToExam(id) {
      this.$router.push({
        name: "test",
        params: { id },
        query: {
          class: this.$route.query.class,
          course: this.$route.query.course,
        },
      });
    },
    goToDinamics(id) {
      this.$router.push({
        name: "dinamic",
        params: { id },
        query: { c: this.$route.query.course },
      });
    },

    // Cambiar de clase
    changeClass(less) {
    // Cambiando de ruta  
      if(this.$route.params.mode ==  "preview"){
        const config = {
          slug: less.slug,
          productSlug: this.$route.params.productSlug,
          mode: "preview"
        }
        this.$router.push({
          name: "preview",
          params: config,
        })
      }else{
        const config = {
          type: this.getProductType(this.productType),
          slug: less.slug,
      }
        this.$router.push({
          name: "curso",
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
    // Clases completadas
    getCompletedLessons(id) {
      this.$axios.get(`purchased/show?course_id=${id}`).then((res) => {
        for (const index in res.data.data) {
          if (res.data.status[index] === "SEEN") {
            this.completedLessons.push(res.data.data[index]);
          }
        }
      });
    },

    // Enviando nueva clase vista
    checkClass(idClass) {
      this.$axios.put(
        `purchased/update?course_id=${this.$route.query.course}&class_id=${idClass}`
      );
    },
    getClassInfo(){
      this.$axios.get(`/public/course/class/${this.$route.params.slug}/info`).then((response) => {
        this.clase = response.data.name
      })
    }
  },
  created() {
    
  },
  updated() {

  },
  watch: {
    "$route.params.slug": {
      immediate: true,
      handler() {
        this.getClassInfo();
      },
    },
  },
  destroyed() {
    this.DESTROY_PROGRESS_COURSE();
  },
};
</script>

<style scoped>
@import "./style.css";
</style>
