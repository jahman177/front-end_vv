
const ee = require('event-emitter');

export default class StreamChunkSenderWS {
    chunksOptions = null;
    reader = null;
    totalSentSize = 0;
    chunkNumber = 0;
    constructor(file, userToken, cb) {
        this.updateCB = cb;
        this.ee = ee();
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

    getChunk(value, chunkNumber, fileId) {
        const encoder = new TextEncoder();
        let encodedMetaData = null;
        if(value) {
            encodedMetaData = encoder.encode(JSON.stringify({
                chunkNumber,
                chunkFileId: fileId,
                chunkSize: value.length
            }))
        } else {
            encodedMetaData = encoder.encode(JSON.stringify({
                asembleChunks: true,
                chunkFileId: fileId,
            }))
        }
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

    listner(self) {
        console.log('in proceed event, chunknumber:' + self.chunkNumber);
        ++self.chunkNumber;
        self.reader.read().then((value) => {
            self.processFile(value, self)
        });
    }
    processFile({ done, value }, self) {
        if (done) {
            self.connection.send(self.getChunk(value, self.chunkNumber, self.chunksOptions.fileId));
            return;
        }
        self.totalSentSize += value.length;
        let chunk = self.getChunk(value, self.chunkNumber, self.chunksOptions.fileId)
        self.connection.send(chunk);
        chunk = null;
        self.updateCB({
            chunkTotal: 0,
            currentChunkNumber: self.chunkNumber,
            percent: Math.round(self.totalSentSize/self.file.size * 100)
        });
    }
    startStream(file) {
        this.reader = file.stream().getReader();
        this.ee.on('proceed', this.listner);
        let self = this;
        this.reader.read().then((value) => {
            this.processFile(value, self)
        })
    }

    // async test() {
    //     let chunk = await reader.read();
    //     while (!chunk.done) {
    //         chunk = await reader.read();
    //     }
    // }
    initOnMessage() {
        this.connection.onmessage = (event) => {
            let chunksOptions = JSON.parse(event.data);
            switch (chunksOptions.message) {
                case "start": {
                    this.chunksOptions = chunksOptions;
                    this.startStream(this.file);
                }break;
                case "proceed": {
                    this.ee.emit('proceed', this);
                }break;
                case "close": {
                    this.ee.off('proceed', this.listner);
                    this.connection.close();
                }break;
            }
        };
    }

}