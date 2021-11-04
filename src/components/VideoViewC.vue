<template>
  <div class="vvc-container">
    <video controls :src="videoUrl" :poster="previewUrl" />
  </div>
</template>

<script>
export default {
  name: "VideoViewC",
  props: ["videoUrl", "previewUrl"],
};
</script>

<style lang="scss" scoped>
.vvc-container {
  video {
    max-width: 80%;
  }
}
</style>