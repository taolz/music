<template>
  <div class="recommend">
    <!-- <scroll-view id="wrapper" :data="dataList"> -->
    <scroll-view id="wrapper">
      <div class="content">
        <Banner :banners="banners" />
        <Personalized
          :personalized="personalized"
          :title="'推荐歌单'"
          @select="fatherSelectItem"
          :type="'personalized'"
        />
        <Personalized
          :personalized="albums"
          :title="'最新专辑'"
          @select="fatherSelectItem"
          :type="'album'"
        />
        <NewSongs :songs="songs" />
      </div>
    </scroll-view>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api/index'
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import NewSongs from '../components/Recommend/NewSongs'
import ScrollView from '../components/common/ScrollView'

export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    NewSongs,
    ScrollView
  },
  methods: {
    fatherSelectItem (id, type) {
      this.$router.push({
        path: `/recommend/detail/${type}/${id}`
      })
    }
  },
  data () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: [],
      // dataList: []
      bannersList: []
    }
  },
  mounted () {
    getBanner()
      .then((data) => {
        // this.dataList.push(data.banners)
        const banners = []
        data.banners.forEach((value) => {
          const obj = {}
          obj.pic = value.pic
          obj.id = value.targetId
          obj.typeTitle = value.typeTitle
          obj.titleColor = value.titleColor
          if (value.url !== null) {
            obj.url = value.url
          } else {
            obj.url = undefined
          }
          banners.push(obj)
        })
        this.banners = banners
      })
      .catch(function (err) {
        console.log(err)
      })
    getPersonalized()
      .then((data) => {
        this.personalized = data.result
        // this.dataList.push(data.result)
      })
      .catch(function (err) {
        console.log(err)
      })
    getNewAlbum()
      .then((data) => {
        this.albums = data.albums.slice(0, 6)
        // this.dataList.push(data.albums.slice(0, 6))
      })
      .catch(function (err) {
        console.log(err)
      })
    getNewSong()
      .then((data) => {
        const list = []
        data.result.forEach((value) => {
          const obj = {}
          obj.ids = value.id
          obj.name = value.name
          obj.picUrl = value.picUrl
          for (const artist of value.song.artists.values()) {
            obj.singer = artist.name
          }
          list.push(obj)
        })
        this.songs = list
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .content {
    width: 100%;
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
