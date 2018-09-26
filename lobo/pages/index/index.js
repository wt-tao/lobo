//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    url: getApp().globalData.url,
    show:1,
    page:1,
    listArray:[],
    // runAM: false
    so1:false,
    so2: true,
    so3: true,
    so4: true,

  },
  lobo_main: function () {
    this.setData({
      show: 1,
      so1: false,
      so2: true,
      so3: true,
      so4: true,
    })
  },
  lobo_home_page: function () {
    wx.setNavigationBarTitle({
      title: '首页',
    })
    this.setData({
      show: 2,
      so1: true,
      so2: false,
      so3: true,
      so4: true,
    })
  },
  lobo_Instantaneous: function () {
    wx.setNavigationBarTitle({
      title: '瞬间',
    })
    this.setData({
      show: 3,
      so1: true,
      so2: true,
      so3: false,
      so4: true,
    })
  },
  lobo_uesr: function () {
    this.setData({
      show: 4,
      so1: true,
      so2: true,
      so3: true,
      so4: false
    })
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
  },
// 首页跳转
  lobo_information_detali: function (e) {
    wx.navigateTo({
      url: '../lobo_information_detali/lobo_information_detali?id=' + e.currentTarget.id,
    })
  },

  onLoad: function (options) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000,
    })
    var that=this
    wx.getStorage({
      key: 'head_Img',
      success: function(res) {
          that.setData({
            head_Img:res.data
          })
      },
    })
    console.log(options)
    this.setData({
      head_img: options.headimg
    })
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
    // 瞬间数据
    var token = wx.getStorageSync('token')
    var page=this.data.page
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
        console.log('直接登录', res)
        if (res.data.code == 505) {
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
                          console.log('再次登录', res)
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
        else if (res.data.code == 200) {
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
    // 个人中心
    wx.request({
      url: getApp().globalData.url + '/api/user/userCenter',
      data: {
        // code: code
      },
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认值
        'content-type': 'application/json;charset=UTF-8',
        'token': token
      },
      success: function (res) {
        console.log('直接登录', res)
        if (res.data.code == 505) {
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
                        url: getApp().globalData.url + '/api/user/userCenter',
                        data: {
                          // code: code
                        },
                        header: {
                          // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认值
                          'content-type': 'application/json;charset=UTF-8',
                          'token': res.data.data.token
                        },
                        success: function (res) {
                          console.log(res)
                          that.setData({
                            my: res.data.data
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
        else if (res.data.code == 200) {
          that.setData({
            my: res.data.data
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
   * 个人中心
   */
  user_detail: function () {
    wx.navigateTo({
      url: '../user_detail/user_detail',
    })
  },
  card_voucher: function () {
    wx.showToast({
      title: '暂未开通...',
      icon: 'loading',
      duration: 2000,
    })
  },
  lobo_task: function () {
    wx.showToast({
      title: '请绑定对象...',
      icon: 'loading',
      duration: 2000,
    })
  },
  lobo_celandar: function () {
    wx.showToast({
      title: '请绑定对象...',
      icon: 'loading',
      duration: 2000,
    })
  },
  lobo_marry: function () {
    wx.showToast({
      title: '请绑定对象...',
      icon: 'loading',
      duration: 2000,
    })
  },
  lobo_history: function () {
    var my = this.data.my
    // console.log(my)
    if (my.password_view_bind_history == true) {
      this.setData({
        display: 'block',
      })
    }
    else {
      wx.navigateTo({
        url: '../lobo_history/lobo_history',
      })
    }
  },
  password: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 查看绑定历史
  sures: function (e) {
    var that = this
    var password = this.data.password
    var token = wx.getStorageSync('token')
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
          wx.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 2000,
            success: function () {
              that.setData({
                password: '',
                display: 'none',
              })
              wx.navigateTo({
                url: '../lobo_history/lobo_history?password=' + password,
              })
            }
          })
        }
        else {
          that.setData({
            password: ''
          })
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 2000,
          })
        }

      }
    })
  },
  lobo_news: function () {
    wx.showToast({
      title: '请绑定对象...',
      icon: 'loading',
      duration: 2000,
    })
  },
  record: function () {
    wx.showToast({
      title: '请绑定对象...',
      icon: 'loading',
      duration: 2000,
    })
  },
  lobo_union: function () {
    wx.showToast({
      title: '请绑定对象...',
      icon: 'loading',
      duration: 2000,
    })
  },
  lobo_password: function () {
    wx.navigateTo({
      url: '../lobo_password/lobo_password',
    })
  },
  help: function () {
    wx.navigateTo({
      url: '../help/help',
    })
  },
  lobo_about: function () {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  money: function () {
    wx.showToast({
      title: '请绑定对象...',
      icon: 'loading',
      duration: 2000,
    })
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
