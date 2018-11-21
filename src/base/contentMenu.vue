<template>
    <transition name="slide-right">
      <div class="content">
        <ul class="content-wrapper" v-if="bookAvailable" >
          <li class="content-item" v-for="(item, index) in navigation.toc" :key="index" @click="goPage(item.href)">
            <span class="text">{{ item.label }}</span>
          </li>
        </ul>
        <div class="empty" v-else>Loading...</div>
      </div>
    </transition>
</template>

<script>
export default {
  props: {
    isMaskShow: {
      type: Boolean,
      default: false
    },
    navigation: Object,
    bookAvailable: Boolean
  },
  methods: {
    goPage (href) {
      this.$emit('goPage', href)
    }
  }

}

</script>
<style lang='stylus' scoped>
  @import '~common/stylus/mixins'
  .content
    position absolute
    top 0
    left 0
    z-index 102
    width 65%
    height 100%
    background-color #fff
    .content-wrapper
      width 100%
      height 100%
      overflow auto
      .content-item
        padding 40px 30px
        border-bottom 2px solid #ccc
        .text
          font-size 28px
          color #333
    .empty
      width 100%
      height 100%
      alignCenter()
      font-size 32px
      color #333
</style>
