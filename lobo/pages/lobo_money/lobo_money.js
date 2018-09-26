// pages/lobo_money/lobo_money.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  detailed:function(){
    wx.navigateTo({
      url: '../detailed/detailed',
    })
  },
  lobojij:function(e){
    wx.showToast({
      title: '暂无权限...',
      icon: 'loading',
      duration: 2000,
    })
      console.log(e)
    // var lobo_love_jj = e.currentTarget.dataset.lobo_love_jj
    // var types = e.currentTarget.dataset.type
    // wx.navigateTo({
    //   url: '../lobo_put_forward/lobo_put_forward?types=' + types + '&&loveTotalAmount=' + lobo_love_jj,
    // })
  },
  tx:function(e){
    var loveTotalAmount = e.currentTarget.dataset.lovetotalamount //lobo基金
    var types = e.currentTarget.dataset.type

    var money=this.data.money
    if (money.couldOrNotWithdraw==false){
      wx.showToast({
        title: '暂无权限',
        icon:'loading',
      })
    }
    else{
        wx.navigateTo({
          url: '../lobo_put_forward/lobo_put_forward?loveTotalAmount=' + loveTotalAmount + '&types=' + types,
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
    var that=this
    var token = wx.getStorageSync('token')
    wx.request({
      url: getApp().globalData.url + '/api/fund/main',
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
          that.setData({
            money:res.data.data
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