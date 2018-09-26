// pages/lobo_help_feedback/lobo_help_feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    content: '',
  },
  content: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  feedback: function () {
    var content = this.data.content
    if (content == '') {
      wx.showToast({
        title: '请填写问题...',
        icon: 'loading',
        duration: 2000,
      })
    } else {
      wx.getStorage({
        key: 'token',
        success: function (res) {
          wx.request({
            url: app.globalData.url + '/api/problemFeedback/submit',
            method: 'POST',
            data: {
              content: content
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',// 默认值
              // 'content-type': 'application/json;charset=UTF-8',
              'token': res.data
            },
            success: function (res) {
              console.log(res)
              if (res.data.code == 200) {
                wx.showToast({
                  title: '发送成功',
                  duration: 2000,
                  success: function () {
                    wx.reLaunch({
                      url: '../lobo_uesr/lobo_uesr',
                    })
                  }
                })
              } else {
                wx.showToast({
                  title: res.data.message,
                  duration: 2000,
                })
              }
            }
          })
        },
      })
    }
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