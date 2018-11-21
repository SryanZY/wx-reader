<template>
    <div class="menu-bar">
      <transition name="slide-up">
        <div class="menu-wrapper" v-show="isShow">
          <i class="icon icon-menu" @click="showSetting(3)"></i>
          <i class="icon icon-progress" @click="showSetting(2)"></i>
          <i class="icon icon-bright" @click="showSetting(1)"></i>
          <i class="icon icon-a" @click="showSetting(0)">A</i>
        </div>
      </transition>
      <transition name="slide-up">
        <div class="setting-wrapper" v-show="ifSettingShow">
          <div class="setting-progress" v-if="showTag === 2">
            <div class="progress-wrapper">
              <input type="range" max="100" min="0" step="1" :value="progress" ref="progressInp" @change="progressChange($event.target.value)" @input="progressInp($event.target.value)">
              <p class="text-wrapper">{{ bookAvailable ? progress + '%' : '..' }}</p>
            </div>
          </div>
          <!--设置背景色-->
          <div class="setting-theme" v-if="showTag === 1">\
            <div class="theme-wrapper" v-for="(item, index) in themesList" :key="index" @click="selectTheme(index)">
              <div class="theme-bg" :style="{ 'background': item.style.body.background}"></div>
              <div class="theme-font" :class="{ 'active-theme': index === themeNum }">{{ item.name }}</div>
            </div>
          </div>
          <!--设置字体大小-->
          <div class="setting-font-size" v-if="showTag === 0">
            <div class="preview" :style="{ fontSize: fontSizeList[0].fontSize + 'px' }">A</div>
            <div class="select">
              <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index" @click="setFontSize(item.fontSize)">
                <div class="line"></div>
                <div class="point-wrapper">
                  <div class="point" v-show="item.fontSize === defaultFontSize">
                    <div class="small-point"></div>
                  </div>
                </div>
                <div class="line"></div>
              </div>
            </div>
            <div class="preview" :style="{ fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px' }">A</div>
          </div>
        </div>
      </transition>
      <content-menu :isMaskShow="isMaskShow" :navigation="navigation" :bookAvailable="bookAvailable" v-show="isMaskShow" @goPage="goPage"></content-menu>
      <transition name="fade">
        <div class="mask" v-show="isMaskShow" @click="closeMask"></div>
      </transition>
    </div>
</template>

<script>
import ContentMenu from 'base/contentMenu'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    themesList: {
      type: Array,
      default () {
        return []
      }
    },
    themeNum: {
      type: Number,
      default: 0
    },
    fontSizeList: {
      type: Array
    },
    defaultFontSize: Number,
    bookAvailable: {
      type: Boolean,
      default: false
    },
    navigation: Object
  },
  data () {
    return {
      ifSettingShow: false,
      showTag: 0, // 用来标识显示哪一个功能栏
      progress: 0,
      isMaskShow: false
    }
  },
  components: {
    ContentMenu
  },
  methods: {
    // 底部功能栏的显隐
    showSetting (tag) {
      this.showTag = tag
      if (tag === 3) {
        this.isMaskShow = true
        this.ifSettingShow = false
      } else {
        this.ifSettingShow = true
      }
    },
    hideSetting () {
      this.ifSettingShow = false
    },
    // 改变背景
    selectTheme (index) {
      this.$emit('selectTheme', index)
    },
    // 改变字体大小
    setFontSize (fontSize) {
      this.$emit('setFontSize', fontSize)
    },
    progressInp (progress) {
      this.progress = progress
      this.$refs.progressInp.style.backgroundSize = `${this.progress}% 100%`
    },
    progressChange (value) {
      this.$emit('progressChange', value)
    },
    closeMask () {
      this.isMaskShow = false
    },
    goPage (href) {
      this.$emit('goPage', href)
    }
  }

}

</script>
<style lang='stylus' scoped>
  @import '~common/stylus/mixins'
  .menu-bar
    .menu-wrapper
      position absolute
      bottom 0
      left 0
      width 100%
      height 96px
      background #fff
      z-index 101
      box-shadow 0 -8px 8px rgba(0, 0, 0, .15)
      alignSpace()
    .setting-wrapper
      position absolute
      bottom 96px
      left 0
      width 100%
      height 110px
      background #fff
      z-index 103
      box-shadow 0 -8px 8px rgba(0, 0, 0, .15)
      .setting-theme
        display flex
        width 100%
        height 100%
        .theme-wrapper
          flex 1
          display flex
          flex-direction column
          justify-content center
          padding 10px
          box-sizing border-box
          .theme-bg
            flex 1
            border 2px solid #ccc
          .theme-font
            flex 0 0 40px
            alignCenter()
            font-size 28px
            color #ccc
            &.active-theme
              color #333
      .setting-font-size
        display flex
        height 100%
        .preview
          flex 0 0 80px
          alignCenter()
        .select
          flex 1
          display flex
          .select-wrapper
            flex 1
            display flex
            align-items center
            &:first-child
              .line
                border-top none
            &:last-child
              .line
                border-top none
            .line
              flex 1
              height 0
              border-top 2px solid #ccc
            .point-wrapper
              position relative
              flex 0 0 0
              width 0
              height 14px
              border-left 2px solid #ccc
              .point
                position absolute
                top -16px
                left -16px
                width 40px
                height 40px
                border-radius 50%
                border 2px solid #ccc
                box-shadow 0 8px 8px rgba(0, 0, 0, .2)
                alignCenter()
                .small-point
                  width 10px
                  height 10px
                  background #000
                  border-radius 50%
      .setting-progress
        display flex
        height 100%
        .progress-wrapper
          flex 1
          height 100%
          alignCenter()
          flex-direction column
          padding 0 60px
          box-sizing border-box
          position relative
          input
            width 100%
            /* cover default CSS */
            -webkit-appearance none
            height 4px
            background -webkit-linear-gradient(#999, #999) no-repeat, #ddd
            background-size 0 100%
            &:focus
              outline none
            &::-webkit-slider-thumb
              -webkit-appearance none
              height 36px
              width 36px
              border-radius 50%
              background #fff
              border 2px solid #ddd
              box-shadow 0 4px 4px 0 rgba(0, 0, 0, .15)
          p
            position absolute
            bottom 0
            left 0
            width 100%
            color #333
            font-size 24px
            text-align center
    .mask
      position absolute
      top 0
      left 0
      z-index 101
      width 100%
      height 100%
      background rgba(51, 51, 51, .8)
</style>
