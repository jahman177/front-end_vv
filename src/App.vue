<template>
  <div id="nav">
    <div class="logo-holder">
      <router-link class="logo" to="/">Home/logo</router-link>
    </div>
    <div class="search-holder"></div>
    <div class="options-holder">
      <router-link v-if="!isAuth" class="btn" :to="{ name: 'Login' }"
        >Login</router-link
      >
      <button class="btn" v-if="isAuth" @click="logout">Logout</button>
      <button
        class="btn upload"
        v-if="isAuth"
        @click="showUploadM = !showUploadM"
      >
        Upload Video
      </button>
      <modal
        v-if="isAuth"
        :show-modal="showUploadM"
        @closeModal="showUploadM = !showUploadM"
      >
        <Upload />
      </modal>
    </div>
  </div>
  <div class="main-content">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Modal from "@/components/atoms/Modal.vue";
import Upload from "@/components/atoms/Upload.vue";
export default {
  components: {
    Modal,
    Upload,
  },
  computed: {
    ...mapGetters({
      isAuth: "auth/isAuth",
    }),
  },
  data() {
    return {
      showUploadM: false,
    };
  },
  methods: {
    ...mapActions({
      storeLogout: "auth/logout",
    }),
    logout() {
      this.storeLogout();
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}

.btn {
  border: 1px solid rgba($color: #2d65ff, $alpha: 1);
  padding: 10px;
  border-radius: 15px;
  z-index: 10;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  background-color: #2d65ff;

  font-family: Verdana, sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #ffff;
}

.btn:hover {
  transform: scale(1.1);
}

.main-content {
  padding-top: 10px;
  height: calc(100vh - 66px);
  background-color: #f9f9f9;
  overflow-y: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: #ffffff;
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;

  a {
    display: inline-block;
    text-decoration: none;
  }
  .logo-holder {
    width: calc(100% / 3);
  }
  .search-holder {
    width: calc(100% / 3);
  }
  .options-holder {
    width: calc(100% / 3);
  }
}
</style>
