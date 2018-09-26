// pages/home_page/home_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url
  },
  index:function(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  Instantaneous: function () {
    wx.reLaunch({
      url: '../Instantaneous/Instantaneous',
    })
  },
  not_uesr: function () {
    wx.reLaunch({
      url: '../not_uesr/not_uesr',
    })
  },
  lobo_information_detali: function (e) {
    wx.navigateTo({
      url: '../lobo_information_detali/lobo_information_detali?id=' + e.currentTarget.id,
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
    wx.login({
      success: function (r) {
        console.log(r)
        wx.request({
          url: getApp().globalData.url + '/api/user/login/' + r.code,
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
            // 'content-type': 'application/json;charset=utf-8',
          },
          data: {
          },
          success: function (res) {
            console.log(res)
            wx.setStorage({
              key: 'token',
              data: res.data.data.token,
            })
            wx.setStorage({
              key: 'userId',
              data: res.data.data.userId,
            })
            // 获取首页数据
            wx.request({
              url: getApp().globalData.url + '/api/main',
              method: "GET",
              header: {
                // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
                'content-type': 'application/json;charset=utf-8',
                token: res.data.data.token
              },
              data: {
              },
              success: function (resp) {
                console.log('main', resp)
                wx.setStorage({
                  key: 'head_Img',
                  data: resp.data.data.defaultHeadImg,
                })
                var exp = ((resp.data.data.head.expGet / resp.data.data.head.expNeed) * 100).toFixed(0)
                console.log(exp)
                that.setData({
                  exp: exp,
                  head: resp.data.data.head,
                  head_img: resp.data.data.defaultHeadImg,
                  lineList: resp.data.data.headlineList,
                })


              }
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
    var that = this
    var token = wx.getStorageSync('token')
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