<template>
    <div>
        <section id="consultoria_portada" class="p-consultoria">
            <h2 class="text-white font">Consultoría</h2>
        </section>
        <section id="consultoria_portada2">
            <br>
            <h2 class="font" id="isos">ISOS</h2>
        </section>
        <section id="descripcionConsultoria">
        <div class="redirecciones-iso text-center text-white">
                <br><br>
                <h4 class="font">En el Instituto Peruano SSOMA desarrollamos e implementamos herramientas y sistemas de
                    gestión para
                    empresas que desean mejorar su competitividad. </h4>
                <h5 class="font"> Dentro de las normas internacionales y herramientas que implementamos están las siguientes: <br>
                </h5>
        </div>        
        </section>
        <section id="consultoria_informacion">
            <div class="container">
                <div class="redirecciones-iso text-center">
                    <consultoria></consultoria>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Consultoria from '../Iso/consultoria.vue';
export default {
  data() {
    return {};
  },

  methods: {},
  components: {
    'consultoria': Consultoria,
  },
};
</script>

<style>

#isos {
    font-weight:600;
    color:#343a40;
}

#consultoria_portada h2 {
    margin-bottom: 40px;
}

#consultoria_portada h2 {
    font-size: 50px;
    margin-top: 30px;
}

#consultoria_portada {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-size: cover;
    min-width: 500px;
    height: 500px;
    width: 100%;
}

#consultoria_portada2 {
    background-color: #ffc700;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-width: 500px;
    height: 100px;
    width: 100%;
}

#consultoria_informacion {
    padding: 30px 23%;
    text-align: justify;
}

#consultoria_informacion .container {
    line-height: 40px;
}

#descripcionConsultoria{
    
    background-color: #343a40;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-width: 500px;
    height: 200px;
    width: 100%;

}

.p-consultoria {
    background-image: url(../../../assets/portada-consultoria.webp);
}

.font {
    font-family: Roboto !important;
}

.text-justify {
    text-align: justify !important;
}

@media (min-width: 320px) and (max-width: 767px) {

    .p-consultoria,
    .p-iso9001,
    .p-iso14001,
    .p-iso37001,
    .p-iso45001 {
        height: 300px !important;
        width: 500px;
    }

    #consultoria_informacion {
        padding: 15px 5%;
    }
}
</style>