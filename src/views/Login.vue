<template>
  <div class="login">
    <LoginForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Login",
  components: {
    LoginForm,
  },
};
</script>

<style lang="scss">
.login{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: inherit;
}
</style>
