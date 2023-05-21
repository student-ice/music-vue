<script setup></script>

<template>
  <div class="container">
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discover">
            <span class="iconfont icon-icediscover"></span>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlists">
            <span class="iconfont icon-icemusic-list"></span>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
            <span class="iconfont icon-icemusic"></span>
            最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/Mvs">
            <span class="iconfont icon-icebofangMV"></span>
            最新MV
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <router-view />
    </div>
    <div class="player">
      <audio ref="audioRef" controls autoplay loop></audio>
    </div>
  </div>
</template>

<style scoped></style>
