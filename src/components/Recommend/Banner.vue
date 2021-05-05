<template>
  <swiper :options="swiperOptions" class="banner">
    <swiper-slide v-for="item in banners" :key="item.bannerId" class="item">
      <div v-if="item.url === undefined" @click="selectMusic(item.id)">
        <img :src="item.pic" alt="" />
        <span
          class="typeTitle"
          :style="{ 'background-color': item.titleColor }"
        >
          {{ item.typeTitle }}
        </span>
      </div>
      <a :href="item.url" v-else>
        <img :src="item.pic" alt="" />
        <span
          class="typeTitle"
          :style="{ 'background-color': item.titleColor }"
        >
          {{ item.typeTitle }}
        </span>
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/css/swiper.css'
import { mapActions } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Banner',
  data () {
    return {
      swiperOptions: {
        loop: true, // 循环
        autoplay: {
          delay: 1800,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 分页器
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    selectMusic (id) {
      this.setFullScreen(true)
      this.setSongDetail([id])
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  .item {
    img {
      position: relative;
      width: 100%;
      height: 300px;
    }
    .typeTitle {
      position: absolute;
      right: 0;
      bottom: 0;
      // width: 105px;
      // width: 100%;
      // height: 36px;
      // line-height: 36px;
      padding: 7px 15px 7px 20px;
      border-top-left-radius: 20px;
      text-align: center;
      color: #fff;
      font-size: 20px;
      font-weight: 700;
    }
  }
}
</style>
<style lang="scss">
@import '@/assets/css/mixin';
.banner {
  .swiper-pagination-bullet {
    height: 14px;
    width: 14px;
    background: #fff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    @include bg_color();
  }
}
</style>
