<template>
  <div class="index pt">
    <v-header title="目录"></v-header>
    <div class="content">
      <ul>
        <router-link v-for="(item, index) in catalog" tag="li" :to="{name: item.path}" :key="index">{{index + 1}} - {{item.title}}</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        catalog: [{
          title: '五子棋',
          path: 'checkerboard'
        }]
      };
    }
  };
</script>

<style lang="less" scoped>
  ul {
    padding: 20px;
    li {
      padding: 20px 0;
    }
  }
</style>

