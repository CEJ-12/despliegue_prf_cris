<template>
<div :title="course.nombre" class="course-card my-5" v-if="course" @click="goToCourse()">
    <div style="border-top-left-radius: 15px; border-top-right-radius: 15px">
        <img :src="course.portada_url" class="card-img-top border-radius-image" />
    </div>

    <div class="content">

        <div class="col">
            <div class="row px-3 py-3" style="
              background: #131b1e;
              border-bottom-left-radius: 15px;
              border-bottom-right-radius: 15px;
            ">

                <p v-if="this.course.is_blocked == 1 && this.course.fechaVencimiento == 0" class="text-danger p-0 m-0">Acceso bloqueado</p>
                <p v-if="this.course.fechaVencimiento == 1" class="text-danger p-0 m-0">El tiempo del curso terminó</p>
                <p v-if="this.course.fechaVencimiento == 1" class="text-danger p-0 m-0">Solicite tiempo extra al administrador si es necesario</p>

                <b class="text-left" style="color: white">
                    {{ course.nombre }}
                </b>
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
            slug_class: '',
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
    methods: {

        async goToCourse() {
            if (this.course.is_blocked == 1) {
                console.log("curso bloqueado")
            } else {
                await this.$axios
                    .get(`/user/${this.course_id}/course-slug`)
                    .then((response) => {
                        this.slug_class = response.data.slug_class;
                    });

                localStorage.setItem("mode", this.mode);
                const params = {
                    type: this.getProductType(this.course.tipo_producto_id),
                    slug: this.slug_class,
                    productSlug: this.course.slug_product,
                    // mode: this.mode,
                    // showPrivateNavbar: this.showPrivateNavbar,
                };

                this.$router.push({
                    name: "curso",
                    params: params,
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
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    transition: 0.5s;
    max-width: 265px;
    min-width: 265px;
    background-color: #17201f;
}

.course-card:hover {
    transform: scale(1.1);
    transition: 0.8s;
    cursor: pointer;
}

.content {
    background: #ffffff;
    transition: 1s;
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
