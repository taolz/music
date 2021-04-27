<template>
  <swiper :options="swiperOptions" class="banner">
    <swiper-slide class="cd">
      <div class="cd-wrapper" ref="cdWrapper">
        <img :src="currentSong.picUrl" alt="" />
      </div>
      <p>{{ getFirstLyric() }}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyric">
      <scroll-view ref="scrollView">
        <ul>
          <li
            v-for="(value, key) in currentLyric"
            :key="key"
            :class="{ active: currentLineNum === key }"
          >
            {{ value }}
          </li>
        </ul>
      </scroll-view>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import ScrollView from '../common/ScrollView';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'PlayerMiddle',
  data () {
    return {
      swiperOptions: {
        // 分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      currentLineNum: '0'
    }
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    },
  },
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'currentLyric'
    ])
  },
  methods: {
    getFirstLyric () {
      for (const key in this.currentLyric) {
        return this.currentLyric[key]
      }
    },
    getActiveLineNum (lineNum) {
      // 解决点击进度条，歌词不同步
      if (lineNum < 0) {
        return this.currentLineNum
      }
      let reslut = this.currentLyric[lineNum] // 当前时间是否有歌词
      if (reslut === undefined || reslut === '') {
        lineNum--
        return this.getActiveLineNum(lineNum)
      } else {
        return lineNum + ''
      }
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWrapper.classList.add('active')
      } else {
        this.$refs.cdWrapper.classList.remove('active')
      }
    },
    currentTime (newValue, oldValue) {
      // 高亮歌词
      let lineNum = Math.floor(newValue)
      this.currentLineNum = this.getActiveLineNum(lineNum)
      // 歌词滚动
      let currentLyricTop = document.querySelector('.lyric .active').offsetTop
      let lyricHeight = this.$refs.lyric.$el.offsetHeight
      if (currentLyricTop > lyricHeight / 2) {
        this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 100)
      }
    },
    currentLyric (newValue, oldValue) {
      for (const key in newValue) {
        this.currentLineNum = key
        return
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';
.banner {
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .cd {
    .cd-wrapper {
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #fff;
      overflow: hidden;
      animation: sport 10s linear infinite paused;
      &.active {
        animation-play-state: running;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      text-align: center;
      // @include font_size($font_medium);
      @include font_color();
      margin-top: 50px;
      font-size: 26px;
    }
  }
  .lyric {
    li {
      text-align: center;
      font-size: 28px;
      &:last-of-type {
        padding-bottom: 60%;
      }
      &.active {
        color: #fff;
        font-size: 34px;
        font-weight: bold;
        // padding: 5px 0;
      }
    }
  }
}
@keyframes sport {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
<style lang="scss">
@import '@/assets/css/mixin';
.my-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #fff;
  margin: 0 15px;
}
.my-bullet-active {
  width: 60px;
  @include bg_color();
}
</style>