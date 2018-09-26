// pages/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  qa: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../lobo_help_details/lobo_help_details?id=' + e.currentTarget.id,
    })
  },
  feedback: function () {
    wx.navigateTo({
      url: '../lobo_help_feedback/lobo_help_feedback',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000,
    })
    var that = this
    wx.request({
      url: getApp().globalData.url + '/api/problemOfUse/main',
      method: 'GET',
      data: {
        // code: code
      },
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认值
        'content-type': 'application/json;charset=UTF-8',
        // 'token': token
      },
      success: function (res) {
        console.log(res)

        that.setData({
          faq: res.data.data.faq,
          oaq: res.data.data.oaq,
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
  
  }
})