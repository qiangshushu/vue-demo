<template>
  <van-nav-bar :title="title" :left-text="leftText" :right-text="rightText" :left-arrow="leftArrow" @click-left="onClickLeft" @click-right="onClickRight" />
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '标题'
      },
      leftText: {
        type: String
      },
      rightText: {
        type: String
      },
      leftArrow: {
        type: Boolean,
        default: false
      },
      onClickRight: {
        type: Function,
        default: () => { }
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      }
    }
  };
</script>