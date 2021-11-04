<template>
  <div class="conent">
      <VPCC
        v-for="(videoPreview, index) in videoPreviews"
        :key="index"
        :videoName="videoPreview.file_name"
        :previewImageUrl="videoPreview.preview_picture.file_url"
        :videoId="videoPreview._id"
        :widthOption="'for-main-page'"
      />
    </div>
</template>

<script>
import FsOpenAPI from "@/api/fsAPI/fsOpenAPI.js";
import VPCC from "@/components/VideoPreviewCardC.vue";

export default {
  name: "Preview",
  components: {
    VPCC,
  },
  data() {
    return {
      videoPreviews: [],
    };
  },
  created() {
    this.initComponent();
  },
  methods: {
    initComponent() {
      FsOpenAPI.getPreviewVideos(10, 1).then((response) => {
        this.videoPreviews = response.data.videos;
      });
    },
  },
};
</script>
