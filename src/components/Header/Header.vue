<template>
  <div class="header" @click="changeTheme">
    <div class="left">
      <slot name="left">left</slot>
    </div>
    <slot name="center">center</slot>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    changeTheme () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      // 设置自定义属性
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  @include bg_color();
  .left,
  .right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
    * {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
