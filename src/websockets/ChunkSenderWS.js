
export default class ChunkSenderWS {
    constructor(file, userToken, cb) {
        this.updateCB = cb;
        let queryString = new URLSearchParams({
            token: userToken,
            fileSize: file.size,
            fileType: file.type,
            fileName: file.name
        }).toString();
        this.file = file;
        this.connection = new WebSocket(process.env.VUE_APP_WS_URL + "?" + queryString);
        this.initOnMessage();
    }

    getChunk(file, chunksOptions) {
        const reader = new FileReader();
        return new Promise((resolve) => {
            reader.onload = () => {
                let endChunk = new Blob(
                    [
                        reader.result,
                        JSON.stringify({
                            chunkNumber: chunksOptions.nextChunkNumber,
                            chunkFileId: chunksOptions.fileId,
                            chunkSize: fileChunk.size
                        }),
                    ],
                    { type: "application/octet-stream" }
                );
                resolve(endChunk);
            };
            let fileChunk = file.slice(chunksOptions.maxChunkSize * chunksOptions.nextChunkNumber, chunksOptions.maxChunkSize * (chunksOptions.nextChunkNumber + 1));
            reader.readAsArrayBuffer(fileChunk);
        });
    }

    initOnMessage() {
        this.connection.onmessage = (event) => {
            let chunksOptions = JSON.parse(event.data);
            console.log(chunksOptions);
            switch (chunksOptions.message) {
                case "start": {
                    this.getChunk(this.file, chunksOptions).then((chunk) => {
                        this.connection.send(chunk);
                        chunk = null;
                        this.updateCB({
                            chunkTotal: chunksOptions.chunkTotal,
                            currentChunkNumber: chunksOptions.nextChunkNumber,
                            percent: Math.round(chunksOptions.nextChunkNumber/chunksOptions.chunkTotal * 100)
                        });
                    });
                } break;
                case "proceed": {
                    this.getChunk(this.file, chunksOptions).then((chunk) => {
                        this.connection.send(chunk);
                        chunk = null;
                        this.updateCB({
                            chunkTotal: chunksOptions.chunkTotal,
                            currentChunkNumber: chunksOptions.nextChunkNumber,
                            percent: Math.round(chunksOptions.nextChunkNumber/chunksOptions.chunkTotal * 100)
                        });
                    });
                } break;
                case "close": {
                    this.connection.close()
                } break;
            }
        };
    }

}