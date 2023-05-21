<script setup>
import { reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'

const state = reactive({
  query: ''
})
</script>

<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span
          @click="$router.replace('/')"
          class="iconfont icon-iceicon_home"
        ></span>
      </div>
      <div class="history-wrapper">
        <span @click="$router.go(-1)" class="iconfont icon-icearrowleft"></span>
        <span @click="$router.go(1)" class="iconfont icon-icearrowright"></span>
      </div>
    </div>
    <div class="right-box">
      <el-input
        :prefix-icon="Search"
        placeholder="搜索"
        v-model.trim="state.query"
      >
      </el-input>
    </div>
  </div>
</template>

<style scoped></style>
