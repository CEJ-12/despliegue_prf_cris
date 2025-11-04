<script>
export default {
    props: {
        title: String,
        link: String,
        image: String
    },    
    data() {
        return {
            cardType: '',       
        }
    }
}
</script>
<template>
    <section class="inner-banner py-5">
        <div class="w3l-breadcrumb py-lg-5">
            <div class="container pt-4 pb-sm-4">
                <h4 class="inner-text-title pt-5">{{ title }}</h4>
                <ul class="breadcrumbs-custom-path">
                    <li><a href="index.html">Home</a></li>
                    <li class="active"><i class="fas fa-angle-right"></i>{{ title }}</li>
                </ul>
            </div>
        </div>
    </section>
</template> 
 
<style>

.inner-banner {
  /*background: url(../images/banner3.jpg) no-repeat center;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  -ms-background-size: cover;
  position: relative;
  z-index: 0;*/
}

</style>
 