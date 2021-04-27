<template>
  <!-- 个人中心 - 用户信息 -->
  <div class="profileInfo">
    <div class="bg">
      <img :src="userInfo.backgroundUrl" alt="" class="bgImg" />
    </div>
    <div class="info">
      <div class="avatar">
        <img :src="userInfo.avatarUrl" alt="" />
      </div>
      <div class="userInfo">
        <p class="nickname">{{ userInfo.nickname }}</p>
        <p class="signature">{{ userInfo.signature }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileInfo',
  props: {
    userInfo: {
      type: Object,
      default: () => { },
      required: true
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';
.profileInfo {
  height: 500px;
  .bg {
    height: 500px;
    overflow: hidden;
    .bgImg {
      width: 100%;
      height: 500px;
      filter: blur(1px);
    }
  }
  .info {
    position: relative;
    top: -400px;
    .avatar {
      position: relative;
      left: 50%;
      transform: translate(-50%, 0);
      height: 150px;
      width: 150px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .userInfo {
      margin: 30px 0;
      p {
        margin: 10px 0;
        padding: 8px 0;
        font-size: 30px;
        font-weight: bold;
        text-align: center;
        @include font_color();
      }
      .signature {
        font-size: 20px;
      }
    }
  }
}
</style>