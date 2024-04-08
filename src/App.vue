<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  
<!-- 相当于之歌占位符，这个位置显示什么内容，暂时还不确定，要根据浏览器地址栏来决定，而浏览器地址栏的地址和页面之间的映射关系，则定义在路由文件中 -->
  <RouterView />
</template>

