<template>
  <div>
    <Form @submit="onSubmit" :validation-schema="schema">
      <TextField
        name="name"
        type="text"
        label="Your name"
        placeholder="Type Name"
        success-message=""
      />
      <TextField
        name="email"
        type="text"
        label="Your email"
        placeholder="Type email"
        success-message=""
      />
      <TextField
        name="password"
        type="text"
        label="Password"
        placeholder="type password"
        success-message=""
      />
      <TextField
        name="confPassword"
        type="text"
        label="confirm password"
        placeholder="type again password"
        success-message=""
      />
      <button class="btn submit-btn" type="submit">SignIn</button>
    </Form>
    <div>
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </div>
  </div>
</template>

<script>
import { Form } from "vee-validate";
import TextField from "@/components/atoms/TextField.vue";
import * as Yup from "yup";
import AuthAPI from "@/api/authAPI/authAPI.js";

export default {
  name: "SignInForm",
  components: {
    Form,
    TextField,
  },
  data() {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      confPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    });

    return {
      name: null,
      email: null,
      password: null,
      confPassword: null,
      schema: schema,
    };
  },
  methods: {
    onSubmit(values) {
      AuthAPI.signIn(values.name, values.email, values.password).then(() => {
        this.$router.push({name: 'Login'});
        })
    },
  },
};
</script>

<style lang="scss">
.submit-btn {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
