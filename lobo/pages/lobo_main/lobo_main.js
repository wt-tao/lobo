// pages/lobo_main/lobo_main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:1,
    url: getApp().globalData.url,
    // 瞬间
    page: 1,
    hadLastPage: false,
    listArray: [],
    // 个人中心
    s1: false,
    so0:false,
    so:true,
    so1: true,
    so2: true,
    display: 'none',
  },
  lobo_main: function () {
    this.setData({
      show:1,
      so0: false,
      so: true,
      so1: true,
      so2: true,
    })
  },
  lobo_home_page:function(){
    wx.setNavigationBarTitle({
      title: '首页',
    })
    this.setData({
      show: 2,
      so0: true,
      so1: true,
      so2: true,
      so: false,
    })
  },
  lobo_Instantaneous: function () {
    wx.setNavigationBarTitle({
      title: '瞬间',
    })
    this.setData({
      show: 3,
      so0: true,
      so: true,
      so2: true,
      so1: false,
    })
  },
  lobo_uesr: function () {
    this.setData({
      show: 4,
      so0: true,
      so: true,
      so1: true,
      so2: false,
    })
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
  },
  // 首页跳转数据
  lobo_information_detali: function (e) {
    wx.navigateTo({
      url: '../lobo_information_detali/lobo_information_detali?id=' + e.currentTarget.id,
    })
  },
  // 瞬间跳转数据
  add: function () {
    wx.navigateTo({
      url: '../add/add',
    })
  },
  decal: function () {
    wx.navigateTo({
      url: '../lobo_decal/lobo_decal',
    })
  },
  details: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../lobo_Instantaneous_detail/lobo_Instantaneous_detail?id=' + e.currentTarget.id + '&user_id=' + e.currentTarget.dataset.id,
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

  },
  // main页
  coun:function(e){
    this.setData({
      content: e.detail.value
    })
  },
  cy:function(){
    var that=this
    var content = this.data.content
    var token = wx.getStorageSync('token')
    if (content==undefined){
      wx.showToast({
        title: '请填写内容...',
        icon:'loading',
        duration: 2000,
      })
    }else{
    wx.request({
      url: getApp().globalData.url + '/api/pairNote/note',
      method:'POST',
      data: {
        content : content 
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
        // 'content-type': 'application/json;charset=UTF-8',
        'token': token
      },
      success: function (res) {
        console.log(res)
        if(res.data.code==506){
          wx.showToast({
            title: '已传音过了...',
            icon: 'loading',
            duration:2000,
          })
        }
       else if (res.data.code == 200) {
          wx.showToast({
            title: '传音成功...',
            icon: 'loading',
            duration: 2000,
            success:function(){
              wx.reLaunch({
                url: '../lobo_home_page/lobo_home_page',
              })
            }
          })
        }
      }
    })
    }
  },
  /**
   * 个人中心
   */
  card_voucher: function () {
    wx.showToast({
      title: '暂未开通...',
      icon: 'loading',
      duration: 2000,
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
  lobo_money: function () {
    // wx.showToast({
    //   title: '暂未开通...',
    //   icon: 'loading',
    //   duration: 2000,
    // })
    wx.navigateTo({
      url: '../lobo_money/lobo_money',
    })
  },
  user_detail: function () {
    wx.navigateTo({
      url: '../user_detail/user_detail',
    })
  },
  lobo_news: function () {
    wx.navigateTo({
      url: '../lobo_news/lobo_news',
    })
  },
  lobo_celandar: function () {
    wx.navigateTo({
      url: '../lobo_celandar/lobo_celandar',
    })
  },
  record: function () {
    wx.navigateTo({
      url: '../lobo_record/lobo_record',
    })
  },
  password: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  lobo_history: function () {
    var my = this.data.my
    console.log(my)
    if (my.password == true) {
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

  lobo_password: function (e) {
    wx.navigateTo({
      url: '../lobo_password/lobo_password?id=' + e.currentTarget.id,
    })
  },
  lobo_marry: function () {
    wx.navigateTo({
      url: '../lobo_marry/lobo_marry',
    })
  },
  lobo_union: function () {
    wx.navigateTo({
      url: '../lobo_union/lobo_union',
    })
  },
  lobo_task: function () {
    wx.navigateTo({
      url: '../lobo_task/lobo_task',
    })
  },
  // 解除绑定
  relieve: function () {
    wx.showModal({
      title: '请确认',
      content: '确定要解除绑定分手吗？',
      success: function (r) {
        if (r.confirm) {
          wx.navigateTo({
            url: '../lobo_unbind/lobo_unbind',
          })
        }
      }
    })
  },
  // 遮罩层
  display: function () {
    this.setData({
      display: 'none',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'head_Img',
      success: function (res) {
        console.log(res)
        that.setData({
          head_Img: res.data
        })
      },
    })
   
    var token = wx.getStorageSync('token')
    wx.request({
      url: getApp().globalData.url + '/api/pairNote/getNote',
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
          text:res.data.data
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

          // imageWidth: wx.getSystemInfoSync().windowWidth,
          openid: res.data.data
        })
      }
    })
    // 首页数据
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
                var exp = ((resp.data.data.head.expGet / resp.data.data.head.expNeed) * 100).toFixed(0)
                wx.setStorage({
                  key: 'head_Img',
                  data: resp.data.data.defaultHeadImg,
                })
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
                          var pairDays = res.data.data.create_time.substring(0, 10)

                          // var now=new Date()
                          var timestamp = Date.parse(new Date());
                          timestamp = timestamp / 1000;
                          console.log("当前时间戳为：" + timestamp);


                          var stringTime = res.data.data.create_time
                          var timestamp2 = Date.parse(new Date(stringTime));
                          timestamp2 = timestamp2 / 1000;
                          //2018-07-31 15:57:35的时间戳为：1533023855
                          console.log(stringTime + "的时间戳为：" + timestamp2);
                          // 相距时间戳
                          var day = ((timestamp - timestamp2) / (24 * 60 * 60)).toFixed(0)
                          console.log('相距时间戳', day)


                          console.log('pairDays', pairDays)
                          that.setData({
                            day: day,
                            pairDays: pairDays,
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
          var pairDays = res.data.data.create_time.substring(0, 10)

          // var now=new Date()
          var timestamp = Date.parse(new Date());
          timestamp = timestamp / 1000;
          console.log("当前时间戳为：" + timestamp);


          var stringTime = res.data.data.create_time
          var timestamp2 = Date.parse(new Date(stringTime));
          timestamp2 = timestamp2 / 1000;
          //2018-07-31 15:57:35的时间戳为：1533023855
          console.log(stringTime + "的时间戳为：" + timestamp2);
          // 相距时间戳
          var day = ((timestamp - timestamp2) / (24 * 60 * 60)).toFixed(0)
          console.log('相距时间戳', day)


          console.log('pairDays', pairDays)
          that.setData({
            day: day,
            pairDays: pairDays,
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
    // this.loading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})