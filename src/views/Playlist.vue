<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.query.id)
</script>

<template>
  <div>歌单详情</div>
</template>

<style scoped></style>
