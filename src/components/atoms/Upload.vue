<template>
  <div class="a-upload">
    <label class="file-name" v-text="fileName" />
    <div class="progress-bar">
      <div
        :style="{ width: `${uploadPercent}%` }"
        class="progression-bar"
      ></div>
      <span class="progress-text" v-text="uploadPercent + ' %'"></span>
    </div>
    <input id="FI" type="file" @change="onChange" />
    <label for="FI" class="input-l" v-text="'Choose mp4 or webm file'" />
  </div>
</template>

<script>
//import ChunkSenderWS from "@/websockets/ChunkSenderWS.js"
import StreamChunkSenderWS from "@/websockets/StreamChunkSenderWS.js";
//import fileStream from "@/services/fileStream.js"
import { mapGetters } from "vuex";
export default {
  name: "Upload",
  computed: {
    ...mapGetters({
      userToken: "auth/getToken",
    }),
  },
  data() {
    return {
      fileName: "Choose mp4 or webm file",
      uploadPercent: 0,
    };
  },
  methods: {
    onChange(event) {
      let file = event.target.files[0];
      this.fileName = file.name;
      this.SCS = new StreamChunkSenderWS(file, this.userToken, (value) => {
        this.uploadPercent = value.percent;
      });
    }
  },
};
</script>

<style lang="scss">
.a-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: inherit;
  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
  }
  .file-name {
    overflow-wrap: break-word;
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
  .progress-bar {
    width: 100%;
    background-color: rgb(209, 209, 209);
    position: relative;
    border-radius: 25px;
    height: 25px;
    .progression-bar {
      border-radius: inherit;
      position: absolute;
      background-color: cornflowerblue;
      height: inherit;
    }
    .progress-text {
      position: fixed;
      height: inherit;
      font-weight: 700;
      color: #ffff;
      font-family: Verdana, sans-serif;
      line-height: 25px;
    }
  }
}
</style>