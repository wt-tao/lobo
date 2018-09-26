// pages/news_details/news_details.js
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000,
    })
    console.log(options)
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log(res.data)
        wx.request({
          url: app.globalData.url + '/api/headline/' + options.id,
          method: 'GET',
          data: {
            // code: code
          },
          header: {
            // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
            'content-type': 'application/json;charset=UTF-8',
            'token': res.data
          },
          success: function (res) {
            console.log(res)
            var da = res.data.data.content
            WxParse.wxParse('da', 'html', da, that, 5)
            that.setData({
              news: res.data.data
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this
    // console.log(options)
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log(res.data)
        wx.request({
          url: app.globalData.url + '/api/share/doneShareTask',
          method: 'POST',
          data: {
            // code: code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
            // 'content-type': 'application/json;charset=UTF-8',
            'token': res.data
          },
          success: function (res) {
            console.log(res)

          }
        })
      }
    })
  }

})