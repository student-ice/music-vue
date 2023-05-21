<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, watch, ref } from 'vue'
import {
  mvUrl,
  simiMV,
  hotComments,
  newComments,
  mvDetail,
  artistInfo
} from '../api/mv.js'
import { formatCount, formatTime, formatDuration } from '../utils/filters.js'

const route = useRoute()
const router = useRouter()
console.log(route.query.id)

const state = reactive({
  //歌曲加载失败展示的默认图片
  defaultImageUrl:
    'http://81.70.119.233/wp-content/uploads/2023/04/cropped-微信图片_20230329144827.jpg',
  // mv地址
  mvUrl: '',
  simiMV: [],
  // 热门评论
  hotComments: [],
  // 普通评论
  comments: [],
  // 分页相关数据
  // 每页数据
  limit: 5,
  // 页码
  page: 1,
  // 总条数
  total: 0,
  // mv的名字
  mvName: '',
  // 播放次数
  playCount: '',
  // 发布时间
  publishTime: '',
  // 描述
  desc: '',
  // 歌手名
  artistName: '',
  // 封面
  artistCover: ''
})

// 获取热门评论
const getHotComments = async () => {
  const res = await hotComments(route.query.id)
  state.hotComments = res.hotComments
}
// 获取最新评论
const getNewComments = () => {
  const id = route.query.id
  newComments(id, (state.page - 1) * state.limit, state.limit).then((res) => {
    // window.console.log(res)
    state.comments = res.comments
    state.total = res.total
  })
}
// 获取信息
const getInfo = async () => {
  const id = route.query.id
  mvUrl(id).then((res) => {
    //console.log(res.data.url)
    state.mvUrl = res.data.url
  })
  simiMV(id).then((res) => {
    // window.console.log(res)
    state.simiMV = res.mvs
  })
  // 获取热门评论
  getHotComments()
  // 获取最新评论
  getNewComments()
  // 获取MV详情
  mvDetail(id).then((res) => {
    state.mvName = res.data.name
    state.playCount = res.data.playCount
    state.publishTime = res.data.publishTime
    state.desc = res.data.desc
    artistInfo(res.data.artistId).then((res) => {
      // 歌手名
      state.artistName = res.artist.name
      state.artistCover = res.artist.picUrl
    })
  })
}

onMounted(() => {
  getInfo()
})

// 页码改变
const handleCurrentChange = (val) => {
  state.page = val
  getNewComments()
}

// 监听路由变化
watch(
  () => route.query.id,
  () => {
    getInfo()
  }
)

// 切换mv
const toMV = (id) => {
  router.push({
    path: '/mv',
    query: {
      id: id
    }
  })
}

function setDefaultImage(event) {
  event.target.src = state.defaultImageUrl
}
</script>

<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls ref="video" :src="state.mvUrl"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="state.artistCover" alt />
          </div>
          <span class="name">{{ state.artistName }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ state.mvName }}</h2>
          <span class="date">发布：{{ state.publishTime }}</span>
          <span class="number">播放：{{ formatCount(state.playCount) }}次</span>
          <p class="desc">{{ state.desc }}</p>
        </div>
      </div>
      <!-- 热门评论 -->
      <div v-if="state.hotComments.length !== 0" class="comment-wrap">
        <p class="title">
          热门评论
          <span class="number">({{ state.hotComments.length }})</span>
        </p>
        <div
          class="comments-wrap"
          v-for="item in state.hotComments"
          :key="item.commentId"
        >
          <div class="item">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" @error="setDefaultImage" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div v-if="item.beReplied.length !== 0" class="re-content">
                <span class="name"
                  >{{ item.beReplied[0].user.nickname }}：</span
                >
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ formatTime(item.time) }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <!-- 最新评论 -->
      <div class="comment-wrap" v-if="state.comments.length !== 0">
        <p class="title">
          最新评论
          <span class="number">({{ state.total }})</span>
        </p>
        <div class="comments-wrap">
          <div
            class="item"
            v-for="item in state.comments"
            :key="item.commentId"
          >
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div v-if="item.beReplied.length !== 0" class="re-content">
                <span class="name"
                  >{{ item.beReplied[0].user.nickname }}：</span
                >
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ formatTime(item.time) }}</div>
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
        :current-page="state.page"
        :page-size="5"
      ></el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items" v-for="item in state.simiMV" :key="item.id">
          <div class="item" @click="toMV(item.id)">
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
      </div>
    </div>
  </div>
</template>
