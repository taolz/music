<template>
  <Header class="header">
    <template v-slot:left>
      <div class="header-left" @click.stop="goHome"></div>
    </template>
    <template v-slot:center>
      <p class="header-title">云音乐</p>
    </template>
    <template v-slot:right>
      <div class="header-right" @click.stop="loginAccount"></div>
    </template>
  </Header>
</template>

<script>
import { getLocalStorage } from '../../tools/tools'
import Header from './Header'
export default {
  name: 'MainHeader',
  components: {
    Header
  },
  methods: {
    goHome () {
      if (this.$route.name === 'Recommend') {
        return
      }
      this.$router.push('/recommend')
    },
    loginAccount () {
      const res = getLocalStorage('userInfo') ?? false
      if (res) {
        const userId = getLocalStorage('userInfo').userId
        this.$router.push({ path: `/profile/${userId}` })
      } else {
        this.$router.push('/account')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';
.header {
  .header-left {
    @include bg_img('~@/assets/images/logo');
  }
  .header-right {
    @include bg_img('~@/assets/images/account');
  }
  .header-title {
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include font_size($font_large);
  }
}
</style>
