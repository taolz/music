<template>
  <transition appear>
    <div class="account">
      <Header class="header">
        <template #left>
          <div class="header-left" @click.stop="back"></div>
        </template>
        <template #center><p class="title">登录</p></template>
      </Header>
      <div class="login">
        <div class="login-wrapper">
          <div class="left-top-login">LOGIN</div>
          <div class="welcome">欢迎回来！</div>
        </div>
        <div class="input-content">
          <div class="input-item">
            <label class="title" for="account">账号</label>
            <input
              type="tel"
              id="account"
              placeholder="请输入手机号码"
              v-model="account"
            />
          </div>
          <div class="input-item">
            <label class="title" for="password">密码</label>
            <input
              type="password"
              id="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </div>
        </div>
        <div class="btn-box">
          <a href="javascript:;" class="btn" @click="login">
            <p>登录</p>
          </a>
          <p class="tip">tips: 请使用手机号码登录</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Header from '../components/Header/Header'
import { accoutLogin } from '../api/index'
import { setLocalStorage, getLocalStorage } from '../tools/tools'
export default {
  name: 'Account',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  components: {
    Header
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    async login () {
      this.$toast.className = 'toast'
      const { account, password } = this
      // 前端验证
      const phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (!account) {
        this.$toast.fail('手机号码不能为空')
      } else if (!phoneReg.test(account)) {
        this.$toast.fail('手机号码格式不正确')
      } else if (!password) {
        this.$toast.fail('密码不能为空')
      }

      const result = await accoutLogin({ phone: account, password: password })
      if (result.code === 200) {
        this.$toast.success('登录成功，正在跳转')
        setLocalStorage('userInfo', result.profile)
        setLocalStorage('cookie', result.cookie)

        const userId = getLocalStorage('userInfo').userId
        this.$router.push({ path: `/profile/${userId}` })
      } else {
        this.$toast.fail('账号或密码错误')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';
.account {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  .header {
    .header-left {
      @include bg_img('~@/assets/images/back');
    }
    .title {
      line-height: 100px;
      color: #fff;
      font-weight: bold;
    }
  }
  .login {
    .login-wrapper {
      margin: 100px 0;
      .left-top-login {
        font-size: 120px;
        // color: #f8f8f8;
        color: rgba(90, 90, 90, 0.1);
        position: relative;
        left: -12px;
        top: 20px;
      }
      .welcome {
        position: relative;
        top: -50px;
        left: 50px;
        font-size: 46px;
      }
    }
    .input-content {
      padding: 0 60px;
      .input-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: 0 30px;
        margin-bottom: 50px;
        background: #f8f6fc;
        height: 120px;
        border-radius: 12px;
        .title {
          height: 50px;
          width: 100%;
          line-height: 56px;
          font-size: 30px;
          font-weight: bold;
          color: #606266;
        }
        input {
          font-size: 30px;
          height: 60px;
          border: 0px;
          background: #f8f6fc;
          width: 100%;
        }
      }
    }
    .btn {
      display: flex;
      margin: 0 70px;
      height: 80px;
      line-height: 80px;
      border-radius: 40px;
      @include bg_color;
      p {
        margin: 0 auto;
        color: #fff;
        font-size: 32px;
        font-weight: bold;
      }
    }
    .tip {
      margin-top: 50px;
      text-align: center;
    }
  }
}
.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 1s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 1s;
}
</style>
