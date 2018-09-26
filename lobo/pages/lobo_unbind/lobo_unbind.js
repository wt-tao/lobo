// pages/lobo_unbind/lobo_unbind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  url:getApp().globalData.url,
    display: 'none',
  },
  jiec:function(){
    var that=this
    wx.showModal({
      title: '最后确认',
      content: '分手后你们的lobo积金和情侣等级&贴花将会初始化，其他数据将移至绑定历史',
      success:function(r){
        if(r.confirm){
          that.setData({
            display: 'block',
          })
        }
      }
    })
  },
  display:function(){
    this.setData({
      display: 'none',
    })
  },
  password: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  sures: function (e) {
    var that = this
    var password = this.data.password
    var token = wx.getStorageSync('token')
    wx.request({
      url: getApp().globalData.url + '/api/pair/unbind',
      method: 'POST',
      data: {
        // page: 1,
        password: password,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
        // 'content-type': 'application/json;charset=UTF-8',
        'token': token
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '解绑成功...',
            duration: 2000,
            success: function () {
              that.setData({
                password: '',
                display: 'none',
              })
              wx.navigateTo({
                url: '../not_uesr/not_uesr?',
              })
            }
          })
        }
        else {
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 2000,
          })
        }

      }
    })
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
          head_img: res.data
        })
      },
    })
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        that.setData({
          userId: res.data
        })
      },
    })
    var token = wx.getStorageSync('token')
    wx.request({
      url: getApp().globalData.url + '/api/pair/unbindPage',
      method: 'GET',
      data: {
      },
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
        'content-type': 'application/json;charset=UTF-8',
        'token': token
      },
      success: function (res) {
        console.log(res)
        // var list=
        for (var i = 0; i < res.data.data.cardList.length;i++){
          res.data.data.cardList[i].imgs = res.data.data.cardList[i].imgs.split(',')
          console.log('res.data.data.cardList[i].imgs', res.data.data.cardList[i].imgs)
        }
        
          that.setData({
            // user_id:
            head: res.data.data.cardHead,
            list: res.data.data.cardList
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