<template>
  <div>
    <van-calendar v-model="show" @confirm="onConfirm" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: true
      };
    }
  }
</script>
