// pages/detailed/detailed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    hadLastPage: false,
    listArray: [],
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
  },
  loading: function () {
    var that = this
    var hadLastPage = this.data.hadLastPage
    var page = this.data.page
    if (hadLastPage != false) {
      wx.showToast({
        title: '到底了',
      });
      return;
    }
    var token = wx.getStorageSync('token')
    wx.request({
      url: getApp().globalData.url + '/api/fund/detailMain',
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
        var listData = that.data.listArray
        for (var i = 0; i < res.data.data.fundDetailRecordPageClient.list.length; i++) {
          listData.push(res.data.data.fundDetailRecordPageClient.list[i])
        }
        if (res.data.data.totalPage == res.data.data.currentPage) {
          that.setData({
            hadLastPage: true
          })
        } else {
          wx.showToast({
            title: '加载中..',
            icon: 'loading',
            duration: 1000,
          })
          that.setData({
            page: page + 1
          })
        }
        that.setData({
          listArray: listData,
        })

      }
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