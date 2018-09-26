// pages/not_uesr/not_uesr.js
var app = getApp()

var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:getApp().globalData.url,
  },
  
  index: function () {
    wx.reLaunch({
      url: '../index/index',
    })
  },
  home_page: function () {
    wx.reLaunch({
      url: '../home_page/home_page',
    })
  },
  Instantaneous: function () {
    wx.reLaunch({
      url: '../Instantaneous/Instantaneous',
    })
  },
  user_detail:function(){
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'head_Img',
      success: function (res) {
        that.setData({
          head_Img: res.data
        })
      },
    })
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000,
    })
    
  },
  ca:function(e){
    console.log(e)
  },
  money: function () {
    wx.showToast({
      title: '请绑定对象...',
      icon: 'loading',
      duration: 2000,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成 
    var cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。 
    cxt_arc.setLineWidth(5);//设置线条宽度
    cxt_arc.setStrokeStyle('#d2d2d2');//	设置线条样式
    cxt_arc.setLineCap('round')//设置线条端点的样式
    cxt_arc.beginPath();//开始一个新的路径 
    cxt_arc.arc(48, 36, 46.5, 0, 2 * Math.PI, false);//设置一个原点(106,106)，半径为100的圆的路径到当前路径 
    cxt_arc.stroke();//对当前路径进行描边 

    cxt_arc.setLineWidth(5);
    cxt_arc.setStrokeStyle('#F675D7');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径 
    cxt_arc.arc(106, 106, 100, -Math.PI * 1 / 2, Math.PI * 6 / 5, false);
    cxt_arc.stroke();//对当前路径进行描边 

    cxt_arc.draw(); 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var token = wx.getStorageSync('token')

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
        console.log('openid',res)
        that.setData({
          openid: res.data.data
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
    var openid = this.data.openid
    console.log('分享',openid)
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