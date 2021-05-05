<template>
  <div class="song">
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
    <SongListItem :songs="songs"></SongListItem>
  </div>
</template>

<script>
import SongListItem from '../common/SongListItem'
export default {
  name: 'NewSongs',
  components: {
    SongListItem
  },
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/variable';
.song {
  width: 100%;
  @include bg_sub_color();
  .song-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
    padding: 10px 20px 0;
    h3 {
      position: relative;
      @include font_size($font_large);
      font-weight: bold;
      @include font_color();
      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 50%;
        right: 50px;
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        margin-top: -10px;
        color: transparent;
        border-top: 4px solid #666;
        border-right: 4px solid #666;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
