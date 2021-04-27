<template>
  <div class="rank">
    <div class="rank-wrapper">
      <ScrollView>
        <ul class="scrollViewwrapper">
          <li>
            <h3 class="group-title">官方榜</h3>
            <ul class="normal-group">
              <li
                v-for="item in aRankInfo"
                :key="item.id"
                @click.stop="selectedItem(item.id)"
              >
                <div class="rank-left">
                  <img v-lazy="item.coverImgUrl" alt="" />
                  <p>04-21</p>
                </div>
                <div class="rank-right">
                  <p v-for="obj in item.songs" :key="obj.id">
                    {{ obj.index }}. {{ obj.name }} - {{ obj.singer }}
                  </p>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <h3 class="group-title">全球榜</h3>
            <ul class="other-group">
              <li
                v-for="item in bRankInfo"
                :key="item.id"
                @click.stop="selectedItem(item.id)"
              >
                <div class="rank-top">
                  <img v-lazy="item.coverImgUrl" alt="" />
                  <p>04-21</p>
                </div>
                <div class="rank-bottom">
                  <p>{{ item.name }}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ScrollView from "../components/common/ScrollView";
import { getRankId, getPlayList } from "../api/index";
export default {
  name: "Rank",
  components: {
    ScrollView
  },
  data () {
    return {
      aRankInfo: [],
      bRankInfo: []
    };
  },
  methods: {
    selectedItem (id) {
      this.$router.push(`/rank/detail/${id}/rank`)
    }
  },
  mounted () {
    getRankId()
      .then(res => {
        res.slice(0, 4).forEach(element => {
          getPlayList({ id: element }).then(res => {
            let item = {};
            item.id = res.playlist.id;
            item.coverImgUrl = res.playlist.coverImgUrl;
            item.updateTime = res.playlist.updateTime;
            let songs = [];
            res.playlist.tracks.slice(0, 3).forEach((ele, index) => {
              let songItem = {};
              songItem.index = index + 1;
              songItem.name = ele.name;
              songItem.id = ele.id;
              songItem.singer = ele.ar[0].name;
              songs.push(songItem);
            });
            item.songs = songs;
            this.aRankInfo.push(item);
          });
        });
        return res;
      }).then(result => {
        result.slice(4).forEach(element => {
          getPlayList({ id: element }).then(res => {
            let item = {};
            item.id = res.playlist.id;
            item.name = res.playlist.name;
            item.coverImgUrl = res.playlist.coverImgUrl;
            item.updateTime = res.playlist.updateTime;
            this.bRankInfo.push(item);
          });
        });
      });
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/css/variable';
@import '../assets/css/mixin';
.rank {
  width: 100%;
  height: 100%;
  .rank-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 184px;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    .group-title {
      padding: 10px 20px;
      box-sizing: border-box;
      @include font_color();
      @include font_size($font_large);
      font-weight: bold;
    }
    .normal-group {
      li {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        box-sizing: border-box;
        .rank-left {
          position: relative;
          img {
            width: 200px;
            height: 200px;
            border-radius: 20px;
          }
          p {
            position: absolute;
            left: 10px;
            bottom: 10px;
            color: #fff;
            @include font_size($font_medium_s);
          }
        }
        .rank-right {
          margin-left: 20px;
          p {
            @include font_color();
            @include font_size($font_medium_s);
            padding: 10px 0;
          }
        }
      }
    }
    .other-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        padding: 10px 20px;
        box-sizing: border-box;
        .rank-top {
          position: relative;
          img {
            width: 200px;
            height: 200px;
            border-radius: 20px;
          }
          p {
            position: absolute;
            left: 10px;
            bottom: 10px;
            color: #fff;
            @include font_size($font_medium_s);
          }
        }
        .rank-bottom {
          width: 200px;
          p {
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            padding: 10px 0;
            @include font_color();
            @include font_size($font_medium_s);
          }
        }
      }
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
