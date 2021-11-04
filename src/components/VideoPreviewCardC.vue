<template>
  <div class="c-vpcc" :class="[widthOption]">
    <router-link
      class="vpcc-body"
      :to="{ name: 'VideoView', params: { videoId } }"
    >
      <div class="image-holder">
        <img :src="previewImageUrl" />
      </div>
      <div class="text-holder">
        <span v-text="videoName"></span>
        <span v-text="creationDate"></span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "VPCC",
  props: [
    "videoName",
    "previewImageUrl",
    "videoId",
    "creationDate",
    "widthOption",
  ],
};
</script>

<style lang="scss">
.for-main-page {
  @media screen {
    width: calc((100% - (16px * 5)) / 5);
  }
  @media screen and (max-width: 1460px) {
    width: calc((100% - (16px * 4)) / 4);
  }
}
.for-side-view {
  width: calc(100% - 16px);
}
.c-vpcc {
  margin-left: calc(16px / 2);
  margin-right: calc(16px / 2);
  margin-bottom: 20px;

  .vpcc-body {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-decoration: none;

    .image-holder {
      img {
        object-fit: cover;
        width: 100%;
        height: 200px;
      }
    }
    .text-holder {
      display: flex;
      flex-direction: column;
      span {
        word-break: break-word;
        color: #030303;
        font-weight: 400;
        display: inline-block;
      }
    }
  }
}
</style>