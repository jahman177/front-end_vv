<template>
  <div class="video-view-container">
    <div class="left-container">
      <VideoViewC
        :videoUrl="videoUrl"
        :videoName="'name'"
        :uploadedAt="'time'"
        :previewUrl="previewUrl"
      />
      <button v-if="checkPermissions" class="btn" @click="showCPPM = !showCPPM">
        change preview picture
      </button>
      <button v-if="checkPermissions" class="btn" @click="deleteVideo">
        delete video
      </button>
    </div>
    <div class="right-container">
      <SVC />
    </div>
    <modal
      v-if="isAuth"
      :show-modal="showCPPM"
      @closeModal="showCPPM = !showCPPM"
    >
      <div class="preview-loader-body">
        <input id="FI2" type="file" @change="onChangePreview" />
        <label for="FI2" class="input-l" v-text="'Choose preview picture'" />
      </div>
    </modal>
  </div>
</template>

<script>
// todo show preview on video elemnt
import VideoViewC from "@/components/VideoViewC.vue";
import { mapGetters } from "vuex";
import FsAPI from "@/api/fsAPI/fsAPI.js";
import FsOpenAPI from "@/api/fsAPI/fsOpenAPI.js";
import Modal from "@/components/atoms/Modal.vue";
import SVC from "@/components/SideVideosC.vue";

export default {
  name: "VideoView",
  //props: ["videoId"],
  components: {
    VideoViewC,
    Modal,
    SVC,
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      userToken: "auth/getToken",
      isAuth: "auth/isAuth",
    }),
    checkPermissions() {
      return this.isAuth && this.user.id === this.ownerId;
    },
  },
  data() {
    return {
      videoId: null,
      videoUrl: "",
      showCPPM: false,
      fileId: null,
      ownerId: null,
      previewUrl: null,
    };
  },
  created() {
    this.initComponent();
  },
  methods: {
    initComponent() {
      this.videoId = this.$route.params.videoId;
      if (this.isAuth) {
        FsAPI.getVideo(this.videoId).then((responce) => {
          if (responce.data.video.converted_url) {
            this.videoUrl = responce.data.video.converted_url;
            this.fileId = responce.data.video.file_id;
            this.ownerId = responce.data.video.user_id;
            this.previewUrl = responce.data.video.preview_picture.file_url;
          } else {
            this.ownerId = responce.data.video.user_id;
            alert("need convertation");
          }
        });
      } else {
        FsOpenAPI.getVideo(this.videoId).then((responce) => {
          if (responce.data.video.converted_url) {
            this.videoUrl = responce.data.video.converted_url;
            this.previewUrl = responce.data.video.preview_picture.file_url;
          } else {
            alert("need convertation");
          }
        });
      }
    },
    onChangePreview(event) {
      let file = event.target.files[0];
      FsAPI.changePreviewPicture(file, this.fileId).then((response) => {
        console.log(response);
        // todo update preview
      });
    },
    deleteVideo() {
      FsAPI.deleteVideo(this.videoId).then((response) => {
        console.log(response);
        // todo redirect to main page
      });
    },
  },
  watch: {
    $route() {
      this.initComponent();
    },
  },
};
</script>

<style lang="scss" scoped>
.video-view-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 100%;
  .left-container {
    width: 75%;
  }
  .right-container {
    width: 25%;
    overflow-y: auto;
  }
}

.preview-loader-body {
  width: 100%;
  height: 100%;
}
input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
}
.input-l {
  /* todo add variables */
  background-color: rgb(46, 155, 243);
  border-radius: 5px;
  padding: 5px;
  color: #ffff;
  font-size: 1.25em;
  font-weight: 700;
  width: 300px;
}
</style>