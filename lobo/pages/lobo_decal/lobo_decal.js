// pages/lobo_decal/lobo_decal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
      url:getApp().globalData.url,
      img:'',
  },

  /// 按钮触摸开始触发的事件
  touchStart: function (e) {

    console.log(e.timeStamp + '- touch-start')
    console.log('长按开始')
    this.setData({
      touch_start: e.timeStamp
    })
    this.touchStartTime = e.timeStamp
  },

  /// 按钮触摸结束触发的事件
  touchEnd: function (e) {
    console.log('长按结束')
    console.log(e.timeStamp + '- touch-end')
    this.touchStartTime = e.timeStamp
    this.setData({
      touch_end: e.timeStamp
    })
 
  },

  // 可解锁
  tap:function(e){
    console.log('解锁',e)
    var colorId = e.currentTarget.dataset.id
    var timestap = this.data.touch_end - this.data.touch_start
    console.log('timestap', timestap)
    if (timestap>400){
      var token = wx.getStorageSync('token')
      wx.request({
        url: getApp().globalData.url + '/api/levelLogoTheme/unlock',
        method: 'POST',
        data: {
          colorId: colorId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
          // 'content-type': 'application/json;charset=UTF-8',
          'token': token
        },
        success: function (res) {
          console.log('解锁',res)
          if (res.data.code == 200) {
            wx.showToast({
              title: '解锁成功',
              duration: 2000,
            })
          }
          else{
            wx.showToast({
              title: res.data.message,
              duration: 2000,
            })
          }
        }
      })
    }
    else{
      console.log('单击')
      this.setData({
        img: e.currentTarget.id
      })
    }
   
  },
  taps: function (e) {
    this.setData({
      img: e.currentTarget.id
    })
    wx.showToast({
      title: '不可解锁...',
      icon:'loading',
      duration:2000,
    })
   
  },
  // 应用
  tap1:function(e){
    var colorId = e.currentTarget.dataset.id
    var timestap = this.data.touch_end - this.data.touch_start
    console.log('timestap', timestap)
    if (timestap>400){
      var token = wx.getStorageSync('token')
      wx.request({
        url: getApp().globalData.url + '/api/levelLogoTheme/set',
        method: 'POST',
        data: {
          colorId: colorId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
          // 'content-type': 'application/json;charset=UTF-8',
          'token': token
        },
        success: function (res) {
          console.log('应用',res)
          if(res.data.code==200){
            wx.showToast({
              title: '设置成功',
              duration:2000,
            })
          }
          else{
            
            wx.showToast({
              title: res.data.message,
              duration: 2000,
            })
          }
        }
    })
    }
    else {
      console.log('单击')
      this.setData({
        img: e.currentTarget.id
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that=this
    var token = wx.getStorageSync('token')
    wx.request({
      url: getApp().globalData.url + '/api/levelLogoTheme/get',
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
        var exp = ((res.data.data.expGet / res.data.data.expNeed)*100).toFixed(0)
        that.setData({
          exp: exp,
          decal: res.data.data
        })
      }
    })
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