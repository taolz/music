<template>
  <ul class="song-list">
    <li
      v-for="item in songs"
      :key="item.id"
      class="item"
      @click="selectMusic(item.ids)"
    >
      <img v-lazy="item.picUrl" alt="" />
      <div>
        <h3>{{ item.name }}</h3>
        <p>{{ item.singer }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongListItem',
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    selectMusic (id) {
      this.setFullScreen(true)
      this.setSongDetail([id])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/variable';
.song-list {
  width: 100%;
  overflow: hidden;
  .item {
    display: flex;
    width: 100%;
    height: 150px;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    img {
      width: 100px;
      height: 100px;
      border-radius: 20px;
      margin-right: 50px;
    }
    div {
      width: 70%;
      h3 {
        @include font_size($font_large);
        @include font_color();
        @include no-wrap();
        font-weight: bold;
      }
      p {
        @include font_size($font_samll);
        @include font_color();
        @include no-wrap();
        opacity: 0.6;
        margin-top: 10px;
      }
    }
  }
}
</style>
