<template>
  <div class="signin">
    <SignInForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignInForm from "@/components/SignInForm.vue";

export default {
  name: "SignIn",
  components: {
    SignInForm,
  },
};
</script>

<style lang="scss">
.signin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: inherit;
}
</style>
