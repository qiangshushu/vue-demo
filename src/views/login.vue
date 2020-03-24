<template>
  <div>
    <v-header right-text="注册" :onClickRight="handleClickRight"></v-header>
    <van-dropdown-menu>
      <van-dropdown-item v-model="lang" :options="option" @change="hanldeLanguageChange" />
    </van-dropdown-menu>
    <button @click="handleLogin">{{$t('login')}}</button>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  export default {
    data() {
      return {
        lang: 'en',
        option: [
          { text: '中文', value: 'zh' },
          { text: 'English', value: 'en' }
        ]
      };
    },
    computed: {
      ...mapState('app', ['language'])
    },
    watch: {
      language: {
        immediate: true,
        handler(val) {
          this.lang = val;
        }
      }
    },
    methods: {
      ...mapActions('app', ['login', 'reqSetLanguage']),
      handleLogin() {
        this.login({ vm: this, username: 'username', password: 'password' });
      },
      hanldeLanguageChange() {
        this.reqSetLanguage(this.lang);
      },
      handleClickRight() {
        this.$toast('注册');
      }
    }
  };
</script>
