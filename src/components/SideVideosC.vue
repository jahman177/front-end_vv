<template>
  <div class="SVC-container">
    <VPCC
      v-for="(videoPreview, index) in videoPreviews"
      :key="index"
      :videoName="videoPreview.file_name"
      :previewImageUrl="videoPreview.preview_picture.file_url"
      :videoId="videoPreview._id"
      :creationDate="videoPreview.createdAt"
      :widthOption="'for-side-container'"
    />
  </div>
</template>

<script>
import FsAPI from "@/api/fsAPI/fsAPI.js";
import FsOpenAPI from "@/api/fsAPI/fsOpenAPI.js";
import VPCC from "@/components/VideoPreviewCardC.vue";
import { mapGetters } from "vuex";

export default {
  name: "SVC",
  components: {
    VPCC,
  },
  data() {
    return {
      videoPreviews: [],
    };
  },
  computed: {
    ...mapGetters({
      isAuth: "auth/isAuth",
    }),
  },
  created() {
    this.initComponent();
  },
  methods: {
    initComponent() {
      if (this.isAuth) {
        FsAPI.getVideos(10, 1).then((response) => {
          this.videoPreviews = response.data.videos;
        });
      } else {
        FsOpenAPI.getPreviewVideos(10, 1).then((response) => {
          this.videoPreviews = response.data.videos;
        });
      }
    },
  },
};
</script>

<style lang="scss">
.SVC-container{
    display: flex;
    flex-direction: column;
}
</style>