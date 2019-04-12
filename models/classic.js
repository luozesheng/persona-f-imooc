import {HTTP} from '../utils/http.js'
class ClassicModel extends HTTP {   // extend继承   如果这里这样写， 那么在页面的js 里就不需要实例话 new HTTP()了
  getLatest(sCallback) {
    this.request({ // 获取点赞数据
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }

  getClassic(index, nextOrPrevious , sCallback) {
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({ // 获取当前一期的上一期
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }
    
  }

  isFirst(index) { // 判断当前期刊是否是第一期
    return index == 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex(index)
    return latestIndex == index ? true : false
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index) {
    let key = 'classic-' + index
    return key
  }
}

export { ClassicModel}