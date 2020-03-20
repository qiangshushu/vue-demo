<template>
  <div class="container-wrapper">
    <transition :name="transitionName">
      <router-view class="container"></router-view>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      transitionName: ''
    };
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.substr(1) ? to.path.substr(1).split('/').length : 0;
      const fromDepth = from.path.substr(1) ? from.path.substr(1).split('/').length : 0;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  },
  created() {
    this.reqGetLanguage();
  },
  methods: {
    ...mapActions('app', ['reqGetLanguage'])
  }
};
</script>

<style lang="scss">
.slide-left-enter,
.slide-right-leave-active {
  transform: translate(100%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  transform: translate(-100%, 0);
}
html,
body {
  background-color: #f3f3f3;
  font-family: '苹方', '微软雅黑', '宋体';
}

.container-wrapper {
  height: 100%;
}
</style>
