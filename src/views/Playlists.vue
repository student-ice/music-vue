<script setup>
import { highquality, topList } from '../api/playlists.js'
import { onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { formatCount } from '../utils/filters.js'

const router = useRouter()
const state = reactive({
  //歌曲加载失败展示的默认图片
  defaultImageUrl:
    'http://81.70.119.233/wp-content/uploads/2023/04/cropped-微信图片_20230329144827.jpg',
  // 歌单分类
  cat: '全部',
  // 顶部的标题
  listName: '',
  // 顶部的描述
  listDesc: '',
  // 顶部的封面
  listCover: '',
  // 总条数
  total: 0,
  // 页码
  page: 1,
  // 歌单列表
  playList: []
})

// 去歌单详情页面
const toPlayList = (id) => {
  router.push({
    path: '/playlist',
    query: {
      id: id
    }
  })
}
// 获取歌单信息
const getData = () => {
  highquality({ cat: state.cat }).then((res) => {
    if (res.playlists.length !== 0) {
      state.listName = res.playlists[0].name
      state.listDesc = res.playlists[0].description
      state.listCover = res.playlists[0].coverImgUrl
    } else {
      state.listName = ''
    }
  })
  // 底部的歌单信息
  topList({
    cat: state.cat,
    offset: (state.page - 1) * 10
  }).then((res) => {
    state.playList = res.playlists
    state.total = res.total
    //console.log(state.playList)
    //console.log(state.total)
  })
}

const handleCurrentChange = (val) => {
  state.page = val
  getData()
}

onMounted(() => {
  getData()
})
watch(
  () => state.cat,
  (newValue, oldValue) => {
    state.page = 1
    getData()
  }
)
function setDefaultImage(event) {
  event.target.src = state.defaultImageUrl
}
</script>

<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card" v-if="state.listName">
      <div class="icon-wrap">
        <img :src="state.listCover" alt />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">{{ state.listName }}</div>
        <div class="info">{{ state.listDesc }}</div>
      </div>
      <img :src="state.listCover" alt class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span
          class="item"
          :class="{ active: state.cat === '全部' }"
          @click="state.cat = '全部'"
          >全部</span
        >
        <span
          class="item"
          :class="{ active: state.cat === '欧美' }"
          @click="state.cat = '欧美'"
          >欧美</span
        >
        <span
          class="item"
          :class="{ active: state.cat === '华语' }"
          @click="state.cat = '华语'"
          >华语</span
        >
        <span
          class="item"
          :class="{ active: state.cat === '流行' }"
          @click="state.cat = '流行'"
          >流行</span
        >
        <span
          class="item"
          :class="{ active: state.cat === '说唱' }"
          @click="state.cat = '说唱'"
          >说唱</span
        >
        <span
          class="item"
          :class="{ active: state.cat === '摇滚' }"
          @click="state.cat = '摇滚'"
          >摇滚</span
        >
        <span
          class="item"
          :class="{ active: state.cat === '民谣' }"
          @click="state.cat = '民谣'"
          >民谣</span
        >
        <span
          class="item"
          :class="{ active: state.cat === '电子' }"
          @click="state.cat = '电子'"
          >电子</span
        >
        <span
          class="item"
          :class="{ active: state.cat === '轻音乐' }"
          @click="state.cat = '轻音乐'"
          >轻音乐</span
        >
        <span
          class="item"
          :class="{ active: state.cat === '影视原声' }"
          @click="state.cat = '影视原声'"
          >影视原声</span
        >
        <span
          class="item"
          :class="{ active: state.cat === 'ACG' }"
          @click="state.cat = 'ACG'"
          >ACG</span
        >
        <span
          class="item"
          :class="{ active: state.cat === '怀旧' }"
          @click="state.cat = '怀旧'"
          >怀旧</span
        >
        <span
          class="item"
          :class="{ active: state.cat === '治愈' }"
          @click="state.cat = '治愈'"
          >治愈</span
        >
        <span
          class="item"
          :class="{ active: state.cat === '旅行' }"
          @click="state.cat = '旅行'"
          >旅行</span
        >
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in state.playList"
            :key="index"
            @click="toPlayList(item.id)"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ formatCount(item.playCount) }}</span>
              </div>
              <img :src="item.coverImgUrl" @error="setDefaultImage" alt />
              <span class="iconfont icon-iceplay"></span>
            </div>
            <p class="name">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="state.total"
      :page-size="10"
      :current-page="state.page"
    ></el-pagination>
  </div>
</template>

<style scoped></style>
