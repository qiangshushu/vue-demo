<template>
  <div>
    <button @click="show = true">打开</button>
    <div class="slider" :class="{active: show}">
      asdf
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      };
    }
  };
</script>


<style lang="less" scoped>
  .slider {
    background-color: red;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(100%);
    transition: all 0.3s;
    &.active {
      transform: translateX(0);
    }
  }
</style>

