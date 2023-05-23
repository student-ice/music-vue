import request from '../utils/http.js'
// 搜索
export const search = ({ keywords, limit, offset, type }) => {
    return request({
        url: '/search',
        method: 'get',
        params: {
            keywords,
            limit,
            offset,
            type
        }
    })
}