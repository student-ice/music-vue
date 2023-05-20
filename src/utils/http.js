import axios from 'axios'

const request = axios.create({
    baseURL: process.env.MUSIC_VUE_BASEURL
})

export default request