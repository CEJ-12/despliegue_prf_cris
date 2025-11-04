<template>
    <v-card :color="color" class="text-center" style="border-radius: 15px" :width="width">
          <v-img style="position: absolute; top: -45px; left:0; right: 0; text-align: center; margin-left: auto; margin-right: auto;"   width="80px" :src="img"></v-img>
          <v-card-text class="text-h5 white--text pt-10 font-weight-bold pb-1" v-if="title" >
            {{title}}
          </v-card-text>
          <v-card-subtitle class="py-0 my-0 white--text text-subtitle-1 font-weight-bold" >
            {{subtitle}}
          </v-card-subtitle>
           <v-card-subtitle class="py-0 my-0 white--text text-subtitle-2 font-weight-bold" >
            Puntuación : {{score}}
          </v-card-subtitle>
          <v-card-subtitle  class="py-0 my-0 white--text text-subtitle-2 font-weight-bold" >
            Preguntas correctas : {{correctas}}
          </v-card-subtitle>
           <v-card-subtitle  class="py-0 my-0 white--text text-subtitle-2 font-weight-bold" >
            Preguntas incorrectas : {{incorrectas}}
          </v-card-subtitle>
          <v-card-actions>
              <v-btn color="black" @click="comeBack" class="white--text mt-1 rounded-xl"  block >Regresar a la clase</v-btn>
          </v-card-actions>
          <v-card-actions>
              <v-btn color="black" @click="redirectExamList()" class="white--text mt-1 rounded-xl"  block >Regresar a la {{ $t('message.list_exam') }}</v-btn>
          </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'card-alert',
    props:{
        title: {
            type: String,
            default: 'Lorem Ipsom',
        },
        subtitle: {
            type: String,
            default: '',
        },
        score: {
            type: String,
            default: 'Lorem Ipsom',
        },
        correctas: {
            type: String,
            default: 'Lorem Ipsom',
        },
        incorrectas: {
            type: String,
            default: 'Lorem Ipsom',
        },
        width: {
            type: String,
            default: '350px',
        },
        img: {
            type: String,
            default: '',
        },
        color: {
            type: String,
            default: 'red'
        },
        rank: {
            type: String,
            default: ''
        },
        rate: {
            type: String,
            default: ''
        }
    },
    methods:{
        async comeBack(){
            var slug = this.$route.params.slug;
            var mode = this.$route.params.mode;
            var data = mode == "preview" ? mode : slug;
            var route = this.$route.params.mode == "preview" ? "preview" : "curso";
            await this.$axios.get(`/course/exam/route-back?data=${data}&slug=${slug}`).then((response) => {
                if(mode == "preview"){
                    this.$router.push({
                        name: route,
                        params: {
                            mode: "preview",
                            slug: response.data.slug_class,
                            productSlug: response.data.product_slug,
                        },
                    });
                }else{
                    this.$router.push({
                        name: route,
                        params: {
                            type: response.data.tipo_producto_id,
                            slug: response.data.slug_class,
                            productSlug: response.data.product_slug,
                        },
                    });
                }
            })
            // this.$router.push({name: 'myCourses'})
        },
        redirectExamList(){
            this.$router.push({
                name: 'exams'
            })
        }
    }
}
</script>