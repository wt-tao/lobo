// pages/lobo_union/lobo_union.js

var Api = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      url:getApp().globalData.url,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: 'head_Img',
      success: function (res) {
        that.setData({
          head_Img: res.data
        })
      },
    })
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
    var that=this
    var token = wx.getStorageSync('token')
    // 获取数据
    wx.request({
      url: getApp().globalData.url + '/api/league/my',
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
        var pairHistoryList = res.data.data.pairHistoryList
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;

        var ARR_NEWS_DATA = []
        for (var i = 0; i < pairHistoryList.length;i++){

          if (pairHistoryList[i].break_time!=-1){
            // 解绑时间转换时间戳
            pairHistoryList[i].break_time = Api.js_date_time(pairHistoryList[i].break_time)
            ARR_NEWS_DATA.push(pairHistoryList[i])
          }

          // 绑定时间转换时间戳
          var ARR_NEWS_DATAs = []
          pairHistoryList[i].pair_time = Api.js_date_time(pairHistoryList[i].pair_time)
          ARR_NEWS_DATAs.push(pairHistoryList[i])
         
        }
        that.setData({
          leagueList: res.data.data.leagueList,
          pairHistoryList: pairHistoryList
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
          openid:res.data.data
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
    var that=this
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