<template>
  <div class="eBook">
    <title-bar :isShow="isShow"></title-bar>
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="content-wrapper">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="handleShowMenuAndTitle"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <menu-bar :isShow="isShow" :themesList="themesList" :themeNum="themeNum" :fontSizeList="fontSizeList" :defaultFontSize="defaultFontSize" :bookAvailable="bookAvailable" :navigation="navigation" @selectTheme="changeTheme" @setFontSize="setFontSize" @progressChange="progressChange" @goPage="goPage" ref="menuBar"></menu-bar>
  </div>
</template>

<script>
import Epub from 'epubjs'
import TitleBar from 'base/titleBar'
import MenuBar from 'base/menuBar'
const DOWNLOAD_URL = '/static/2018_Book_AgileProcessesInSoftwareEngine.epub'
export default {
  data () {
    return {
      isShow: false,
      themesList: [
        {
          name: 'default',
          style: {
            body: {
              'color': '#000',
              'background': '#fff'
            }
          }
        },
        {
          name: 'eye',
          style: {
            body: {
              'color': '#000',
              'background': '#ceeaba'
            }
          }
        },
        {
          name: 'night',
          style: {
            body: {
              'color': '#fff',
              'background': '#000'
            }
          }
        },
        {
          name: 'gold',
          style: {
            body: {
              'color': '#000',
              'background': 'rgb(241, 236, 226)'
            }
          }
        }
      ],
      themeNum: 0,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ],
      defaultFontSize: 16,
      bookAvailable: false,
      navigation: {}
    }
  },
  components: {
    TitleBar,
    MenuBar
  },
  methods: {
    // 实例化Epub，包括获取相应的ePub对象
    showEpub () {
      // 生成Book对象
      this.book = new Epub(DOWNLOAD_URL)
      // 生成Rendition，通过book对象的renderTo方法生成
      // 需要传入两个参数，第一个是要挂载的容器的id，第二个是配置参数
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight,
        method: 'default', // 兼容IOS
        overflow: 'hidden'
      })
      // 通过生成Rendition.display方法渲染电子书
      this.rendition.display()
      // 获取themes对象
      this.themes = this.rendition.themes
      // 设置默认字体大小
      this.themes.fontSize(this.defaultFontSize + 'px')
      this.registerThemes()
      // epub钩子函数
      this.book.ready.then(() => {
        this.navigation = this.book.navigation
        return this.book.locations.generate()
      }).then(result => {
        this.locations = this.book.locations
        this.bookAvailable = true
      })
    },
    // 左右翻页
    prevPage () {
      if (this.rendition) this.rendition.prev()
    },
    nextPage () {
      if (this.rendition) this.rendition.next()
    },
    handleShowMenuAndTitle () {
      this.isShow = !this.isShow
      // 调用子组件上的方法
      this.$refs.menuBar.hideSetting()
    },
    // 注册背景函数
    registerThemes () {
      this.themesList.forEach((item, index) => {
        this.themes.register(item.name, item.style)
      })
    },
    // 切换背景
    changeTheme (index) {
      this.themeNum = index
      this.themes.select(this.themesList[index].name)
    },
    // 改变字体大小
    setFontSize (fontSize) {
      this.defaultFontSize = fontSize
      this.themes.fontSize(fontSize + 'px')
    },
    // 拖拽进度条
    progressChange (progress) {
      const percentage = progress / 100
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0

      this.rendition.display(location)
    },
    hideContentMenu () {
      this.$refs.menuBar.closeMask()
    },
    // 目录页跳转
    goPage (href) {
      this.hideContentMenu()
      this.rendition.display(href)
    }
  },
  mounted () {
    this.showEpub()
  }

}

</script>
<style lang='stylus' scoped>
  @import '~common/stylus/mixins'
  .eBook
    position relative
    .read-wrapper
      .content-wrapper
        display flex
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        z-index 100
        .left, .right
          flex 0 0 200px
        .center
          flex 1
</style>
