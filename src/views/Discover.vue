<script setup>
import { reactive, onMounted } from "vue";
import { getBannerList,getRecommendlist } from "../api/discover.js";

const state = reactive({
    //轮播图
    banners: [],
    //歌单
    playList: []
})

const getData = async () => {
    const result_1 = await getBannerList()
    const result_2 = await getRecommendlist()

    state.banners = result_1
    state.playList = result_2
    console.log(state.playList)
}

onMounted(() => {
    getData()
})
</script>

<template>
  <div class="discover-container">
    <!--轮播图-->
    <el-carousel :interval="4000">
      <el-carousel-item v-for="(item,index) in state.banners.banners" :key="index">
        <img :src="item.imageUrl" alt=""/>
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
  </div>
</template>

<style scoped>

</style>