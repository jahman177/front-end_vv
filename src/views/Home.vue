<template>
  <div class="home">
    <Preview/>
  </div>
</template>

<script>
// @ is an alias to /src
import Preview from "@/components/Preview.vue";

export default {
  name: "Home",
  components: {
    Preview,
  },
};
</script>
