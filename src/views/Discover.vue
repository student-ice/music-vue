<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  getBannerList,
  getRecommendlist,
  getNewsong,
  getSongUrl,
  getMv
} from '../api/discover.js'
import { useStore } from '../store/index.js'
import { storeToRefs } from 'pinia'

const store = useStore()
const { url } = storeToRefs(store)
const router = useRouter()
const state = reactive({
  //轮播图
  banners: [],
  //歌单
  playList: [],
  // 新歌
  newsong: [],
  // mv
  mv: [],
  // 歌曲url
  songUrl: ''
})

const getData = async () => {
  const result_1 = await getBannerList()
  const result_2 = await getRecommendlist()
  const result_3 = await getNewsong()
  const result_4 = await getMv()

  state.banners = result_1
  state.playList = result_2
  state.newsong = result_3
  state.mv = result_4
}

onMounted(() => {
  getData()
})

const toPlayList = (_id) => {
  router.push({
    path: '/playlist',
    query: {
      id: _id
    }
  })
}

const playMusic = async (id) => {
  const res = await getSongUrl({
    id: id
  })
  url.value = res.data[0].url
}

const toMv = (id) => {
  router.push({
    path: '/mv',
    query: {
      id: id
    }
  })
}
</script>

<template>
  <div class="discover-container">
    <!--轮播图-->
    <el-carousel :interval="4000">
      <el-carousel-item
        v-for="(item, index) in state.banners.banners"
        :key="index"
      >
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <div class="item" v-for="item in state.playList.result" :key="item.id">
          <div class="img-wrap" @click="toPlayList(item.id)">
            <img :src="item.picUrl" alt />
            <span class="iconfont icon-iceplay"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in state.newsong.result"
          :key="index"
        >
          <div class="img-wrap">
            <img :src="item.picUrl" alt />
            <span
              @click="playMusic(item.id)"
              class="iconfont icon-iceplay"
            ></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="item in state.mv.result" :key="item.id">
          <div class="img-wrap" @click="toMv(item.id)">
            <img :src="item.picUrl" alt />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-iceplay"></div>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.copywriter }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
