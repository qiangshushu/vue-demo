<template>
  <div class="errorpage">
    <div class="notfound"></div>
  </div>
</template>

<style lang="scss" scoped>
  .errorpage {
    position: relative;
    width: 100%;
    height: 100%;
    background: #242537;
    .notfound {
      width: 100%;
      height: 100%;
      background: url('~@/assets/app/404.png') no-repeat center;
    }
    .goback {
      position: absolute;
      left: 800px;
      top: 720px;
      width: 80px;
      height: 32px;
      background: #f64205;
      color: #fff;
      border-radius: 8px;
    }
  }
</style>
