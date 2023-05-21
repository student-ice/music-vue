import request from '../utils/http.js'
// 新歌速递
export const topSongs = ({ type }) => {
    return request({
        url: '/top/song',
        method: 'get',
        params: {
            type
        }
    })
}