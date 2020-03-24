<template>
  <div>
    <v-header left-text="返回"></v-header>
    <van-calendar v-model="show" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: true
      };
    }
  };
</script>
