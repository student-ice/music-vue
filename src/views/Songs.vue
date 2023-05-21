<script setup>
import { topSongs } from '../api/songs.js'
import { onMounted, reactive, watch } from 'vue'
import { formatDuration } from '../utils/filters.js'
import { useRouter } from 'vue-router'
import { getSongUrl } from '../api/discover.js'
import { useStore } from '../store/index.js'
import { storeToRefs } from 'pinia'

const store = useStore()
const { url } = storeToRefs(store)
const router = useRouter()
const state = reactive({
  //歌曲加载失败展示的默认图片
  defaultImageUrl:
    'http://81.70.119.233/wp-content/uploads/2023/04/cropped-微信图片_20230329144827.jpg',
  //地区类型  0：全部
  type: 0,
  tableData: []
})

const getData = () => {
  topSongs({
    type: state.type
  })
    .then((res) => {
      state.tableData = res.data
      //console.log(state.tableData)
    })
    .catch(() => {})
}

onMounted(() => {
  getData()
})

function setDefaultImage(event) {
  event.target.src = state.defaultImageUrl
}

const toMV = (id) => {
  router.push({
    path: '/mv',
    query: {
      id: id
    }
  })
}

watch(
  () => state.type,
  (newValue, oldValue) => {
    state.page = 1
    getData()
  }
)

const playMusic = async (id) => {
  const res = await getSongUrl({
    id: id
  })
  //console.log(res)
  url.value = res.data[0].url
}
</script>

<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span
        class="item"
        :class="{ active: state.type === 0 }"
        @click="state.type = 0"
        >全部</span
      >
      <span
        class="item"
        :class="{ active: state.type === 7 }"
        @click="state.type = 7"
        >华语</span
      >
      <span
        class="item"
        :class="{ active: state.type === 96 }"
        @click="state.type = 96"
        >欧美</span
      >
      <span
        class="item"
        :class="{ active: state.type === 8 }"
        @click="state.type = 8"
        >日本</span
      >
      <span
        class="item"
        :class="{ active: state.type === 16 }"
        @click="state.type = 16"
        >韩国</span
      >
    </div>
    <!-- 底部的table -->
    <table class="el-table song-table">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>音乐标题</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="el-table__row"
          v-for="(item, index) in state.tableData"
          :key="item.id"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap" @click="playMusic(item.id)">
              <img :src="item.album.picUrl" @error="setDefaultImage" alt />
              <span class="iconfont icon-iceplay"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span
                  v-if="item.mvid !== 0"
                  class="iconfont icon-icebofangMV"
                  @click="toMV(item.mvid)"
                ></span>
              </div>
              <span>{{ item.subTitle }}</span>
            </div>
          </td>
          <td>{{ item.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ formatDuration(item.duration) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
