<template>
  <div class="player">
    <NormalPlayer
      :totalTime="totalTime"
      :currentTime="currentTime"
    ></NormalPlayer>
    <MiniPlayer @showList="showListPlayer"></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio
      :src="currentSong.url"
      ref="audio"
      @timeupdate="timeupdate"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer';
import MiniPlayer from '../components/Player/MiniPlayer';
import ListPlayer from '../components/Player/ListPlayer';
import { mapGetters, mapActions } from 'vuex';
import mode from '../store/modeType';
import { getRandomIntInclusive, setLocalStorage, getLocalStorage } from "../tools/tools";
export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  methods: {
    ...mapActions([
      'setCurrentIndex',
      'setFavoriteList',
      'setHistorySong',
      'setHistoryList'
    ]),
    showListPlayer () {
      this.$refs.listPlayer.show()
    },
    timeupdate (e) {
      this.currentTime = e.target.currentTime
    },
    end () {
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === mode.one) {
        this.$refs.audio.play()
      } else if (this.modeType === mode.random) {
        let index = getRandomIntInclusive(0, this.songs.length - 1)
        this.setCurrentIndex(index)
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentIndex',
      'curTime',
      'modeType',
      'songs',
      'favoriteList',
      'historyList'
    ])
  },
  data () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      this.setHistorySong(this.currentSong)
      if (newValue) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      this.$refs.audio.oncanplay = () => {
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong)
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    curTime (newValue, oldValue) {
      this.$refs.audio.currentTime = newValue
    },
    favoriteList (newValue, oldValue) {
      let value = Object.values(newValue)
      setLocalStorage('favoriteList', value)
    },
    historyList (newValue, oldValue) {
      let value = Object.values(newValue)
      setLocalStorage('historyList', value)
    },
  },
  created () {
    let favoriteList = getLocalStorage('favoriteList');
    if (favoriteList === null) { return }
    this.setFavoriteList(favoriteList)

    let historyList = getLocalStorage('historyList');
    if (historyList === null) { return }
    this.setHistoryList(historyList)
  },
  mounted () {
    this.$refs.audio.oncanplay = () => {
      this.totalTime = this.$refs.audio.duration
    }
  },
}
</script>

<style lang="scss" scoped>
</style>