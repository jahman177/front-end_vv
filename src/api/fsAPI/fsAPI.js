import HttpService from '../HttpService';
import store from '@/store/index.js';
var token  = () => store.getters['auth/getToken'];
const FSHttpService = new HttpService({
    baseURL: process.env.VUE_APP_FS_API_URL || 'http://192.168.0.100:3001/api'
});
export default {
    test() {
        return FSHttpService.get('/test', {}, { Authorization: `Bearer ${token()}` });
    },
    getVideos(limit, pageNumber) {
        return FSHttpService.get('/getVideos',
            {
                limit,
                pageNumber: Number(pageNumber - 1)
            },
            { Authorization: `Bearer ${token()}` }
        );
    },
    getVideo(videoId) {
        return FSHttpService.get('/getVideo',
            {
                videoId
            },
            { Authorization: `Bearer ${token()}` }
        );
    },
    getUserVideos() { },
    convertVideo(videoId) {
        return FSHttpService.post('/convertVideo', {videoId}, { Authorization: `Bearer ${token()}` })
    },
    assembleChunks(fileId, fileName, fileType) {
        return FSHttpService.post('/assembleChunks', { fileId, fileName, fileType }, { Authorization: `Bearer ${token()}` });
    },
    saveChunk(fileId, chunkNumber, chunk) {
        let FD = new FormData();
        FD.append('chunk', chunk);
        return FSHttpService.post('/saveChunk', FD, {
            "Authorization": `Bearer ${token()}`,
            "Content-Type": "multipart/form-data",
            "X-FILE-ID": fileId,
            "X-CHUNK-NUMBER": chunkNumber
        });
    },
    getPreviewVideos(limit, pageNumber){
        return FSHttpService.get('/previewVideos',
            {
                limit,
                pageNumber: Number(pageNumber - 1)
            },
            { Authorization: `Bearer ${token()}` }
        );
    },
    changePreviewPicture(file, fileId){
        let FD = new FormData();
        FD.append('file', file);
        return FSHttpService.post('/changePreviewPicture', FD, {
            "Authorization": `Bearer ${token()}`,
            "Content-Type": "multipart/form-data",
            "X-FILE-ID": fileId
        });
    },
    deleteVideo(videoId){
        return FSHttpService.delete('/deleteVideo', {videoId}, {"Authorization": `Bearer ${token()}`});
    }
}