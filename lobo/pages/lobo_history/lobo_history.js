// pages/lobo_history/lobo_history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    hadLastPage: false,
    listArray: [],
    url:getApp().globalData.url,
  },
  lobo_history_details:function(e){
    wx.navigateTo({
      url: '../lobo_history_details/lobo_history_details?pair_no=' + e.currentTarget.id,
    })
      // console.log(e)
  },
  loading:function(){
    var password = this.data.password
    
    var that = this
    // var hadLastPage = this.data.hadLastPage
    var page = this.data.page
    // if (hadLastPage != false) {
    //   wx.showToast({
    //     title: '到底了',
    //   });
    //   return;
    // }
    if (password==undefined){
    var token = wx.getStorageSync('token')
    wx.request({
      url: getApp().globalData.url + '/api/pair/bindHistory',
      data: {
        page: page
      },
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认值
        'content-type': 'application/json;charset=UTF-8',
        'token': token
      },
      success: function (res) {
        console.log(res)
        // var listData = that.data.listArray
        // for (var i = 0; i < res.data.data.length; i++) {
        //   listData.push(res.data.data.list[i])
        // }
        // if (res.data.data.totalPage == res.data.data.currentPage) {
        //   that.setData({
        //     hadLastPage: true
        //   })
        // } else {
        //   wx.showToast({
        //     title: '加载中..',
        //     icon: 'loading',
        //     duration: 1000,
        //   })
        //   that.setData({
        //     page: page + 1
        //   })
        // }
        that.setData({
          listArray: res.data.data,
        })

      }
    })
    }
    else{
      wx.request({
        url: getApp().globalData.url + '/api/pair/bindHistory',
        method: 'GET',
        data: {
          page: 1,
          password: password,
        },
        header: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
          'content-type': 'application/json;charset=UTF-8',
          'token': token
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 200) {
              that.setData({
                listArray:res.data.data
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
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.showToast({
      title: '加载中..',
      icon: 'loading',
      duration: 1000,
    })
    wx.getStorage({
      key: 'head_img',
      success: function (res) {
        that.setData({
          password: options.password,
          head_img: res.data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.loading()
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
    this.loading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})