<template>
  <transition name="fade">
    <div v-show="showModal" class="a-modal">
      <div class="a-modal-bg"></div>
      <div class="a-modal-body">
        <div class="btn close-btn" @click="$emit('closeModal')">x</div>
        <div class="a-modal-inner">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.a-modal-bg {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.55);
}
.a-modal {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  .a-modal-body {
    border-radius: 10px;
    padding: 25px;
    top: 100px;
    z-index: 100;
    width: 650px;
    height: 400px;
    margin-left: auto;
    margin-right: auto;
    background-color: rgb(255, 255, 255);

    .a-modal-inner {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    }

    .close-btn {
      position: absolute;
    }

    /* FADE IN */
    .fade-enter-active {
      transition: opacity 1s;
    }

    .fade-enter {
      opacity: 0;
    }
  }
}
</style>