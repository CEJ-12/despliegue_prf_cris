<template>
  <!-- BJFG -->

  <!-- call block -->
    <section class="w3l-call-to-action-6" id="contact">
        <div class="container py-md-5 py-sm-4 py-5">
            <div class="d-lg-flex align-items-center justify-content-between">
                <div class="left-content-call">
                    <h3 class="title-big">{{ $t('message.register_today') }}</h3>
                    <p class="text-white mt-1"></p>
                </div>
                <div class="right-content-call mt-lg-0 mt-4">
                    <ul class="buttons d-flex">
                        <li class="phone-sec phone-number me-lg-4"><i class="fas fa-phone-volume"></i>
                            <a style="text-decoration: none;" class="call-style-w3" href="tel:+33 7 49630070">+33 7 49630070</a>
                        </li>
                        <li class="container-btn-whatsapp">
                          <a style="text-decoration: none;" href="https://wa.me/33749630070" class="phone-number" target="_blank">WhatsApp</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      items: [
        { name: "DNI", id: 1 },
        { name: "Pasaporte", id: 2 },
        { name: "Carnet de extranjeria", id: 3 },
        { name: "Otros", id:4 },
      ],
      documento: "",
      nrodocumento: "",
      mostrarImagen: false,
      mostrarMensaje: false,
      imagen: null,
      userData: [],
      nrodocumentoRules: [
        (v) => !!v || "Nro. de documento requerido",
        (v) =>
          (v && v.length >= 8) ||
          "El documento debe tener al menos 8 caracteres",
      ],
    };
  },

  methods: {
    download(id) {
      this.$axios({
        url: `/public/sstclient/download-certificate?id=${id}`,
        method: 'GET',
        responseType: 'blob'
      })
      .then((response) => {
        const url = window.URL
              .createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'image.jpg');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.checkCertified();
        this.form = {};
        this.reset();
      } else {
        console.log("error");
      }
    },
    reset() {
      this.$refs.form.reset();
    },

    async checkCertified() {
      const form = {
        doc_type_id: this.documento,
        num_doc: this.nrodocumento,
      };
      await this.$axios.post("/public/sstclient/client-info", form).then((response) => {
        if(response.data.length == 0){
          this.mostrarMensaje = true;
        }else{
          this.userData = response.data;
          this.mostrarImagen = true;
        }
      });
    },
  },
};
</script>

<style scoped>
a{
  font-style: none;
}

.phone-number{
  width: max-content;
  color: rgb(255, 255, 255);
}

 .container-btn-whatsapp{
  margin-left: 20px;
  background-color: #0dbf42;
  border-radius: 30px;
  color: rgb(255, 255, 255);
  padding: 10px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.712);
}
</style>
