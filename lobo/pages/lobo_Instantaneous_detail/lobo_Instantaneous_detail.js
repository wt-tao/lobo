// pages/lobo_Instantaneous_detail/lobo_Instantaneous_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   url:getApp().globalData.url,
  },
  dele:function(e){
    var token = wx.getStorageSync('token')
    var id=this.data.id
    wx.request({
      url: getApp().globalData.url + '/api/card/deleteCard/' + id,
      method: 'POST',
      data: {
        // code: code
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
        // 'content-type': 'application/json;charset=UTF-8',
        'token': token
      },
      success: function (res) {
        console.log(res)
        if(res.data.code==203){
          wx.showToast({
            title: '删除成功',
            duration:2000,
            success:function(){
              wx.reLaunch({
                url: '../lobo_Instantaneous/lobo_Instantaneous',
              })
            }
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
  },
  content: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  Send: function () {
    var content = this.data.content
    var id = this.data.id
    console.log(content)
    var that = this
    var token = wx.getStorageSync('token')
        // console.log(res.data)
        wx.request({
          url: getApp().globalData.url + '/api/card/reply/submit/' + id,
          method: 'POST',
          data: {
            content: content
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
            // 'content-type': 'application/json;charset=UTF-8',
            'token': token
          },
          success: function (res) {
            console.log(res)
            if (res.data.code == 202) {
              wx.showToast({
                title: '发送成功',
                success: function () {
                  that.setData({
                    content: '',
                  })
                }
              })
              that.onShow()
            }
          }
        })
  },
  yl:function(e){
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.card.imgs // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this
    var id = options.id
    var user_id = options.user_id
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000,
    })
    wx.getStorage({
      key: 'head_Img',
      success: function (res) {
        that.setData({
          head_img: res.data
        })
      },
    })
    this.setData({
      id: id,
      user_id: user_id 
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
    var id=this.data.id
    var that = this
    var token = wx.getStorageSync('token')
        // console.log(res.data)
        wx.request({
          url: getApp().globalData.url + '/api/card/' + id,
          method: 'GET',
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
            var card = res.data.data.card
            card.imgs = card.imgs.split(',')
            that.setData({
              // user_id: card.user_id,
              card: card,
              replyList: res.data.data.replyList
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
    var token = wx.getStorageSync('token')
        wx.request({
          url: getApp().globalData.url + '/api/share/doneShowTask',
          method: 'POST',
          data: {
            // code: code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
            // 'content-type': 'application/json;charset=UTF-8',
            'token': token
          },
          success: function (res) {
            console.log(res)
              
          }
        })
  }
})