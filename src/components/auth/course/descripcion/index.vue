<template>
<div style="min-height: 300px" class="py-2">
    <template>
        <v-card class="elevation-0">
            <v-tabs v-model="tab" background-color="#f2f5fa" color="#1a1a1a" :hide-slider="true" :left="true">
                <v-tab v-for="item in items" :key="item.tab" @click="optionSelected(item.tab)" :id="item.tab">
                    {{ $t('message.'+item.tab_lang) }}
                </v-tab>
                <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn style="background-color: #0078D7; color: #FFF;" elevation="10" large rounded v-bind="attrs" v-on="on">
                            {{ $t('message.remaining_days_of_courses') }}: {{course.daysUntil}}
                        </v-btn>
                    </template>
                    <span>{{ $t('message.start_date') }}: {{course.fechaInicio}}<br>{{ $t('message.end_date') }}: {{course.fechaVencimiento}}</span>
                </v-tooltip>
            </v-tabs>

            <v-tabs-items v-model="tab" style="background-color: #f2f5fa">
                <v-tab-item v-for="item in items" :key="item.tab">
                    <!-- Resumen -->
                    <v-card flat v-if="item.tab === 'Resumen'" color="#0078D7" rounded="xl">
                        <v-card-text class="h6 text-justify text-white">
                            {{ description }}
                        </v-card-text>
                    </v-card>
                    <!-- Recursos -->
                    <v-card flat v-if="item.tab === 'Recursos'" color="#0078D7" outlined rounded="xl" tag="div">
                        <template v-if="!isResources || resources.length == 0">
                            <v-card-text class="h6 text-center text-white">
                                {{ $t('message.no_resources_available') }}
                            </v-card-text>
                        </template>
                        <div v-else>
                            <v-card-text class="h6">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item" v-for="(resource, index) in resources" :key="index" style="background-color: #131b1e">
                                        <div class="d-flex justify-content-between text-white">
                                            <button @click="download(resource)">
                                                {{ index + 1 }})
                                                <i class="fas fa-download"></i>
                                                {{resource.filename}}
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </v-card-text>
                        </div>
                    </v-card>
                    <!-- Examen -->
                    <v-card flat v-if="item.tab === 'Examen'" color="#0078D7" outlined rounded="xl" tag="div">
                        <div class="text-white p-3">
                            <button @click="examList()" class="test">{{ $t('message.exam_results') }} </button>
                        </div>
                        <div v-if="showDataEx">
                            <template v-if="
                    dataEx === 'No existe el examen'">
                                <v-card-text class="h6 text-center text-white">
                                    {{ $t('message.no_exman_available') }}
                                </v-card-text>
                            </template>
                            <template v-else-if="dataEx === 'El usuario ya aprobó el examen'">
                                <div class="mx-4 mt-4 h6 text-center text-white">
                                    {{ $t('message.passed_this_exam') }}
                                </div>
                            </template>
                            <div class="mx-4 mt-4" v-else>
                                <!-- <div v-for="[data, index] in dataEx" :key="index"> -->
                                <p class="text-justify">
                                    <button @click="Testing(dataEx)" class="test">
                                        {{ $t('message.exam_of_this_class') }}
                                    </button>
                                </p>
                                <!-- </div> -->
                            </div>
                        </div>
                    </v-card>
                    <v-card flat v-if="item.tab === 'Enlaces externos'" color="#0078D7" outlined rounded="xl" tag="div">
                        <v-card-text class="h6 text-white text-center">
                            <div v-if="external_links">
                                <div v-html="external_links">
                                </div>
                            </div>
                            <div v-else>
                                {{ $t('message.there_are_no_external_links') }}
                            </div>
                        </v-card-text>
                    </v-card>

                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </template>

    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-card-title class="text-h5 lighten-2 alertTitle text-center text-white">
                Aviso
            </v-card-title>

            <v-card-text class="text-h6 text-center">
                <br>{{this.alertMessage}}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#ffc107" text @click="dialog = false">
                    {{ $t('message.accept') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" color="#ffc107">

        <p class="text-dark m-0 p-0">{{ $t('message.your_file_id_downloading') }}</p>

        <template v-slot:action="{ attrs }">
            <v-btn color="#000" text v-bind="attrs" @click="snackbar = false">
                x
            </v-btn>
        </template>
    </v-snackbar>

    <v-dialog v-model="showModalExams" width="600">
        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
                {{ $t('message.list_exam') }}
            </v-card-title>

            <v-card-text>
                <div class="table-responsive py-2">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Clase</th>
                                <th>{{ $t('message.status_action') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="exams_data.counter_class != 0">
                                <tr v-for="exam in exams_class" :key="exam.id" class="">
                                    <template v-if="exam.exist">
                                        <td>{{exam.name}}</td>
                                        <td v-if="exam.approved" class="text-success">
                                            {{ $t('message.passed_exam') }}
                                        </td>
                                        <td v-else>
                                            <button class="btn btn-primary" @click="Testing(exam.exam_id)">{{ $t('message.take_exam') }}</button>
                                        </td>
                                    </template>
                                </tr>
                            </template>
                            <template v-else>
                                <td colspan="2">{{ $t('message.no_exman_available') }}</td>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="table-responsive py-2">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Módulo</th>
                                <th>{{ $t('message.status_action') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="exams_data.counter_module != 0">
                                <tr v-for="exam in exams_module" :key="exam.id" class="">
                                    <template v-if="exam.exist">
                                        <td>{{exam.name}}</td>
                                        <td v-if="exam.approved" class="text-success">
                                            {{ $t('message.passed_exam') }}
                                        </td>
                                        <td v-else>
                                            <button class="btn btn-primary" @click="Testing(exam.exam_id)">{{ $t('message.take_exam') }}</button>
                                        </td>
                                    </template>
                                </tr>
                            </template>
                            <template v-else>
                                <td colspan="2">{{ $t('message.no_exman_available') }}</td>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="table-responsive py-2">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>{{ $t('message.course') }}</th>
                                <th>{{ $t('message.status_action') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="exams_data.counter_course != 0">
                                <tr class="">
                                    <template v-if="exam_course.exist">
                                        <td>{{exam_course.nombre}}</td>
                                        <td v-if="exam_course.approved" class="text-success">
                                            {{ $t('message.passed_exam') }}
                                        </td>
                                        <td v-else>
                                            <button class="btn btn-primary" @click="Testing(exam_course.exam_id)">{{ $t('message.take_exam') }}</button>
                                        </td>
                                    </template>
                                </tr>
                            </template>
                            <template v-else>
                                <td colspan="2">{{ $t('message.no_exman_available') }}</td>
                            </template>
                        </tbody>
                    </table>
                </div>

            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="showModalExams = false">
                    {{ $t('message.close') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</div>
</template>

<script>
// import { mapState, mapActions } from "vuex";

export default {
    name: "Descripcion",
    props: {
        course: Object,
    },
    data() {
        return {
            dialog: false,
            componentKey: 0,
            description: "",
            alertMessage: "",
            isActive: 1,
            snackbar: false,
            open: false,
            picture: null,
            carga: null,
            showDataEx: false,
            isResources: false,
            resources: [],
            model: "tab-2",
            dataEx: [],
            text: "Lorem ipsum dolor sit amet",
            tab: null,
            items: [
                {
                    tab: "Recursos",
                    tab_lang: "resources"
                },
                {
                    tab: "Examen",
                    tab_lang: "exam"
                },
                {
                    tab: "Enlaces externos",
                    tab_lang: "external_link"
                },
            ],
            stateDinamic: true,
            idDinamicGame: [],
            isLoadingDinamic: false,
            external_links: "",
            showModalExams: false,
            exam_course: [],
            exams_class: [],
            exams_module: [],
            exams_data: [],
        };
    },
    computed: {
        // ...mapState("course", ["lesson", "resources", "isResources"]),
        // queryDinamic() {
        //   return this.$route.query.class;
        // },
    },
    methods: {
        // ...mapActions("course", {
        //   getResources: "getResources",
        //   /* getTest: "getTest", */
        //   getLesson: "getLesson",
        //   getActiveDinamicClass: "getActiveDinamicClass",
        // }),
        async examList() {
            this.showModalExams = true
            await this.$axios.get(`/course/exam/list?slug=${this.$route.params.productSlug}`).then((response) => {
                this.exam_course = response.data.exam_course
                this.exams_class = response.data.exams_class
                this.exams_module = response.data.exams_module
                this.exams_data = response.data
            })
        },
        async getResources() {
            var slug = this.$route.params.slug;
            await this.$axios.get(`/course/class/resources/${slug}/list`).then((response) => {
                this.resources = response.data
                this.isResources = true
            })
        },
        async getDescription() {
            await this.$axios
                .get(`/public/course/${this.$route.params.productSlug}/description`)
                .then((response) => {
                    this.description = response.data.descripcion;
                });
        },
        async optionSelected(item) {
            if (item == "Examen") {
                if (this.$route.params.slug == "No+hay+clases") {
                    this.dataEx = "No existe el examen"
                    this.showDataEx = true;
                } else {
                    const form = {
                        'exam_type': 'class',
                        'slug_product': this.$route.params.productSlug,
                        'slug_class': this.$route.params.slug
                    }
                    this.$axios.post(`/course/exam/active`, form).then((response) => {
                        this.dataEx = response.data == "" ? "No existe el examen" : response.data
                        this.showDataEx = true;
                    })
                }
            } else if (item == "Enlaces externos") {
                let slug_product = this.$route.params.productSlug
                let slug_class = this.$route.params.slug
                await this.$axios.get(`/course/class/get-links/${slug_product}/${slug_class}`).then((response) => {
                    if (response.data.external_links != "<p><br></p>") {
                        this.external_links = response.data.external_links;
                    }
                })
            } else if (item == "Recursos") {
                this.getResources();
            }
        },

        changeTab(el) {
            this.isActive = el;
        },
        /* ---------------------------------- */
        download(resource) {
            this.snackbar = true;
            this.carga = true;
            this.$axios
                .get(`/course/class/resources/${resource.id}/download`, {
                    responseType: "blob",
                })
                .then((response) => {
                    const url = window.URL
                        .createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', resource.filename);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link)
                });
        },

        Testing(dataEx) {
            // if (isNaN(this.dataEx.data) == false) {
            if (this.$route.params.mode == "preview") {
                this.$router.push({
                    name: "previewTest",
                    params: {
                        mode: "preview",
                        id: dataEx,
                        slug: this.$route.params.slug
                    },
                });
            } else {
                this.$router.push({
                    name: "test",
                    params: {
                        id: dataEx,
                        slug: this.$route.params.slug
                    },
                });
            }
            // } else {
            //   //alert(this.dataEx.data);
            //   this.alertMessage = this.dataEx.data;
            //   this.dialog = true;
            // }
        },

        // Extraer solo nombre del recurso y no toda la ruta
        // getNameResource(filepath) {
        //   let filenameWithExtension = filepath.replace(/^.*[\\/]/, "");
        //   return filenameWithExtension;
        // },
        // async getActiveDinamics() {
        //   try {
        //     this.isLoadingDinamic = false;
        //     const dataSend = {
        //       idClass: this.$route.query.class,
        //       game_for: "class",
        //     };

        //     let { data } = await this.getActiveDinamicClass(dataSend);
        //     if (data.length === 0) {
        //       this.stateDinamic = false;
        //       this.isLoadingDinamic = true;
        //       this.idDinamicGame = [];
        //     } else {
        //       this.idDinamicGame = data;
        //       this.isLoadingDinamic = true;
        //       this.stateDinamic = true;
        //     }
        //   } catch (error) {
        //     throw new Error(error);
        //   }
        // },

        // goToDinamics(id) {
        //   this.$router.push({
        //     name: "dinamic",
        //     params: { id },
        //     query: { c: this.$route.query.course },
        //   });
        // },
    },
    watch: {
        async queryDinamic() {
            // this.getActiveDinamics();
        },

        $route: function () {
            this.getResources()
            let item = "Recursos";
            this.optionSelected(item)
            document.getElementById(item).click();
        },
    },
    created() {
        // this.getResources(this.$route.query.class);
    },
    mounted() {
        this.isLoadingDinamic = true;
        // this.getActiveDinamics();
        this.getDescription();
    },
};
</script>

<style scoped>
.v-tab:not(.v-tab--active) {
    color: #1a1a1a !important;
    background: #ffffff;
    margin-bottom: 10px;
    border-radius: 50px;
    margin-right: 7px;
    margin-left: 7px;
}

.v-tab {
    color: #FFF !important;
    background: #0078D7;
    margin-bottom: 10px;
    border-radius: 50px;
    margin-right: 7px;
    margin-left: 7px;
}

.nav-item {
    margin-left: 25px !important;
    margin-bottom: 0px !important;
}

.nav-link {
    border: none !important;
    border-top-left-radius: 15px !important;
    border-top-right-radius: 15px !important;
    width: 161px;
    height: 37px;
    border-bottom: solid #e5e5e5 0.2px !important;
}

.nav-tabs li {
    float: left;
    position: relative;
    cursor: pointer;
}

.nav-tabs a {
    float: left;
    text-decoration: none;
    color: white;
    background: #c4c4c4;
    font-size: 18px;
}

.nav-tabs .active {
    z-index: 3;
    pointer-events: none;
}

.nav-tabs .active a {
    background: white;
    color: black;
}

.nav-tabs .nav-item:before,
.nav-tabs .nav-item:after,
.nav-tabs .nav-link:before,
.nav-tabs .nav-link:after {
    position: absolute;
    bottom: 0;
}

.nav-tabs .nav-item:after,
.nav-tabs .nav-item a:after,
.nav-tabs .nav-item:before,
.nav-tabs .nav-item a:before,
.nav-tabs .active:after,
.nav-tabs .active:before,
.nav-tabs .active a:after,
.nav-tabs .active a:before {
    content: "";
}

.nav-tabs .active:before,
.nav-tabs .active:after {
    background: white;
    z-index: 1;
}

.nav-tabs li:before,
.nav-tabs li:after {
    background: #c4c4c4;
    width: 10px;
    height: 10px;
}

.nav-tabs li:before {
    left: -10px;
}

.nav-tabs li:after {
    right: -10px;
}

/* Circles */
.nav-tabs li a:after,
.nav-tabs li a:before {
    width: 20px;
    height: 20px;
    /* Circles are circular */
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    background: var(--bg-content);

    /* Circles over squares */
    z-index: 2;
}

.nav-tabs .active a:after,
.nav-tabs .active a:before {
    background: var(--bg-content);
    z-index: 3;
}

/* First and last tabs have different
   outside color needs */
.nav-tabs li a:before {
    left: -20px;
}

.nav-tabs li a:after {
    right: -20px;
}

.test {
    color: rgb(255, 255, 255);
    background-color: #393b3d;
    padding: 5px 15px;
    margin: 10px 20px;
    border-radius: 20px;
    text-decoration: none;
}

/* Modal container*/
.modal {
    visibility: hidden;
    opacity: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    -webkit-transition: all 0.7s;
    transition: all 0.7s;
}

/* Modal container gets target and it is shown and background modal too*/
.modal:target,
.modal:target .modal-bg {
    display: block;
    z-index: 100;
    opacity: 1;
    visibility: visible;
}

/* Background modal*/
.modal-bg:active,
.modal-bg:hover,
.modal-bg:visited,
.modal-bg:link {
    text-decoration: none;
    visibility: hidden;
    opacity: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    -webkit-transition: all 0.7s;
    transition: all 0.7s;
}

/* Background modal overlaps to container*/
.modal:target .modal-bg {
    z-index: 200;
}

/* Modal content or body*/
.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: white;
    width: 80vw;
    height: 80vh;
    border-radius: 2rem;
    text-align: center;
    z-index: 300;
    padding-bottom: 10px;
    overflow: hidden;
}

/* Modal is closed at lose target*/
.modal-exit:link,
.modal-exit:active,
.modal-exit:visited,
.modal-exit:hover {
    position: absolute;
    top: 2%;
    right: 2%;
    font-size: 1.5rem;
    text-decoration: none;
    color: #000000;
    padding: 0 15px 0 15px;
}

.pdf {
    width: 50vw;
    height: 65%;
}

.container1 {
    display: flex;
    justify-content: center;
    align-items: center;
}

.cargando {
    position: absolute;
    z-index: 10000;
    top: 0;
    left: 0;
    color: white;
    background: #131b1e;
    width: 100vw;
    height: 100vh;
    border-radius: 15px;
}

.spinner-border {
    margin: 20% 0 0 -20%;
}

.alertTitle {
    background-color: #131b1e;
}

.alertText {
    color: #0078D7;
}
</style>
