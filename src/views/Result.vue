<script setup>
import { search } from '../api/search.js'
import { getSongUrl } from '../api/discover.js'
import { onMounted, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '../store/index.js'
import { storeToRefs } from 'pinia'
import { formatCount, formatDuration } from '../utils/filters.js'

const store = useStore()
const { url } = storeToRefs(store)
const router = useRouter()
const route = useRoute()
const state = reactive({
  type: '1',
  // 页容量
  limit: 15,
  // 页码
  page: 1,
  // 总条数
  total: 0,
  songList: [],
  playList: [],
  mvList: []
})

const toPlaylist = (id) => {
  router.push({
    path: '/playlist',
    query: {
      id: id
    }
  })
}

// 双击歌曲
const rowDbclick = async (id) => {
  const res = await getSongUrl({
    id
  })
  url.value = res.data[0].url
}

// 去mv页面
const toMV = (mvid) => {
  router.push({
    path: '/mv',
    query: {
      mvid: mvid
    }
  })
}

const searchResult = () => {
  const { limit, type } = state
  const keywords = route.query.keywords
  search({
    limit,
    type,
    keywords,
    offset: (state.page - 1) * limit
  }).then((res) => {
    console.log(res)
    // 根据类型不同
    switch (state.type) {
      case '1':
        state.songList = res.result.songs
        state.total = res.result.songCount
        break
      case '1000':
        state.playList = res.result.playlists
        state.total = res.result.playlistCount
        break
      default:
        state.mvList = res.result.mvs
        state.total = res.result.mvCount
        break
    }
  })
}

onMounted(() => {
  searchResult()
})

// 监听type的更改
watch(
  () => state.type,
  () => {
    state.page = 1
    state.limit = state.type === '1004' ? 12 : 15
    searchResult()
  }
)

// 监听路由的改变
watch(
  () => route.query.keywords,
  () => {
    state.page = 1
    state.limit = state.type === '1004' ? 12 : 15
    searchResult()
  }
)

// 页码改变
const handleCurrentChange = (val) => {
  state.page = val
  searchResult()
}
</script>

<template>
  <div class="result-container" ref="container">
    <div class="title-wrap">
      <h2 class="title">{{ route.query.keywords }}</h2>
      <span class="sub-title">找到{{ state.total }}个结果</span>
    </div>
    <el-tabs v-model="state.type">
      <el-tab-pane label="歌曲" name="1">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in state.songList"
              :key="item.id"
              @dblclick="rowDbclick(item.id)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span class="name">{{ item.name }}</span>
                    <span
                      v-if="item.mvid !== 0"
                      class="iconfont icon-icebofangMV"
                      @click="toMV(item.mvid)"
                    ></span>
                  </div>
                  <span class="sub-name" v-if="item.alias.length !== 0"
                    >{{ item.alias[0] }}
                  </span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ formatDuration(item.duration) }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="1000">
        <div class="items">
          <div
            class="item"
            v-for="item in state.playList"
            :key="item.id"
            @click="toPlaylist(item.id)"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ formatCount(item.playCount) }}</span>
              </div>
              <img :src="item.coverImgUrl" alt />
              <span class="iconfont icon-iceplay"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="1004">
        <div class="items mv">
          <div
            class="item"
            v-for="item in state.mvList"
            :key="item.id"
            @click="toMV(item.id)"
          >
            <div class="img-wrap">
              <img :src="item.cover" alt />
              <span class="iconfont icon-iceplay"></span>
              <div class="num-wrap">
                <div class="iconfont icon-iceplay"></div>
                <div class="num">{{ formatCount(item.playCount) }}</div>
              </div>
              <span class="time">{{ formatDuration(item.duration) }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="state.total"
      :current-page="state.page"
      :page-size="state.limit"
    ></el-pagination>
  </div>
</template>

<style scoped></style>
