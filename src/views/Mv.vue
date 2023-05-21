<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.query.id)
</script>

<template>
  <div>MV详情</div>
</template>

<style scoped></style>
