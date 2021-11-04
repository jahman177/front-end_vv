<template>
  <div>
    <Form @submit="onSubmit" :validation-schema="schema">
      <TextField
        name="email"
        type="text"
        label="Email"
        placeholder="Type email"
        success-message=""
      />
      <TextField
        name="password"
        type="text"
        label="Password"
        placeholder="Type password"
        success-message=""
      />
      <button>Login</button>
    </Form>
    <router-link class="" :to="{ name: 'SignIn' }">SignIn</router-link>
    <div>
      <router-link :to="{ name: 'ForgetPassword' }"
        >Forget password</router-link
      >
    </div>
  </div>
</template>

<script>
import { Form } from "vee-validate";
import { mapActions } from 'vuex';
import TextField from "@/components/atoms/TextField.vue";
import * as Yup from "yup";
import AuthAPI from "@/api/authAPI/authAPI.js";

export default {
  name: "LoginForm",
  components: {
    Form,
    TextField,
  },
  data() {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });
    return {
      email: "",
      password: "",
      schema,
    };
  },
  methods: {
    ...mapActions({
      loggedIn: 'auth/loggedIn'
  }),
    parseJwt(token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    },
    onSubmit(values) {
      AuthAPI.login(values.email, values.password).then((response) => {
          this.loggedIn({
            token: response.data.token,
            payload: this.parseJwt(response.data.token)
          });
          this.$router.push({name: 'MainPage'});
        }).catch((e) => {
          alert(e.message);
        });
    },
  },
};
</script>

<style lang="scss">

</style>