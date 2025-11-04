<template>

  <div>
    <!-- BJFG -->

  <!-- footer block -->
  <footer class="w3l-footer-29-main">
        <div class="footer-29 pt-5 pb-4">
            <div class="container pt-md-4">
                <div class="row footer-top-29">
                    <div class="col-lg-4 col-md-6 footer-list-29">
                        <h6 class="footer-title-29">{{ $t('message.footer_contact_information') }}</h6>
                        <p class="mb-2 pe-xl-5">{{ $t('message.footer_address') }}</p>
                        <p class="mb-2">{{ $t('message.footer_num_contact') }} <a href="tel:+1(21) 234 4567">+33 7 49630070</a></p>
                        <p class="mb-2">{{ $t('message.footer_email') }} <a href="mailto:laprofechris@gmail.com">laprofechris@gmail.com</a></p>
                    </div>
                    <div class="col-lg-2 col-md-3 col-6 footer-list-29 mt-md-0 mt-4">
                        <ul>
                            <h6 class="footer-title-29">{{ $t('message.footer_quick_links') }}</h6>
                            <li><a href="javascript:void(0)">{{ $t('message.footer_cours') }}</a></li>
                            <li><a href="javascript:void(0)">{{ $t('message.footer_master') }}</a></li>
                            <li><a href="javascript:void(0)">{{ $t('message.footer_contacts') }}</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-8 footer-list-29 mt-lg-0 mt-4 ps-lg-5">
                        <h6 class="footer-title-29">{{ $t('message.footer_subscribe') }}</h6>
                        <form action="#" class="subscribe d-flex" method="post">
                            <input type="email" name="email" placeholder="E-mail" required="">
                            <button class="button-style"><span class="fa fa-paper-plane"
                                    aria-hidden="true"></span></button>
                        </form>
                        <p class="mt-3">{{ $t('message.footer_quotation') }}</p>
                    </div>
                </div>
                <p class="copy-footer-29 text-center pt-lg-2 mt-5 pb-2">© 2023 LAPROFECHRIS. {{ $t('message.footer_all_rights_reserved') }}</p>
                
            </div>
        </div>
    </footer>
  <!-- <BottomChat></BottomChat> -->

  </div>
</template>
<script>
// import BottomChat from "@/components/public/SocialChat/Index.vue";
export default {
  data() {
    return {
      form: {
        user: "",
        phone: "",
        email: "",
        message: "",
        snackbar: false,
        msg: "",
      },
    };
  },
  components: {
    // BottomChat,
  },
  methods: {
    async sendQuery() {
        const form = {
          fullname: this.form.user,
          phone: this.form.phone,
          email: this.form.email,
          message: this.form.message,
        };
        await this.$axios.post("/public/save-queries", form).then((response) => {
          console.log(response);
          this.form.user = "";
          this.form.phone = "";
          this.form.email = "";
          this.form.message = "";
          this.msg = "Enviado";
          this.snackbar = true;
        });
    },
    validateFields(){
      if(this.form.user == "" || this.form.user.length < 3){
        this.msg = "Ingrese su nombre correctamente";
        this.snackbar = true;
        return false;
      }
      if(this.form.phone == "" || this.form.phone < 900000000){
        this.msg = "Ingrese su número telefónico correctamente";
        this.snackbar = true;
        return false;
      }
      if(this.form.email == ""){
        this.msg = "Ingrese su correo";
        this.snackbar = true;
        return false;
      }
      return true;
    }
  },
};
</script>
<style scoped>
.font {
  font-family: Roboto !important;
}

.text-justify {
  text-align: justify !important;
}

.fila-iconos-redes {
  gap: 25px;
}

.redes {
  text-align: justify;
}

.footer .fila-contact {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.footer .fila-contact img {
  width: 30px;
  height: 30px;
}

.footer .consultoria_formulario {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer input {
  height: 40px;
}

.footer textarea,
.footer input {
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 10px;
}

.footer .text-footer {
  margin-right: 15px;
}

.footer .consultoria_formulario button {
  width: 100px;
}

.footer .sub-titulo-footer {
  font-size: 24px;
}

.footer .fila-contact {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.footer .fila-contact img {
  width: 30px;
  height: 30px;
}
</style>
