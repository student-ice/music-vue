import request from '../utils/http.js'
// mv地址
export const allMvs = ({ area, order, type, offset, limit }) => {
    return request({
        url: '/mv/all',
        method: 'get',
        params: {
            limit,
            area,
            order,
            type,
            offset
        }
    })
}