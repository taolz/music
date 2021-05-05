<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'ScrollView',
  props: {
    probeType: {
      type: Number,
      default: 3
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      // 外部传过来的数据，主要是监听数据的变化，刷新容器的计算
      type: Array,
      default: null
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    this.$nextTick(this.initScroll())
  },
  methods: {
    initScroll () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        observeDOM: true,
        observeImage: true,
        scrollX: false,
        scrollY: true,
        tap: true,
        mouseWheel: true
      })
    },
    // 作用：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo (x, y, time) {
      this.scroll.scrollTo(x, y, time)
    },
    // 监听滚动距离
    scrolling (fn) {
      this.scroll.on('scroll', function () {
        fn(this.y)
      })
    }
  },
  beforeDestroy () {
    this.scroll.destroy()
  }
}
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
