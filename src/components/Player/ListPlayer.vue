<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="list-player" v-show="this.isShowListPlayer">
      <div class="player-wrapper">
        <div class="player-top">
          <div class="top-left">
            <div class="mode loop" ref="mode" @click="mode"></div>
            <p v-if="this.modeType === 0">顺序播放</p>
            <p v-else-if="this.modeType === 1">单曲循环</p>
            <p v-else>随机播放</p>
          </div>
          <div class="top-right">
            <div class="del" @click="delAll"></div>
          </div>
        </div>
        <div class="player-middle">
          <ScrollView ref="scrollView">
            <ul ref="play">
              <li
                class="item"
                v-for="(value, index) in songs"
                :key="value.id"
                @click="selectMusic(index)"
              >
                <div class="item-left">
                  <div class="play" ref="play"></div>
                  <p>{{ value.name }}</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite"></div>
                  <div class="item-del" @click="del(index)"></div>
                </div>
              </li>
            </ul>
          </ScrollView>
        </div>
        <div class="player-bottom">
          <p @click.stop="hidden">关闭</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ScrollView from '../common/ScrollView';
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui'
import { mapActions, mapGetters } from 'vuex';
import modeType from "../../store/modeType";

export default {
  name: 'ListPlayer',
  components: {
    ScrollView,
  },
  methods: {
    ...mapActions([
      'setModeType',
      'setListPlayer',
      'setDelSong',
      'setCurrentIndex'
    ]),
    mode () {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random)
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop)
      }
    },
    hidden () {
      this.setListPlayer(false)
    },
    del (index) {
      this.setDelSong(index)
    },
    delAll () {
      this.setDelSong()
    },
    selectMusic (index) {
      this.setCurrentIndex(index)
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
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'isShowListPlayer',
      'modeType',
      'songs'
    ])
  },
  watch: {
    /*
    isPlaying (newValue, oldValue) {
        if (newValue) {
          this.$refs.play.classList.add('active')
        } else {
          this.$refs.play.classList.remove('active')
        }
      },
      */
    modeType (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    },
    isShowListPlayer (newValue, oldValue) {
      if (newValue) {
        this.$refs.scrollView.refresh()
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.list-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  // @include bg_sub_color();
  background-color: #dcdcdc;
  .player-wrapper {
    .player-top {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left {
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode {
          width: 56px;
          height: 56px;
          margin-right: 20px;
          &.loop {
            @include bg_img('../../assets/images/loop');
          }
          &.one {
            @include bg_img('../../assets/images/one');
          }
          &.random {
            @include bg_img('../../assets/images/shuffle');
          }
        }
        p {
          font-size: 28px;
          @include font_color();
        }
      }
      .top-right {
        .del {
          width: 84px;
          height: 84px;
          @include bg_img('../../assets/images/small_del');
        }
      }
    }
    .player-middle {
      height: 700px;
      overflow: hidden;
      .item {
        height: 100px;
        border-top: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left {
          width: 70%;
          display: flex;
          align-items: center;
          .play {
            width: 56px;
            height: 56px;
            margin-right: 20px;
            @include bg_img('../../assets/images/play');
            &.active {
              @include bg_img('../../assets/images/pause');
            }
          }
          p {
            width: 80%;
            font-size: 26px;
            @include font_color();
            @include no-wrap();
          }
        }
        .item-right {
          display: flex;
          align-items: center;
          .item-favorite {
            width: 56px;
            height: 56px;
            @include bg_img('../../assets/images/favorite');
          }
          .item-del {
            width: 52px;
            height: 52px;
            margin-left: 20px;
            @include bg_img('../../assets/images/small_close');
          }
        }
      }
    }
    .player-bottom {
      width: 100%;
      height: 100px;
      line-height: 100px;
      @include bg_color();
      p {
        text-align: center;
        color: #fff;
        font-size: 28px;
      }
    }
  }
}
</style>