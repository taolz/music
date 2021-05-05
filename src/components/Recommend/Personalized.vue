<template>
  <div class="personalized">
    <div class="personalized-top">
      <h3>{{ title }}</h3>
    </div>
    <div class="personalized-list">
      <div
        class="item"
        v-for="item in personalized"
        :key="item.id"
        @click="selectItem(item.id)"
      >
        <img v-lazy="item.picUrl" alt="" />
        <p class="playCount" v-show="isShow">
          {{ '▶  ' + formatNumber(item.playCount) }}
        </p>
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Personalized',
  data () {
    return {
      isShow: true
    }
  },
  props: {
    personalized: {
      type: Array,
      default: () => [],
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    /* 判断是哪个在调用 */
    type: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    selectItem (id) {
      this.$emit('select', id, this.type)
    },
    // 格式化播放量
    formatNumber (num) {
      num = Number(num)
      if (!num) {
        this.isShow = false
      } else if (num >= 0 && num < 10000) {
        return num
      } else if (num >= 10000 && num < 100000000) {
        return Math.trunc(num / 10000) + ' 万'
      } else {
        const numb = (Math.trunc(num / 1000000)) / 100
        return numb + ' 亿'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/variable';
.personalized {
  @include bg_sub_color();
  .personalized-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
    padding: 10px 20px 0;
    h3 {
      @include font_size($font_large);
      position: relative;
      font-weight: bold;
      @include font_color();
      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 50%;
        right: 50px;
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        margin-top: -10px;
        color: transparent;
        border-top: 4px solid #666;
        border-right: 4px solid #666;
        transform: rotate(45deg);
      }
    }
  }
  .personalized-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    .item {
      position: relative;
      width: 200px;
      padding: 20px 0 10px;
      img {
        width: 200px;
        height: 200px;
        border-radius: 20px;
      }
      p {
        @include clamp(2);
        @include font_color();
        @include font_size($font_medium_s);
        text-align: center;
        margin-top: 10px;
      }
      .playCount {
        box-sizing: border-box;
        position: absolute;
        top: 5px;
        right: 5px;
        margin-top: 20px;
        padding: 5px 10px 5px;
        color: #fff;
        font-size: 20px;
        background: rgba($color: #666, $alpha: 0.4);
        border-radius: 10px;
      }
    }
  }
}
</style>
