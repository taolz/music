<template>
  <Header class="header">
    <template v-slot:left>
      <div class="header-left" @click.stop="hiddenNormalPlayer"></div>
    </template>
    <template v-slot:center>
      <div class="header-title">
        <h3>{{ currentSong.name }}</h3>
        <p>{{ currentSong.singer }}</p>
      </div>
    </template>
    <template v-slot:right>
      <div class="header-right"></div>
    </template>
  </Header>
</template>

<script>
import Header from '../Header/Header';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'PlayerHeader',
  components: {
    Header
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setMiniPlayer',
    ]),
    hiddenNormalPlayer () {
      this.setFullScreen(false);
      this.setMiniPlayer(true)
    }
  },
  computed: {
    ...mapGetters([
      'songs',
      'currentSong'
    ])
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable';
@import '@/assets/css/mixin';
.header {
  .header-left {
    @include bg_img('~@/assets/images/down');
  }
  .header-right {
    @include bg_img('~@/assets/images/more');
  }
  .header-title {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: space-around;
    width: 60%;
    color: #fff;
    font-weight: bold;
    text-align: center;
    // @include no-wrap();
    // @include font_size($font_medium);
    font-size: 28px;
  }
}
</style>