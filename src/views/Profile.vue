<template>
  <!-- 个人中心 -->
  <div class="profile">
    <ProfileHeader></ProfileHeader>
    <ProfileInfo :userInfo="userInfo"></ProfileInfo>
    <ProfileBottom :songs="songs"></ProfileBottom>
  </div>
</template>

<script>
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfileInfo from '../components/Profile/ProfileInfo';
import ProfileBottom from '../components/Profile/ProfileBottom';
import { getLocalStorage } from '../tools/tools';
import { likelist, getSongDetail, getSongUrl } from "../api/index";

export default {
  name: 'Profile',
  data () {
    return {
      userInfo: {},
      songs: [],
      songIds: []
    }
  },
  components: {
    ProfileHeader,
    ProfileInfo,
    ProfileBottom
  },
  created () {
    // 取出 cookie 里的用户信息
    this.userInfo = getLocalStorage("userInfo")
  },
  mounted () {
    // 获取我的喜欢里前50首
    likelist({ uid: this.userId }
    ).then(data => data.ids.slice(0, 50)
    ).then(data => getSongUrl({ id: data.join(',') })
    ).then((data) => {
      // 处理获取的歌曲id和播放地址
      let songUrlObj = []
      data.data.forEach((ele) => {
        let songUrlitem = {}
        songUrlitem.ids = ele.id
        songUrlitem.url = ele.url
        songUrlObj.push(songUrlitem)
        this.songIds.push(ele.id)
      })
      this.songs = songUrlObj
    }).then(() => {
      // 获取歌曲详情
      return getSongDetail({ ids: this.songIds.join(',') })
    }).then((data) => {
      // 存储歌曲信息
      let songsList = []
      // 歌曲详情数据处理
      data.songs.forEach((ele) => {
        let songObj = {}
        songObj.ids = ele.id
        songObj.name = ele.name
        songObj.picUrl = ele.al.picUrl
        songObj.singer = ele.ar[0].name
        songsList.push(songObj)
      })

      // 合并歌曲对象
      let newSongsObj = []
      songsList.forEach((ele, index) => {
        if (ele.ids === this.songs[index].ids) {
          let newSongsItem = Object.assign(ele, this.songs[index])
          newSongsObj.push(newSongsItem)
        } else {
          console.log('歌曲id不相等');
        }
      })
      this.songs = newSongsObj
    }).catch((err) => { console.log(err) })
  }
}
</script>

<style lang="scss" scoped>
.profile {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>