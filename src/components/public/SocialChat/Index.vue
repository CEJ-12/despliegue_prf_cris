<template>
<div class="layout">
    <SocialChat>
        <div slot="header">
            <p v-if="this.step == 0">Hola, ¿Desea que nos contactemos con usted para obtener más información?</p>
            <p v-if="this.step == 1">¿Cuál es su nombre?</p>
            <p v-if="this.step == 2">Introduzca su correo</p>
            <p v-if="this.step == 3">Introduzca su número de teléfono</p>
            <p v-if="this.step == 4">Gracias,¡estaremos en contacto con usted!</p>
        </div>
        <div slot="body">

            <v-btn v-if="this.step == 0" v-on:click="step = 1" color="primary">
                <div class="text-capitalize">Sí,</div> <div class="text-lowercase pl-1">deseo más información</div> 
            </v-btn>

            <v-text-field outlined v-model="form.username" v-if="this.step == 1" label="Nombre"></v-text-field>
            <v-btn v-if="this.step == 1" v-on:click="step = 2" color="primary" class="text-capitalize">
                Siguiente
            </v-btn>

            <v-text-field outlined v-model="form.email" v-if="this.step == 2" label="Correo"></v-text-field>
            <v-btn v-if="this.step == 2" v-on:click="step = 3" color="primary" class="text-capitalize">
                Siguiente
            </v-btn>

            <v-text-field outlined v-model="form.numero" v-if="this.step == 3" label="Número"></v-text-field>
            <v-btn v-if="this.step == 3" v-on:click="enviar()" color="primary" class="text-capitalize">
                Enviar
            </v-btn>

            <v-btn v-if="this.step == 4" color="primary" class="text-capitalize">
                ¡Completado!
            </v-btn>

            <v-btn v-if="this.step > 0 && this.step < 4" v-on:click="step = step - 1" color="primary" class="ml-2 text-capitalize">
                Anterior
            </v-btn>

        </div>
        <template v-slot:button="{ open }">
            <span v-show="!open">{{ $t('message.footer_writer') }}</span>
            <span v-show="open">Cerrar</span>
        </template>
        <small slot="footer">Horario de atención: Lunes a sábados de 8 am a 6 pm</small>
    </SocialChat>
</div>
</template>

<script>
import {
    SocialChat
} from "vue-social-chat";

export default {
    components: {
        SocialChat,
    },
    data() {
        return {
            step: 0,
            form: {},
            attendants: [{
                    app: "whatsapp",
                    label: "Coordinadora académica",
                    name: "Lic. Gladys Luján",
                    number: "51901874235" +
                        "&text=Hola Ipssoma he visto tu página y tengo interés.",
                    avatar: {
                        src: "https://cdn-icons-png.flaticon.com/512/1177/1177568.png",
                        alt: "Lic. Gladys Luján",
                    },
                },
                {
                    app: "whatsapp",
                    label: "Asesor educativo",
                    name: "Lic. Nancy Férnandez",
                    number: "51928866727" +
                        "&text=Hola Ipssoma he visto tu página y tengo interés.",
                    avatar: {
                        src: "https://cdn-icons-png.flaticon.com/512/1177/1177568.png",
                        alt: "Lic. Nancy Férnandez",
                    },
                },
                {
                    app: "messenger",
                    label: "IPSSOMA",
                    name: "IPSSOMA",
                    id: "ipssoma",
                    avatar: {
                        src: "https://cdn-icons-png.flaticon.com/512/1177/1177568.png",
                        alt: "IPSSOMA",
                    },
                },
            ],
        };
    },

    methods: {
        async enviar() {
            if(this.validar()){
                try {
                const {
                    status,
                    data: response
                } = await this.$axios.post(
                    "/public/contactarusuario",
                    this.form
                );
                if (status == 200) {
                    alert(response);
                } else {
                    alert("Ha ocurrido un error!");
                }
            } catch (error) {
                console.log(error);
            }
            }
        },

        async validar() {
            if (
                !this.form.username ||
                this.form.username.trim() === "" ||
                this.form.username.length === 0
            ) {
                alert("Nombre esta vacío!");
                return false;
            }

            if (
                !this.form.email ||
                this.form.email.trim() === "" ||
                this.form.email.length === 0
            ) {
                alert("Correo esta vacío!");
                return false;
            }

            if (
                !this.form.numero ||
                this.form.numero.trim() === "" ||
                this.form.numero.length === 0
            ) {
                alert("Número esta vacío!");
                return false;
            }

            return true;
        },
    },
};
</script>

<style lang="scss">
.vsc-popup-button--default {
    background-color: #ffc107 !important;
    color: #000 !important;
    font-weight: 700;
}

.vsc-popup-header {
    background-color: #ffc107 !important;
    color: #000 !important;
    font-weight: 700;
}
</style>
