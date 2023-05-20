import request from '../utils/http.js'

//获取轮播图列表
export const getBannerList = () => {
    return request({
        url: '/banner'
    })
}