import HttpService from '../HttpService';
import store from '@/store/index.js';
var token = store.getters['auth/getToken'];
const FSOpenHttpService = new HttpService({
    baseURL: process.env.VUE_APP_FS_OPEN_API_URL || 'http://192.168.0.100:3001/open-api'
});
export default {
    getPreviewVideos(limit, pageNumber){
        return FSOpenHttpService.get('/previewVideos',
            {
                limit,
                pageNumber: Number(pageNumber - 1)
            },
            { Authorization: `Bearer ${token}` }
        );
    },
    getVideo(videoId) {
        return FSOpenHttpService.get('/getVideo',
            {
                videoId
            },
            { Authorization: `Bearer ${token}` }
        );
    },
}