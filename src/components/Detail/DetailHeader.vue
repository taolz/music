<template>
  <Header class="header">
    <template v-slot:left>
      <div class="header-left" @click.stop="back"></div>
    </template>
    <template v-slot:center>
      <p class="header-title">{{ title }}</p>
    </template>
    <template v-slot:right>
      <div class="header-right"></div>
    </template>
  </Header>
</template>

<script>
import Header from '../Header/Header';
export default {
  name: 'SubHeader',
  components: {
    Header
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';
.header {
  .header-left {
    @include bg_img('~@/assets/images/back');
  }
  .header-right {
    @include bg_img('~@/assets/images/more');
  }
  .header-title {
    width: 60%;
    color: #fff;
    font-weight: bold;
    text-align: center;
    line-height: 100px;
    @include no-wrap();
    // @include font_size($font_medium);
    font-size: 28px;
  }
}
</style>