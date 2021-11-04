<template>
  <div>
    <div class="conent">
      <VPCC
        v-for="(videoPreview, index) in videoPreviews"
        :key="index"
        :videoName="videoPreview.file_name"
        :previewImageUrl="videoPreview.preview_picture.file_url"
        :videoId="videoPreview._id"
        :creationDate="videoPreview.createdAt"
        :widthOption="'for-main-page'"
      />
    </div>
  </div>
</template>

<script>
import AuthAPI from "@/api/authAPI/authAPI.js";
import FsAPI from "@/api/fsAPI/fsAPI.js";
import VPCC from "@/components/VideoPreviewCardC.vue";
export default {
  name: "MainPageC",
  components: {
    VPCC,
  },
  data() {
    return {
      videoPreviews: [],
    };
  },
  created() {
    AuthAPI.checkAuth().then((response) => {
      console.log("AUTH_API response: " + response.data.message);
    });
    FsAPI.test().then((response) => {
      console.log("FS_API response: " + response.data.message);
    });
    this.initComponent();
  },
  methods: {
    initComponent() {
      FsAPI.getVideos(10, 1).then((response) => {
        this.videoPreviews = response.data.videos;
      });
    },
  },
};
</script>

<style lang="scss">
.conent {
  display: flex;
  flex-wrap: wrap;
}
</style>