// pages/lobo_history_details/lobo_history_details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:getApp().globalData.url,
    page: 1,
    hadLastPage: false,
    listArray: [],
  },
  del:function(e){
    wx.showToast({
      title: '需卡券...',
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
    var pair_no = this.data.pair_no
    wx.request({
      url: getApp().globalData.url + '/api/pair/pairHistoryDetail/' + page,
      data: {
        pairNo: pair_no,
      },
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认值
        'content-type': 'application/json;charset=UTF-8',
        'token': token
      },
      success: function (res) {
        console.log(res)
        var listData = that.data.listArray
        for (var i = 0; i < res.data.data.cardPage.list.length; i++) {
          res.data.data.cardPage.list[i].imgs = res.data.data.cardPage.list[i].imgs.split(',')
          listData.push(res.data.data.cardPage.list[i])
        }
        if (res.data.data.cardPage.totalPage == res.data.data.cardPage.currentPage) {
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
          hs: res.data.data,
    
          head: res.data.data.head,
          listArray: listData,
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000,
    })
  console.log(options)
  this.setData({
    pair_no: options.pair_no
  })
    wx.getStorage({
      key: 'head_Img',
      success: function (res) {
        that.setData({
          head_Img: res.data
        })
      },
    })
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        that.setData({
          userId: res.data
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