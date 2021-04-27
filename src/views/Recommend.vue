<template>
  <div class="recommend">
    <scroll-view id="wrapper" :data="dataList">
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
        <SongList :songs="songs" />
      </div>
    </scroll-view>
    <!-- <transition> -->
    <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewSong } from '../api/index'
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import SongList from '../components/Recommend/SongList'
import ScrollView from '../components/common/ScrollView'

export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    SongList,
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
      dataList: []
    }
  },
  created () {
    getBanner().then((data) => {
      this.banners = data.banners
      this.dataList.push(data.banners)
    })
    getPersonalized().then((data) => {
      this.personalized = data.result
      this.dataList.push(data.result)

    })
    getNewAlbum().then((data) => {
      this.albums = data.albums.slice(0, 6)
      this.dataList.push(data.albums.slice(0, 6))
    })
    getNewSong().then((data) => {
      let song = []
      data.result.forEach(ele => {
        let item = {}
        item.ids = ele.id
        item.name = ele.name
        for (const artist of ele.song.artists.values()) {
          item.singer = artist.name
        }
        item.picUrl = ele.picUrl
        song.push(item)
      });
      this.songs = song
    })
  },
  // watch: {
  //   dataList (newValue, oldValue) {
  //     if (newValue) {
  //       // this.$refs.scrollView.refresh()
  //     }
  //   }
  // },
}
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  .content {
    width: 100%;
    // height: 3270px;
  }
}
</style>
