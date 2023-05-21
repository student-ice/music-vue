import request from '../utils/http.js'
// 精品歌单
export const highquality = ({ cat }) => {
    return request({
        url: '/top/playlist/highquality',
        method: 'get',
        params: {
            limit: 1,
            cat
        }
    })
}
// 歌单 ( 网友精选碟 )
export const topList = ({ cat, offset }) => {
    return request({
        url: '/top/playlist',
        method: 'get',
        params: {
            limit: 10,
            offset,
            cat
        }
    })
}
