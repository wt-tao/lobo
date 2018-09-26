// pages/lobo_task/lobo_task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  pay:function(){
    wx.navigateTo({
      url: '../lobo_money/lobo_money',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中...',
      icon:'loading',
      duration:2000,
    })
    var that=this
    var token = wx.getStorageSync('token')
    wx.request({
      url: getApp().globalData.url + '/api/task/taskMainPage',
      method:'GET',
      data: {
        // page: page
      },
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认值
        'content-type': 'application/json;charset=UTF-8',
        'token': token
      },
      success: function (res) {
        console.log(res)
        var exp =((res.data.data.expGet / res.data.data.expNeed) * 100).toFixed(0)
        console.log('exp',exp)
        that.setData({
          exp:exp,
          task:res.data.data
        })

      }
    })

    // 获取分享id
    wx.request({
      url: getApp().globalData.url + '/api/share/getOpenId',
      data: {
        // code: code
      },
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认值
        'content-type': 'application/json;charset=UTF-8',
        'token': token
      },
      success: function (res) {
        console.log(res)
        that.setData({
          openid: res.data.data
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
    var openid = this.data.openid
    console.log(openid)
    // that.onShareAppMessage(openid)
    return {
      title: "请快与我绑定，记录我们的每一天",
      path: '/pages/main/main?openid=' + openid,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})