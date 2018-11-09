// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(function(){
      var token = wx.getStorageSync('token')
      console.log(options.openid)
      var openid = options.openid

      if (options.openid == 'undefined') {
        wx.login({
          success: function (r) {
            // console.log(r)
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
                console.log('undefined登录', res)
                wx.setStorage({
                  key: 'token',
                  data: res.data.data.token,
                })
                wx.setStorage({
                  key: 'userId',
                  data: res.data.data.userId,
                })
                wx.request({
                  url: getApp().globalData.url + '/api/main/pairOrNot',
                  method: "GET",
                  header: {
                    // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
                    'content-type': 'application/json;charset=utf-8',
                    'token': res.data.data.token
                  },
                  data: {
                  },
                  success: function (res) {
                    console.log('undefined判断是否绑定', res)
                    wx.setStorage({
                      key: 'head_Img',
                      data: res.data.data.default_head_img,
                    })
                    if (res.data.data.pairOrNot == false) {
                      console.log('undefined头像：', res.data.data.default_head_img)
                      wx.reLaunch({
                        url: '../index/index?headimg=' + res.data.data.default_head_img,
                      })
                    }
                    else {
                      wx.reLaunch({
                        url: '../lobo_main/lobo_main',
                      })
                    }
                  }
                })

              }
            })
          }
        })


      } else {
        wx.login({
          success: function (r) {
            // console.log(r)
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
                console.log('邀请进入登录', res)
                var tokens = res.data.data.token
                wx.setStorage({
                  key: 'token',
                  data: res.data.data.token,
                })
                wx.setStorage({
                  key: 'userId',
                  data: res.data.data.userId,
                })
                wx.request({
                  url: getApp().globalData.url + '/api/main/pairOrNot',
                  method: "GET",
                  header: {
                    // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
                    'content-type': 'application/json;charset=utf-8',
                    'token': tokens
                  },
                  data: {
                  },
                  success: function (res) {
                    console.log('邀请进入判断是否绑定', res)
                    wx.setStorage({
                      key: 'head_Img',
                      data: res.data.data.default_head_img,
                    })
                    if (res.data.data.pairOrNot == false) {
                      wx.showModal({
                        title: '是否绑定？',
                        content: '请问是否与邀请者绑定对象关系？',
                        success: function (r) {
                          if (r.confirm) {
                            wx.request({
                              url: getApp().globalData.url + '/api/pair/bind',
                              method: "POST",
                              header: {
                                'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
                                // 'content-type': 'application/json;charset=utf-8',
                                'token': tokens
                              },
                              data: {
                                openid: openid,
                              },
                              success: function (r) {
                                console.log('绑定结果', r)
                                if (r.data.code == 200) {
                                  wx.showToast({
                                    title: '绑定成功...',
                                    duration: 2000,
                                    success: function () {
                                      wx.reLaunch({
                                        url: '../lobo_main/lobo_main',
                                      })
                                    }
                                  })
                                } else {
                                  wx.showToast({
                                    title: r.data.message,
                                    icon: 'loading',
                                    duration: 2000,
                                  })
                                }
                              }
                            })
                          }
                          else {
                            console.log('邀请头像：', res.data.data.default_head_img)
                            // 不同意绑定
                            wx.reLaunch({
                              url: '../index/index?headimg=' + res.data.data.default_head_img,
                            })
                          }
                        }
                      })
                      // 绑定联盟
                      wx.request({
                        url: getApp().globalData.url + '/api/league/beInvited/' + openid,
                        method: "POST",
                        header: {
                          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
                          // 'content-type': 'application/json;charset=utf-8',
                          'token': tokens
                        },
                        data: {
                        },
                        success: function (r) {
                          console.log(r)
                        }
                      })

                    }
                    else {
                      wx.reLaunch({
                        url: '../lobo_main/lobo_main',
                      })
                    }
                  }
                })

              }
            })
          }
        })
      }
    },3000)
    
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