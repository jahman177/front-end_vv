import FsAPI from "@/api/fsAPI/fsAPI.js";

export default class StreamChunkSenderWS {
  chunksOptions = null;
  chunkNumber = 0;
  constructor(cb) {
    this.updateCB = cb;
  }
  getChunk(value, chunkNumber, fileId) {
    const encoder = new TextEncoder();
    let encodedMetaData = encoder.encode(JSON.stringify({
      chunkNumber,
      chunkFileId: fileId,
      chunkSize: value.length
    })
    )
    console.log(encodedMetaData.byteLength);
    let metaData = new Blob(
      [
        encodedMetaData,
        new ArrayBuffer(100 - encodedMetaData.byteLength)
      ],
      { type: "text/plain" }
    );
    return new Blob([
      metaData,
      value
    ],
      { type: 'application/octet-stream' });
  }

  startStream(file) {
    const fileId = Date.now();
    const reader = file.stream().getReader();
    let self = this;
    reader.read().then(function processFile({ done, value }) {
      if (done) {
        FsAPI.assembleChunks(String(fileId), file.name, file.type).then(() => {
          self.updateCB({
            chunkTotal: self.chunkNumber,
            currentChunkNumber: self.chunkNumber,
            isFinished: true
          });
        })
        return;
      }
      FsAPI.saveChunk(fileId, self.chunkNumber, new Blob([value], {type: 'application/octet-stream'})).then(() => {
        ++self.chunkNumber;
        self.updateCB({
          currentChunkNumber: self.chunkNumber
        });
        reader.read().then(processFile);   
      });
    });
  }

}