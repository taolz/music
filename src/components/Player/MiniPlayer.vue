<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="mini-player" v-show="isShowMiniPlayer">
      <div class="player-wrapper">
        <div class="player-left" @click="showNormalPlayer">
          <img :src="currentSong.picUrl" alt="" ref="miniplayer" />
          <div class="player-title">
            <h3>{{ currentSong.name }}</h3>
            <p>{{ currentSong.singer }}</p>
          </div>
        </div>
        <div class="player-right">
          <div class="play" @click="play" ref="play"></div>
          <div class="list" @click.stop="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui'
export default {
  name: 'MiniPlayer',
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
      'setIsPlaying',
      'setListPlayer'
    ]),
    showList () {
      this.setListPlayer('true')
    },
    showNormalPlayer () {
      this.setFullScreen(true);
      this.setMiniPlayer(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 500 }, function () {
        done()
      })
    },
    play () {
      this.setIsPlaying(!this.isPlaying)
    }
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlaying',

      'isShowListPlayer',
      'currentSong'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
        this.$refs.miniplayer.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
        this.$refs.miniplayer.classList.remove('active')
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 130px;
  .player-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    @include bg_color();
    .player-left {
      display: flex;
      padding-left: 30px;
      width: 50%;
      img {
        animation: sport 10s linear infinite paused;
        &.active {
          animation-play-state: running;
        }
        height: 100px;
        width: 100px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .player-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
          font-size: 30px;
          @include font_color();
        }
        p {
          font-size: 26px;
          @include font_color();
        }
      }
    }
    .player-right {
      display: flex;
      align-items: center;
      .play {
        width: 75px;
        height: 75px;
        @include bg_img('../../assets/images/play');
        &.active {
          @include bg_img('../../assets/images/pause');
        }
      }
      .list {
        width: 100px;
        height: 100px;
        @include bg_img('../../assets/images/list');
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