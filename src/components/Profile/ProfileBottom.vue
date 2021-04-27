<template>
  <!-- 个人中心 - 播放列表 -->
  <div class="profileBottom">
    <div class="btnBox">
      <ul class="listPick">
        <li
          class="favorite"
          :class="{ active: switchNum === 0 }"
          @click="switchItem(0)"
        >
          我喜欢的
        </li>
        <li
          class="historylist"
          :class="{ active: switchNum === 1 }"
          @click="switchItem(1)"
        >
          历史记录
        </li>
      </ul>
      <div class="allPlay" @click="selectAllMusic">
        <span></span>
        <span>播放全部</span>
      </div>
    </div>
    <div class="songList" v-show="isShow">
      <ScrollView ref="scrollView">
        <SongListItem :songs="songs"></SongListItem>
      </ScrollView>
    </div>
    <div class="songList" v-show="!isShow">
      <ScrollView ref="scrollView">
        <SongListItem :songs="historyList"></SongListItem>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import ScrollView from '../common/ScrollView';
import SongListItem from '../Recommend/SongListItem';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'ProfileBottom',
  data () {
    return {
      switchNum: 0,
      isShow: true,
    }
  },
  components: {
    ScrollView,
    SongListItem
  },
  props: {
    songs: {
      type: Array,
      default: () => { },
      required: true
    },
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    selectAllMusic () {
      this.setFullScreen(true)
      let ids = this.songs.map((item) => {
        return item.ids
      })
      this.setSongDetail(ids)
    },
    switchItem (num) {
      this.switchNum = num
      this.isShow = !this.isShow
      if (num > 0) {
        this.$toast({
          message: `注意：【历史记录】只显示此次您在该设备上播放的最新 30 首`,
          duration: 800,
          position: top
        })
      } else {
        this.$toast({
          message: '注意：【我喜欢的】只显示您账号上收藏的其中 50 首',
          duration: 800,
          position: top
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'historyList'
    ])
  },
  created () {
    this.$toast({
      message: '注意：【我喜欢的】只显示您账号上最新收藏的50首 ',
      duration: 1800,
      position: top
    })
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';
.profileBottom {
  position: fixed;
  top: 500px;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .btnBox {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-size: 26px;
    font-weight: bold;
    @include font_color();
    .listPick {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      height: 70px;
      width: 300px;
      padding: 5px;
      border: 3px solid;
      border-radius: 30px;
      @include border_color();
      li {
        height: 100%;
        width: 100%;
        line-height: 54px;
        text-align: center;
        // &:nth-of-type(1) {
        //   border-right: 3px solid;
        //   @include border_color();
        // }
      }
      .active {
        border-radius: 20px;
        @include bg_color();
        // @include font_active_color();
        color: aliceblue;
      }
    }
    .allPlay {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 210px;
      border: 3px solid;
      @include border_color();
      border-radius: 30px;
      span {
        display: inline-block;
        &:nth-of-type(1) {
          width: 46px;
          height: 46px;
          @include bg_img('~@/assets/images/small_play');
        }
        &:nth-of-type(2) {
          @include font_color();
          @include font_size($font_medium_s);
        }
      }
    }
  }
  .songList {
    height: calc(100vh - 600px);
  }
}
</style>