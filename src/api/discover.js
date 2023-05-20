import request from '../utils/http.js'

//获取轮播图列表
export const getBannerList = () => {
    return request({
        url: '/banner'
    })
}

// 获取推荐歌单
export const getRecommendlist = ({ limit = 10 } = {}) => {
    return request({
        url: '/personalized',
        method: 'get',
        params: {
            limit
        }
    })
}