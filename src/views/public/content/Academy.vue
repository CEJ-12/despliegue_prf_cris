<template>
  <div class="h-100 m-0 p-0">
    <section class="row align-items-stretch h-100 p-0 m-0">
      <div
        class="d-none d-md-block col p-0"
      >
        <Form-Welcome />
      </div>
      <div class="col col-lg-4 m-0" style="background-color: #494b4d">
        <FormLogin />
      </div>
    </section>
  </div>
</template>
<script>
import FormLogin from "@/components/auth/FormUser/FormLogin.vue";
import FormWelcome from "@/components/auth/FormUser/FormWelcome.vue";
export default {
  name: "Login",
  components: {
    FormLogin,
    FormWelcome,
  },
  methods: {},
};
</script>
<style scope>
.bg-dark {
  background-color: #35424a;
}
:root {
  --color-refere: #000000;
}
.title {
  font-weight: bold;
  font-size: 36px;
}
.text-logo {
  font-weight: 600;
  font-size: 20px;
  padding-bottom: 10px;
  color: #ffffff;
  letter-spacing: 0.2em;
  margin-left: 0.5em;
}
</style>
