<script setup>
import { onMounted, reactive, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { formatCount } from '../utils/filters.js'
import { allMvs } from '../api/mvs.js'

const router = useRouter()
const state = reactive({
  //歌曲加载失败展示的默认图片
  defaultImageUrl:
    'http://81.70.119.233/wp-content/uploads/2023/04/cropped-微信图片_20230329144827.jpg',
  area: '全部',
  type: '全部',
  order: '上升最快',
  // 每页数据
  limit: 12,
  // 页码
  page: 1,
  // 总条数
  total: 0,
  // mv列表数据
  mvList: []
})

// 页码改变
const handleCurrentChange = (val) => {
  state.page = val
  getData()
}

const getData = () => {
  const { area, type, order, limit } = state
  allMvs({
    area,
    type,
    order,
    offset: (state.page - 1) * state.limit,
    limit
  }).then((res) => {
    state.mvList = res.data
    if (res.count) {
      state.total = res.count
    }
    //console.log(state.mvList)
  })
}

onMounted(() => {
  getData()
})

const toMv = (id) => {
  router.push({
    path: '/mv',
    query: {
      id: id
    }
  })
}

watchEffect(
  () => {
    state.page = 1
    getData()
  },
  {
    flush: 'sync',
    // 监听state中的area, type, order属性
    onTrack: (event) => {
      if (
        event.key === 'area' ||
        event.key === 'type' ||
        event.key === 'order'
      ) {
        console.log(`state.${event.key} has been accessed during the effect`)
      }
    }
  }
)

function setDefaultImage(event) {
  event.target.src = state.defaultImageUrl
}
</script>

<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: state.area === '全部' }"
              @click="state.area = '全部'"
              >全部</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: state.area === '内地' }"
              @click="state.area = '内地'"
              >内地</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: state.area === '港台' }"
              @click="state.area = '港台'"
              >港台</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: state.area === '欧美' }"
              @click="state.area = '欧美'"
              >欧美</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: state.area === '日本' }"
              @click="state.area = '日本'"
              >日本</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: state.area === '韩国' }"
              @click="state.area = '韩国'"
              >韩国</span
            >
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: state.type === '全部' }"
              @click="state.type = '全部'"
              >全部</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: state.type === '官方版' }"
              @click="state.type = '官方版'"
              >官方版</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: state.type === '原声' }"
              @click="state.type = '原声'"
              >原声</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: state.type === '现场版' }"
              @click="state.type = '现场版'"
              >现场版</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: state.type === '网易出品' }"
              @click="state.type = '网易出品'"
              >网易出品</span
            >
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: state.order === '上升最快' }"
              @click="state.order = '上升最快'"
              >上升最快</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: state.order === '最热' }"
              @click="state.order = '最热'"
              >最热</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: state.order === '最新' }"
              @click="state.order = '最新'"
              >最新</span
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div
          v-for="item in state.mvList"
          :key="item.id"
          class="item"
          @click="toMv(item.id)"
        >
          <div class="img-wrap">
            <img :src="item.cover" @error="setDefaultImage" alt />
            <div class="num-wrap">
              <div class="iconfont icon-iceplay"></div>
              <div class="num">{{ formatCount(item.playCount) }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artisetName }}</div>
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
  </div>
</template>

<style scoped></style>
