<template>
<div class="pt-5">
    <div class="d-flex justify-content-center align-items-center mt-5 mb-5">
        <img src="@/assets/logo-la-profe-cris.webp" class="mx-1" style="width: 35%" />
    </div>

    <div class="p-4">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field dark v-model="form.email" :label="$t('message.user')" required></v-text-field>

            <v-text-field dark v-model="form.password" :label="$t('message.password')" type="password" required></v-text-field>

            <v-btn color="#0078D7" class="mr-4 text-white" @click="login">
                <div class="text-capitalize">{{ $t('message.log_in') }}</div>
            </v-btn>

            <v-btn color="#0078D7" class="mr-4 text-capitalize text-white" @click="dialog = true">
                {{ $t('message.register') }}
            </v-btn>

            <br><br>

            <v-btn text color="#0078D7" class="mr-4 text-capitalize text-white" @click="dialog2 = true">
                ¿<div class="text-capitalize">{{ $t('message.have_you_lost_your_password') }} ?</div> 
            </v-btn>
        </v-form>
    </div>

    <v-alert dense type="success" v-if="statusRegister">
        {{ message }}
    </v-alert>
    <v-alert dense type="success" v-if="statusErrorRegister">
        {{ message }}
    </v-alert>

    <v-alert dense outlined type="error" v-if="error">
    {{ $t('message.message_login') }}
    </v-alert>
    <div class="text-center">
        <h5 style="font-size: 0.7em; color: #c0bcbc">
            Copyright &copy; {{ year }}. {{ $t('message.footer_all_rights_reserved') }} LAPROFECHRIS
        </h5>
    </div>
    <div>
        <v-dialog v-model="dialog" width="1000">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    <div>{{ $t('message.register') }}</div>
                    <v-spacer></v-spacer>
                    <v-btn color="#ffc700" class="mr-4" @click="dialog = false">
                        x
                    </v-btn>
                </v-card-title>

                <v-card-text class="mt-6">
                    <v-form ref="form2" v-model="valid2" lazy-validation>
                        <div class="row">
                            <div class="col">
                                <v-text-field outlined v-model="form2.name" :label="$t('message.full_names')" required></v-text-field>
                                <v-text-field outlined v-model="form2.password" :label="$t('message.password')" type="password" required></v-text-field>
                                <v-text-field outlined v-model="form2.email" :label="$t('message.email')"  required typeof="email" type="email"></v-text-field>
                                <v-text-field outlined v-model="form2.phone" :label="$t('message.phone')" required></v-text-field>
                            </div>
                            <div class="col">
                                <v-select outlined v-model="form2.doc_type_id" item-text="name" item-value="id" :items="documentType" :label="$t('message.type_document')"></v-select>
                                <v-text-field outlined v-model="form2.number_doc" :label="$t('message.n_document')"  required></v-text-field>
                                <v-select outlined v-model="form2.country" item-text="name" item-value="name" :items="country" label="Pais"></v-select>
                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field outlined v-model="form2.birthday" :label="$t('message.date_of_birth')" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="form2.birthday" no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="#ffc700" @click="menu = false">
                                            {{ $t('message.cancel') }}
                                        </v-btn>
                                        <v-btn text color="#ffc700" @click="$refs.menu.save(date)">
                                            {{ $t('message.accept') }}
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </div>
                        </div>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#ffc700" @click="register"> {{ $t('message.accept') }} </v-btn>
                    <v-btn color="#ffc700" @click="dialog = false"> {{ $t('message.cancel') }} </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

    <div>
        <v-dialog v-model="dialog2" width="500">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    <div>Aviso!</div>
                    <v-spacer></v-spacer>
                    <v-btn color="#ffc700" class="mr-4" @click="dialog2 = false">
                        x
                    </v-btn>
                </v-card-title>

                <v-card-text class="mt-6">
                    <v-form ref="form3" v-model="valid3" lazy-validation>
                        <div class="row">
                            <div class="col">
                                <p>{{ $t('message.send_email_password') }}</p>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <v-text-field outlined v-model="form3.email" :label="$t('message.email')" required typeof="email" type="email"></v-text-field>
                            </div>
                        </div>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#ffc700" @click="sendEmail"> {{ $t('message.accept') }} </v-btn>
                    <v-btn color="#ffc700" @click="dialog2 = false"> {{ $t('message.cancel') }} </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    name: "FormLogin",
    data() {
        return {
            message: "",
            statusRegister: false,
            statusErrorRegister: false,
            form: {},
            form2: {},
            form3: {},
            documentType: {},
            country: {},
            error: false,
            userRules: [(v) => !!v || "User required"],
            passwordRules: [(v) => !!v || "Password required"],
            valid: true,
            valid2: true,
            valid3: true,
            year: "",
            dialog: false,
            dialog2: false,
            date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10),
            menu: false,
            email: ''
        };
    },
    mounted() {
        this.listDocumentType();
        this.listCountry();
    },
    props: {},

    methods: {
        showAlert() {
            this.error = true;
        },
        async login() {
            try {
                const {
                    status,
                    data: response
                } = await this.$axios.post(
                    "/public/auth/login",
                    this.form
                );
                if (status === 200) {
                    const {
                        data
                    } = await response;
                    const {
                        access_token,
                        user
                    } = await data;
                    localStorage.setItem("id_user", user.id);
                    localStorage.setItem("access_token", access_token);
                    localStorage.setItem("name_user", user.name);
                    localStorage.setItem("email_user", user.email);
                    localStorage.setItem("mode", "private");
                    localStorage.setItem("showPrivateNavbar", true);
                    localStorage.setItem("showPublicNavbar", false);
                    localStorage.setItem("showPublicFooter", false);

                    this.$router.push("/academia");
                }
            } catch (error) {
                console.log(error);
                this.showAlert();
            }
        },
        ...mapActions("user", {
            actionUser: "actionUser",
        }),

        async listDocumentType() {
            try {
                const {
                    status,
                    data: response
                } = await this.$axios.get(
                    "/public/listDocumentType"
                );
                if (status === 200) {
                    this.documentType = response;
                }
            } catch (error) {
                console.log(error);
            }
        },

        async listCountry() {
            try {
                const {
                    status,
                    data: response
                } = await this.$axios.get("/public/listCountry");
                if (status === 200) {
                    this.country = response;
                }
            } catch (error) {
                console.log(error);
            }
        },

        async register() {
            try {
                const {
                    status,
                    data: response
                } = await this.$axios.post(
                    "/public/registerAcademyUser",
                    this.form2
                );
                if (status == "success") {
                    this.dialog = false;
                    this.statusRegister = true;
                    this.message = response.message;
                    this.form2 = {};
                } else {
                    this.dialog = false;
                    this.statusErrorRegister = true;
                    this.message = response.message;
                }
            } catch (error) {
                console.log(error);
            }
        },

        async sendEmail() {
            try {
                const {
                    status,
                    data: response
                } = await this.$axios.post(
                    "/public/sendRecoveryEmail",
                    this.form3
                );
                if (status == 200) {
                    this.dialog2 = false;
                    alert(response);
                } else {
                    this.dialog2 = false;
                    alert("Ha ocurrido un error!");
                }
            } catch (error) {
                console.log(error);
            }
        },

        singin() {
            this.actionUser(this.form);
        },

        setYear() {
            this.year = new Date().getFullYear();
        },
    },
    computed: {
        ...mapGetters("user", ["getStatusRequest"]),
    },
    created() {
        this.setYear();
    },
};
</script>

<style>
a>img {
    max-width: 45px;
}

:root {
    --color-prin: #ffc107;
}

.submit-iniciar {
    background: var(--seventh-color-green) !important;
    border: none !important;
    color: white !important;
}

.submit-iniciar:hover {
    background: var(--eighth-color-green) !important;
}

.subtitle {
    font-size: 1em;
}

.holder-form {
    border: 1px solid #35424a;
    border-radius: 30px;
    font-size: 12px;
    padding: 8px 10px;
    padding-left: 21px;
}

.form-values {
    margin-bottom: 30px;
}

.remember {
    font-size: 12px;
}

.remember input {
    align-self: center;
}

.change {
    color: var(--color-prin);
    font-size: 12px;
}

.loguear {
    border: 1px;
    background-color: var(--color-prin);
    border-radius: 30px;
    width: 100%;
    height: 50px;
}

.form-check {
    margin-bottom: 25px;
    flex-flow: row wrap;
}

.form-check>a {
    font-weight: bold;
}
</style>
