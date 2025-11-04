<template>
<div class="bg-light">
    <v-overlay :value="overlay">
        <v-progress-circular indeterminate color="amber"></v-progress-circular>
    </v-overlay>
    <!-- <div v-if="paidFor">
      <div style="padding: 150px 0">
        <v-card class="elevation-0" color="transparent">
          <v-row justify="center" class="text-center">
            <v-icon color="green" size="200"> mdi-check-circle-outline </v-icon>
            <v-card-text class="h1 text-success"> Gracias! </v-card-text>
            <v-card-text class="h5">
              Tu compra ha sido realizada con exito.
            </v-card-text>
            <v-btn
              color="#000000"
              class="text-white"
              @click="$router.push({ name: 'suscription-user' })"
            >
              Ir a mi aprendizaje
            </v-btn>
          </v-row>
        </v-card>
      </div>
    </div> -->
    <div class="div-pagar">
        <div class="row">
            <div class="col-md-8">
                <div class="col-md-12 px-0">
                    <p class="subt text-start">
                        <strong>Pedido</strong>
                    </p>
                    <div class="d-flex align-items-center">
                        <v-avatar rounded="0" class="mr-5">
                            <!-- <v-img :src="mCourse.portada_url"> </v-img> -->
                        </v-avatar>
                        <p class="text-start flex-grow-1 text-capitalize">
                            <strong>{{ mCourse.nombre }}</strong>
                        </p>
                    </div>
                </div>
                <div class="">
                    <div class="d-flex">
                        <p class="subt text-start flex-grow-1 mt-5">
                            <strong>Método de pago</strong>
                        </p>
                    </div>
                    <div>
                        <div>
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <div class="form-check py-2">
                                        <input class="form-check-input" type="radio" name="paymentMethod" id="flexCheckChecked" @click="showPaymentMethod('transfer')">
                                        <label class="form-check-label" for="flexCheckChecked">
                                            Trasnferencia bancaria
                                        </label>
                                        <img src="@/assets/transf.webp" width="25" alt="" class="mx-2" for="flexCheckChecked" />
                                    </div>
                                    <div class="form-check py-2">
                                        <input class="form-check-input" type="radio" name="paymentMethod" id="flexCheckChecked2" @click="showPaymentMethod('culqi')">
                                        <label class="form-check-label" for="flexCheckChecked2">
                                            Tarjeta
                                        </label>
                                        <img src="https://docs.culqi.com/images/icons/brands/visa.svg" width="25" alt="" class="mx-2" />
                                        <img src="https://docs.culqi.com/images/icons/brands/mastercard.png" width="25" alt="" class="mx-2" />
                                        <img src="https://docs.culqi.com/images/icons/brands/amex.svg" width="25" alt="" class="mx-2" />
                                        <img src="https://docs.culqi.com/images/icons/brands/diners.svg" width="25" alt="" class="mx-2" />
                                    </div>

                                    <div class="form-check py-2">
                                        <input class="form-check-input" type="radio" name="paymentMethod" id="flexCheckChecked" @click="showPaymentMethod('whatsapp')">
                                        <label class="form-check-label" for="flexCheckChecked">
                                            Contactar con un vendedor
                                        </label>
                                        <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png?w=740&t=st=1667768444~exp=1667769044~hmac=e7a72e033d5c4bbe2b8be94704c8fdcd604ce06d29564f0638a8ed4c88a7decb" width="25" alt="" class="mx-2" for="flexCheckChecked" />
                                    </div>
                                </div>
                                <!-- <div class="col-12 col-sm-6">
                    <div>Números de cuenta</div>
                    <div class="text-center"><button class="btn btn-primary" @click="showBanks = true">Ver</button></div>
                  </div> -->
                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    <p class="subt text-start flex-grow-1 mt-5">
                        <strong>Números de cuenta</strong>
                    </p>
                    <div>
                        <div>
                            Haga click en el logo correspondiente para mostrar los números de cuenta
                        </div>
                        <div class="py-2">
                            <img :src="require('@/assets/scotia.webp')" alt="" class="img-thumbnail rounded mx-1" @click="showAccountInfo('scotia')">
                            <img :src="require('@/assets/nacion.webp')" alt="" class="img-thumbnail rounded mx-1" @click="showAccountInfo('nacion')">
                            <img :src="require('@/assets/bcp.webp')" alt="" class="img-thumbnail rounded mx-1" @click="showAccountInfo('bcp')">
                            <img :src="require('@/assets/bbva.webp')" alt="" class="img-thumbnail rounded mx-1" @click="showAccountInfo('bbva')">
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <p class="subt my-5 text-start"><strong>Resumen</strong></p>
                <div class="d-flex">
                    <p class="text-start flex-grow-1">Precio original:</p>
                    <p class="">S/. {{ mCourse.precio }}</p>
                </div>
                <hr />
                <div class="d-flex">
                    <p class="text-start flex-grow-1"><strong>Total:</strong></p>
                    <p class="">
                        <strong>S/. {{ mCourse.precio }}</strong>
                    </p>
                </div>

                <div v-if="culqiMethod">
                    <div class="text-center">
                        <div v-if="buttonDelay">
                            <v-progress-circular indeterminate color="amber"></v-progress-circular>
                        </div>
                        <button v-else class="btn btn-primary" @click="pay">Pagar</button>
                    </div>
                    <p class="text-start mt-1 subtitle-2 text-secondary">
                        Al completar la compra, aceptas <span>Condiciones de uso.</span>
                    </p>
                    <p class="text-start subtitle-2 text-secondary">
                        El Instituto Peruano SSOMA está obligado por ley a recaudar los impuestos sobre las
                        transacciones de las compras realizadas en determinadas
                        jurisdicciones fiscales.
                    </p>
                    <!-- <div ref="paypal"></div> -->
                </div>

                <div v-if="transferMethod">
                    <div>
                        <v-form ref="form" v-model="valid" lazy-validation class="px-5">
                            <v-select light outlined item-text="name" v-model="bankModel" item-value="value" ref="bank" :items="banks" :rules="[(v) => !!v || 'Seleccione una entidad bancaria']" label="Entidad bancaria" required></v-select>
                            <v-text-field light :rules="operationNumber" v-model="operationModel" label="Número de operación" required outlined></v-text-field>
                            <div class="text-danger" v-if="repeated">
                                El número de operación ya fue utilizado
                            </div>
                            <div class="text-center">
                                <v-btn :disabled="valid == false" color="#ffc107" class="mr-4 font-weight-bold" @click="validate">
                                    Enviar
                                </v-btn>
                            </div>
                        </v-form>
                    </div>
                </div>

                <div v-if="whatsappMethod">
                    <p class="text-start subtitle-2 text-secondary">
                        Selecciona a uno de nuestros asesores de IPSSOMA si continuar con la compra
                        por medio de whatsapp.
                    </p>
                    <div class="share-network-list py-5 px-4">
                        <div v-for="contact in contacts" :key="contact.id" class="row py-1 m-0">
                            <a :href="'https://api.whatsapp.com/send?phone='+contact.phone" class="bg-white text-dark">
                                <div class="col-12">
                                    <p class="col-12 p-0 m-0 text-dark">{{contact.name}}</p>
                                    <p class="col-12 p-0 m-0 text-dark"><i class="fab fah fa-lg fa-whatsapp mx-2" style="color: #25d366"></i>{{contact.phone}}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <!-- <div ref="paypal"></div> -->
                </div>

                <v-alert dismissible color="#ffc107" type="success" :value="this.alert"><p style="color:#000000;">Se ha copiado el Nro. de cuenta al portapapeles</p></v-alert>

            </div>
        </div>
    </div>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500" persistent>
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Número de operación enviado
                </v-card-title>
                <v-card-text class="pt-5 text-center">
                    En breve validaremos el número de operación y le habilitaremos el acceso al curso
                </v-card-text>

                <v-card-actions>
                    <v-btn color="primary" text @click="redirectMarketplace">
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <div class="text-center">
        <v-dialog v-model="modalConfirmPay" width="500" persistent>
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    ¡Pago exitoso!
                </v-card-title>
                <v-card-text class="pt-5 text-center">
                    El pago se realizó con éxito
                </v-card-text>

                <v-card-actions>
                    <v-btn color="primary" text @click="$router.push({name: 'myCourses'})">
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <div class="text-center">
        <v-dialog v-model="modalErrorPay" width="500">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Error
                </v-card-title>
                <v-card-text class="pt-5 text-center">
                    {{errorMessage}}
                </v-card-text>

                <v-card-actions>
                    <v-btn color="primary" text @click="modalErrorPay = false">
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <div class="text-center">
        <v-dialog v-model="bankAccountModal" width="360">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    {{bankSelected.name}}
                    <v-spacer></v-spacer>
                    <v-btn x-small fab color="#ffc107" @click="copyClipboard(bankSelected.account)">
                        <v-icon color="#484e53">
                            mdi-arrange-bring-forward
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text class="pt-5">

                    <p><strong>Nro. de cuenta: </strong>{{bankSelected.account}}

                    </p>

                    <p v-if="bankSelected.cci != ''"><strong>CCI: </strong>{{bankSelected.cci}}</p>
                    <p><strong>Razón social: </strong>{{bankSelected.company}}</p>
                    <p><strong>RUC: </strong>{{bankSelected.ruc}}</p>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="#ffc107" @click="bankAccountModal = false">
                        Aceptar
                    </v-btn>
                    <v-spacer></v-spacer>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

    <div class="text-center">
        <v-dialog v-model="bankAccountModal2" width="360">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Aviso
                </v-card-title>
                <v-card-text class="pt-5">

                    <p><strong>El número de cuenta fue copiado al portapapeles </strong></p>

                </v-card-text>

                <v-card-actions>
                    <v-btn color="#ffc107" @click="bankAccountModal2 = false">
                        Aceptar
                    </v-btn>    
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</div>
</template>

<script>
import CulqiCheckout from "vue-culqi-checkout";
export default {
    name: "Buy",

    data() {
        return {
            id_course: this.$route.params.ide,
            itemCouse: {},
            dialog: false,
            alert: false,
            loaded: false,
            paidFor: false,
            paymentSelected: "",
            overlay: false,
            transferMethod: false,
            culqiMethod: false,
            whatsappMethod: false,
            bankModel: "",
            operationModel: "",
            modalErrorPay: false,
            errorMessage: "El pago no pudo realizarse, por favor consulte el problema con la entidad bancaria",
            valid: true,
            repeated: false,
            contacts: [],
            mCourse: [],
            modalConfirmPay: false,
            bankAccountModal: false,
            bankAccountModal2: false,
            bankSelected: [],
            isOffer: false,
            buttonDelay: false,
            offerIds: [],
            operationNumber: [
                (v) => !!v || "Nro. de operación requerida",
                // (v) =>
                //   (v && v.length >= 8) ||
                //   "El documento debe tener al menos 8 caracteres",
            ],
            banks: [{
                    name: 'Scotiabank',
                    value: 'Scotiabank'
                },
                {
                    name: 'BCP',
                    value: 'BCP'
                },
                {
                    name: 'BBVA',
                    value: 'BBVA'
                },
                {
                    name: 'Bco. de la Nación',
                    value: 'Nación'
                }
            ],
            sharing: {
                url: "https://news.vuejs.org/issues/180",
                title: "Say hi to Vite! A brand new, extremely fast development setup for Vue.",
                description: 'This week, I’d like to introduce you to "Vite", which means "Fast". It’s a brand new development setup created by Evan You.',
                quote: "The hot reload is so fast it's near instant. - Evan You",
                hashtags: "vuejs,vite,javascript",
            },
            culqiConfig: {
                //publicKey: "pk_test_cdbcffcc00366c42",
                publicKey: "pk_live_95f8434020538bb8",
                title: "INSTITUTO PERUANO SSOMA",
                currency: "PEN",
                style: {
                    logo: "https://www.ipssoma.com/images/s2.png",
                    maincolor: "#ffbf00",
                    buttontext: "#ffffff",
                },
            },
            bankAccounts: {
                "scotia": {
                    "name": 'Scotiabank',
                    "account": '2070439787',
                    "cci": '00901720207043978752',
                    "ruc": '20608464094',
                    "company": 'Instituto Peruano SSOMA'
                },
                "bcp": {
                    "name": 'BCP',
                    "account": '193-9847932-0-58',
                    "cci": '00219300984793205816',
                    "ruc": '20608464094',
                    "company": 'Instituto Peruano SSOMA'
                },
                "bbva": {
                    "name": 'BBVA',
                    "account": '001107910100034907',
                    "cci": '',
                    "ruc": '20608464094',
                    "company": 'Instituto Peruano SSOMA'
                },
                "nacion": {
                    "name": 'Banco de la Nación',
                    "account": '04-050-454857',
                    "cci": '',
                    "ruc": '20603132611',
                    "company": 'Promolider Org Sac'
                }
            },
        };
    },

    methods: {
        copyClipboard(text) {
            navigator.clipboard.writeText(text);
            this.bankAccountModal=false;
            this.bankAccountModal2=true;
        },
        showAccountInfo(bank) {
            this.alert=false;
            this.bankSelected = this.bankAccounts[bank];
            this.bankAccountModal = true;
        },
        redirectMarketplace() {
            this.dialog = false;
            this.$router.push({
                name: "productos"
            });
        },
        async pay() {
            var token
            var email
            await this.$culqi.openCheckout().then((response) => {
                token = response.id
                email = response.email
            }).catch(error => {
                this.errorMessage = error
                this.modalErrorPay = true;
            });

            let url = "https://api.culqi.com/v2/charges";
            let config = {
                headers: {
                    "Content-type": "application/json",
                    //Authorization: "Bearer sk_test_IgMIsYRwitu2jb5m",
                    Authorization: "Bearer sk_live_ab08d50c685fcfdc",
                },
            };
            let body = {
                amount: this.culqiConfig.amount,
                currency_code: "PEN",
                email: email,
                source_id: token,
            };
            // const {data} = await this.$axios.post(url, body, config);
            this.overlay = true;
            await this.$axios.post(url, body, config).then((request) => {
                if (request.data.outcome.type == "venta_exitosa") {
                    this.overlay = false;
                    this.modalConfirmPay = true;
                    const form = {
                        user_id: localStorage.getItem("id_user"),
                        product_id: this.mCourse.id,
                        amount: this.culqiConfig.amount,
                        reference_code: request.data.reference_code,
                        product_type: this.product_type,
                        is_offer: this.isOffer,
                    };
                    this.$axios.post("/payments/save-payment", form);
                } else {
                    this.modalErrorPay = true;
                }
            }).catch(error => {
                console.log(error);
                this.overlay = false;
                this.modalErrorPay = true;
            })
        },
        async sendTransferInfo() {
            const form = {
                'user_id': localStorage.getItem("id_user"),
                'product_id': this.mCourse.id,
                'amount': this.mCourse.precio,
                'reference_code': this.operationModel,
                'bank': this.bankModel,
                'product_type': this.product_type,
                'is_offer': this.isOffer,
            }
            await this.$axios.post("/payments/save-transfer-payment", form).then((response) => {
                if (response.data == "repeated") {
                    this.repeated = true;
                } else if (response.data == "ok") {
                    this.dialog = true;
                }
            });
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.sendTransferInfo();
                this.form = {};
                this.reset();
            } else {
                console.log("error");
            }
        },
        reset() {
            this.$refs.form.reset();
        },
        showPaymentMethod(option) {
            if (option == "transfer") {
                this.transferMethod = true;
                this.culqiMethod = false;
                this.whatsappMethod = false;
            }
            if (option == "culqi") {
                this.transferMethod = false;
                this.culqiMethod = true;
                this.whatsappMethod = false;
                //agregar delay a boton de pago
                this.buttonDelay = true;
                setTimeout(() => this.buttonDelay = false, 1000);
            }
            if (option == "whatsapp") {
                this.transferMethod = false;
                this.culqiMethod = false;
                this.whatsappMethod = true;
            }
        },
        setLoaded() {
            window.paypal
                .Buttons({
                    style: {
                        layout: "vertical",
                        color: "gold",
                        shape: "rect",
                        label: "paypal",
                        tagline: "false",
                    },
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                description: this.itemCouse.title,
                                amount: {
                                    currency_code: "USD",
                                    value: this.itemCouse.price_with_discount,
                                },
                            }, ],
                        });
                    },
                    onApprove: (data, actions) => {
                        const id = this.id_course;
                        const axios = this.$axios;
                        this.paidFor = true;

                        return axios
                            .post("/cart/buy-course", {
                                id_course: id
                            })
                            .then(function () {
                                return actions.order.capture().then(function () {});
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    },
                    onError: function (err) {
                        throw new Error(err);
                    },
                })
                .render(this.$refs.paypal);
        },
        // async isCourseBougth(id_course) {
        //   if (!id_course) return;

        //   const { data } = await this.$axios("course/purchased-courses");
        //   const isPurchased = data.data.find((e) => e.id == id_course);

        //   if (!isPurchased) return;
        //   this.$router.push({ name: "home" });
        // },
        async getCountries() {
            const {
                data
            } = await this.$axios.get("/public/countries");
            this.states = data.map((e) => {
                return {
                    state: e.name
                };
            });
        },
        async getAttributes() {
            var data;
            await this.$axios.get(`/public/course/details/${this.$route.params.slug}`).then((response) => {
                data = response.data;
                this.product_type = data.tipo_producto_id;
                this.isOffer = false;
            });
            if (JSON.stringify(data) == '{}') {
                await this.$axios.get(`offers/details?slug=${this.$route.params.slug}`).then((response) => {
                    data = response.data;
                    this.product_type = 3;
                    this.isOffer = true;
                });
            }
            this.mCourse = data;
            this.culqiConfig.amount = data.precio.toFixed(2).replace(".", "");
            this.culqiConfig.description = data.nombre;
            this.isDetailsLoading = true;
        },
        async getContacts() {
            await this.$axios.get(`/user/seller/contact`).then((response) => {
                this.contacts = response.data;
            })
        }
    },
    created() {
        this.getCountries();
        // this.isCourseBougth(this.$route.params.ide);
        this.getAttributes();
        this.getContacts();
        window.Vue.use(CulqiCheckout, this.culqiConfig);
    },
    mounted() {
        const script = document.createElement("script");
        // script.src ="https://www.paypal.com/sdk/js?client-id=AYOK28eEHBZ3pPlAoSWcvUwO5ke7jzrpz4kteGxTz3bwM1yV21T9jZd4EEEt5KKHjgPjzFxxOXYDm6Fz&components=buttons"
        const client_id = "AYOK28eEHBZ3pPlAoSWcvUwO5ke7jzrpz4kteGxTz3bwM1yV21T9jZd4EEEt5KKHjgPjzFxxOXYDm6Fz";
        script.src = `https://www.paypal.com/sdk/js?client-id=${client_id}&components=buttons`;
        script.addEventListener("load", this.setLoaded);
        document.body.appendChild(script);
    },
};
</script>

<style scoped>
.div-pagar {
    padding: 10px 2% 20px 2%;
    border-radius: 15px;
}

.subt {
    font-size: 1.5em;
}

@media screen and (max-width: 400px) {
    .subt {
        font-size: 1em;
    }
}

.w-full {
    max-width: 100% !important;
}

.paypal-buttons>iframe {
    z-index: 10 !important;
}

a {
    flex: none;
    color: #ffffff !important;
    background-color: #333;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 10px 10px 0;
    text-decoration: none !important;
}

.share-network-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    max-width: 1000px;
    margin: auto;
}

a[class^="share-network-"] .fah {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 10px;
    flex: 0 1 auto;
}

a[class^="share-network-"] span {
    padding: 0 10px;
    flex: 1 1;
    font-weight: 500;
}
</style>
