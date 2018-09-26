// pages/lobo_Instantaneous/lobo_Instantaneous.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:getApp().globalData.url,
    // leftHeight: 0,
    // rightHeight: 0,
    // length: 10,
    // pageNo: 1,
    // descHeight: 30, //图片文字描述的高度
    // pageStatus: true,

    page: 1,
    hadLastPage: false,
    listArray: [],
  },
add:function(){
wx.navigateTo({
  url: '../add/add',
})
},
  decal:function(){
    wx.navigateTo({
      url: '../lobo_decal/lobo_decal',
    })
  },
  lobo_main: function () {
    wx.reLaunch({
      url: '../lobo_main/lobo_main',
    })
  },
  lobo_home_page: function () {
    wx.reLaunch({
      url: '../lobo_home_page/lobo_home_page',
    })
  },
  lobo_uesr: function () {
    wx.reLaunch({
      url: '../lobo_uesr/lobo_uesr',
    })
  },
  details: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../lobo_Instantaneous_detail/lobo_Instantaneous_detail?id=' + e.currentTarget.id+'&user_id='+e.currentTarget.dataset.id,
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
      url: getApp().globalData.url + '/api/card/main/' + page,
      method: 'GET',
      data: {
        // page: page
      },
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
        'content-type': 'application/json;charset=UTF-8',
        'token': token
      },
      success: function (res) {
        console.log('直接登录',res)
        if (res.data.code == 505){
          wx.showToast({
            title: '重新登录中...',
            icon: 'loading',
            duration: 2000,
            success: function () {
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
                      wx.request({
                        url: getApp().globalData.url + '/api/card/main/' + page,
                        method: 'GET',
                        data: {
                          // page: page
                        },
                        header: {
                          // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
                          'content-type': 'application/json;charset=UTF-8',
                          'token': res.data.data.token
                        },
                        success: function (res) {
                          console.log('再次登录',res)
                          for (var i = 0; i < res.data.data.cardPage.list.length; i++) {
                            res.data.data.cardPage.list[i].imgs = res.data.data.cardPage.list[i].imgs.split(',')
                          }
                          wx.setStorage({
                            key: 'info',
                            data: res.data.data.cardTypes,
                          })

                          var listData = that.data.listArray
                          for (var i = 0; i < res.data.data.cardPage.list.length; i++) {
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
                            user_id: res.data.data.userId,
                            listArray: listData,
                            cardHead: res.data.data.cardHead,
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
        else if (res.data.code == 200){
        for (var i = 0; i < res.data.data.cardPage.list.length; i++) {
          res.data.data.cardPage.list[i].imgs = res.data.data.cardPage.list[i].imgs.split(',')
        }
        wx.setStorage({
          key: 'info',
          data: res.data.data.cardTypes,
        })

        var listData = that.data.listArray
        for (var i = 0; i < res.data.data.cardPage.list.length; i++) {
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
          user_id: res.data.data.userId,
          listArray: listData,
          cardHead: res.data.data.cardHead,
        })

      }
        else {
          wx.showToast({
            title: res.data.message,
            duration: 2000,
          })
        }
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