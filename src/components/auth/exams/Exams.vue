<template>
    <div class="row px-3">
        <div class="col-12" v-if="products.length == 0">
            <div class="text-center py-5"><strong>{{ $t('message.not_purchased_a_course') }}</strong></div>
        </div>
        <template v-else>
            <div class="col-12 col-sm-4 order-2 order-md-1">
                <div>
                    <div v-for="product in products" :key="product.id">
                        <div class="card py-1" @click="examList(product)">
                            <div class="row">
                                <div class="col-4 mx-auto text-center d-flex align-items-center">
                                    <img class="img-thumbnail" :src=product.portada_url>
                                </div>
                                <div class="col-8 px-1">
                                    <div class="card-body pl-0">
                                        <p class="card-title"> <strong>{{ product.nombre }}</strong> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-8 order-1 order-md-2">
                <div v-if="waitSelection">
                    <div class="text-center py-10">
                        <strong>{{ $t('message.select_a_course') }}</strong>
                    </div>
                </div>
                <div v-else>
                    <div class="pb-4">
                        <strong class="pb-4">{{productSelected.nombre}}</strong>
                        <p v-if="exam_progress != 'empty'"><strong>{{ $t('message.current_progress') }}: </strong>{{exam_progress}}%</p>
                        <p v-else><strong>{{ $t('message.current_progress') }}: </strong>0%</p>
                        <v-progress-linear
                        v-model="exam_progress"
                        color="amber"
                        ></v-progress-linear>
                    </div>
    
                    <div>
                        <p><strong>{{ $t('message.list_exam') }}</strong></p>
                        <div v-if="exam_progress == 'empty'">
                            {{ $t('message.there_are_this_course') }} 
                        </div>
                        <div v-else>
                            <div class="py-2">
                                <table class="table">
                                    <thead>
                                        <tr>
                                        <th>{{ $t('message.exam') }}</th>
                                        <th>{{ $t('message.status_action') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="exam in exams_class" :key="exam.id" class="">
                                            <template v-if="exam.exist">
                                            <td>{{exam.name}}</td>
                                            <td v-if="exam.approved" class="text-success">
                                                {{ $t('message.passed_exam') }}
                                            </td>
                                            <td v-else>
                                                <button class="btn btn-primary" @click="Testing(exam)">{{ $t('message.take_exam') }}</button>
                                            </td>
                                            </template>
                                        </tr>
                                        <tr v-for="exam in exams_module" :key="exam.id" class="">
                                            <template v-if="exam.exist">
                                            <td>{{exam.name}}</td>
                                            <td v-if="exam.approved" class="text-success">
                                                {{ $t('message.passed_exam') }}
                                            </td>
                                            <td v-else>
                                                <button class="btn btn-primary" @click="Testing(exam)">{{ $t('message.take_exam') }}</button>
                                            </td>
                                            </template>
                                        </tr>
                                        <tr class="">
                                            <template v-if="exam_course.exist">
                                            <td>{{exam_course.nombre}}</td>
                                            <td v-if="exam_course.approved" class="text-success">
                                                {{ $t('message.passed_exam') }}
                                            </td>
                                            <td v-else>
                                                <button class="btn btn-primary" @click="Testing(exam_course)">{{ $t('message.take_exam') }}</button>
                                            </td>
                                            </template>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    data() {
        return {
            products: [],
            waitSelection: true,
            exam_course: [],
            exams_class: [],
            exams_module: [],
            exams_data: [],
            exam_progress: 0,
            productSelected: [],
        }
    },
    methods: {
        async getcourses() {
            try {
                let user_id = localStorage.getItem("id_user");
                const { data } = await this.$axios.get(
                `/user/${user_id}/purchased-products`
                );
                this.products = data;
                this.loading = false;
            } catch (error) {
                // reload page
                window.location.reload();
            }
        },
        async examList(product){
            this.productSelected = product;
            await this.$axios.get(`/course/exam/list?slug=${product.slug_product}`).then((response) => {
                this.exam_course = response.data.exam_course
                this.exams_class = response.data.exams_class
                this.exams_module = response.data.exams_module
                this.exams_data = response.data
                this.exam_progress = response.data.exam_progress
                this.waitSelection = false
            })
        },
        Testing(dataEx) {
          this.$router.push({
            name: "test",
            params: { 
              id: dataEx.exam_id,
              slug: dataEx.slug
            },
          });
        },
    },
    mounted(){
        this.getcourses();
    }
}
</script>