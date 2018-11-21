<template>
    <transition name="toggleShow">
      <div class="title-wrapper" v-show="isShow">
        <div class="left">
          <i class="icon icon-back"></i>
        </div>
        <div class="right">
          <i class="icon icon-cart"></i>
          <i class="icon icon-person"></i>
          <i class="icon icon-more"></i>
        </div>
      </div>
    </transition>
</template>

<script>
export default {
  props: {
    isShow: Boolean
  },
  data () {
    return {}
  }

}

</script>
<style lang='stylus' scoped>
  @import '~common/stylus/mixins'
  .title-wrapper
    display flex
    align-items center
    position absolute
    top 0
    left 0
    width 100%
    height 96px
    background #fff
    box-shadow 0 16px 16px rgba(0, 0, 0, .15)
    z-index 101
    .left
      flex 0 0 120px
      alignCenter()
      height 100%
    .right
      flex 1
      display flex
      justify-content flex-end
      align-items center
      height 100%
      .icon
        margin-right 20px
</style>
