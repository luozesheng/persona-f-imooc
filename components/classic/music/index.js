// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh], // 为什么behaviors 加s，可以定义多个，behaviors: [classicBeh，a, b, c,..],
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  attached: function(event) {
    this._recoverStatus()
    this._monitorSwitch()
  },

  // detached: function() {
  //   mMgr.stop()
  // },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(event) {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    _recoverStatus: function() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function() {
      // 点击播放icon 会触发
      mMgr.onPlay(()=> {
        this._recoverStatus()
      })
      // 点击暂停icon 会触发
      mMgr.onPause(()=>{
        this._recoverStatus()
      })
      // 总控开关关闭X，并不是点击暂停
      mMgr.onStop(()=>{
        this._recoverStatus()
      })
      // 一首音乐从头到尾自动播放完成，初始化icon状态
      mMgr.onEnded(()=>{
        this._recoverStatus()
      })
    }
  }
})
