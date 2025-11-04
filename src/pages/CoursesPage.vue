<script>
import Banner from '../components/common/Banner.vue';
import ProductSlider from "@/components/public/ProductsSlider/index.vue";
export default {
   
    data() {
        return {
            all_products: [],
            mode: "public",
        };
    },
    methods: {
        async getProducts() {
        const { data } = await this.$axios.get(`/public/course/list`);
        this.all_products = data;
        },
    },
    mounted() {
        this.getProducts();
    },

    components: {
        Banner,
        ProductSlider
    }
   
}
</script>

<template>
    <div>
        <Banner
            title=" Cursos"
            link 
        >
        </Banner>
        
        <ProductSlider
            :products="all_products"
            class="m-5"
            id="graduates"
        />
        
    </div>
    
</template>