<template>
  <div>
    {{ $t('lang') }}
    <van-calendar v-model="show" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },
  created() {
    this.$toast.loading({ message: 'closeOnClick', forbidClick: true, duration: 0 });
    setTimeout(() => {
      this.$toast.clear();
    }, 2000);
  }
};
</script>
