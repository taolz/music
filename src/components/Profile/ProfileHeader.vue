<template>
  <!-- 个人中心 - 头部 -->
  <div class="profileHeader">
    <Header class="header">
      <template #left>
        <div class="header-left" @click.stop="goHome"></div>
      </template>
      <template #center>
        <p class="header-title">个人中心</p>
      </template>
      <template #right>
        <div class="header-right" @click.stop.self="loginOut">
          <van-action-sheet
            v-model="show"
            :actions="actions"
            cancel-text="取消"
            round
            @select="onSelect"
            @cancel="toCancel"
            @click-overlay="toClickOverlay"
            close-on-click-action
            :class="{ addmgb: active }"
          />
        </div>
      </template>
    </Header>
  </div>
</template>

<script>
import Header from '../Header/Header';
import { removeLocalStorage } from '../../tools/tools';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ProfileHeader',
  components: {
    Header,
  },
  data () {
    return {
      active: false,
      show: false,
      actions: [{
        name: '退出账号',
        subname: '将账号从此设备登出'
      }],
    }
  },
  methods: {
    ...mapActions([
      'setMiniPlayer'
    ]),
    goHome () {
      this.$router.push({ name: 'Recommend' })
    },
    loginOut () {
      // .stop.self ??
      this.show = true
    },
    onSelect (item) {
      removeLocalStorage('userInfo')
      removeLocalStorage('cookie')
      this.show = false;
      this.$toast({
        message: '已退出，正在跳转',
        duration: 500
      })
      this.$router.push({ name: 'Recommend' })
    },
    toCancel () {
      this.show = false

    },
    toClickOverlay () {
      this.show = false
    }
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer'
    ])
  },
  watch: {
    show (newValue, oldValue) {
      // 当动作面板和miniplayer同时开启时
      if (newValue && this.isShowMiniPlayer) {
        this.active = true
      } else {
        this.active = false

      }

    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';
.profileHeader {
  .header {
    .header-left {
      @include bg_img('~@/assets/images/back');
    }
    .header-right {
      @include bg_img('~@/assets/images/more');
    }
    .header-title {
      color: #fff;
      line-height: 100px;
      font-weight: bold;
    }
  }
}
.addmgb {
  margin-bottom: 130px;
}
// 特殊
button.van-action-sheet__item {
  font-weight: bold;
  @include font_color();
  @include font_size($font_medium);
  @include bg_sub_color();
  height: 100px;
}
button.van-action-sheet__cancel {
  font-weight: bold;
  @include font_color();
  @include font_size($font_medium);
  @include bg_sub_color();
  height: 70px;
}
</style>