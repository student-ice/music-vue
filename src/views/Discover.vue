<script setup>
import { reactive, onMounted } from "vue";
import { getBannerList } from "../api/discover.js";

const state = reactive({
    //轮播图
    banners: []
})

const getData = async () => {
    const result_1 = await getBannerList()

    state.banners = result_1
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
  </div>
</template>

<style scoped>

</style>