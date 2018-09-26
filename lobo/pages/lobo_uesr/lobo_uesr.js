// pages/lobo_uesr/lobo_uesr.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    s1:false,
    display: 'none',
    url:getApp().globalData.url,
  },
  
  lobo_home_page: function () {
    wx.reLaunch({
      url: '../lobo_home_page/lobo_home_page',
    })
  },
  lobo_Instantaneous: function () {
    wx.reLaunch({
      url: '../lobo_Instantaneous/lobo_Instantaneous',
    })
  },
  lobo_main: function () {
    wx.reLaunch({
      url: '../lobo_main/lobo_main',
    })
  },
  card_voucher:function(){
    wx.showToast({
      title: '暂未开通...',
      icon:'loading',
      duration:2000,
    })
  },
  help:function(){
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
    wx.showToast({
      title: '暂未开通...',
      icon:'loading',
      duration:2000,
    })
    // wx.navigateTo({
    //   url: '../lobo_money/lobo_money',
    // })
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
  lobo_celandar:function(){
    wx.navigateTo({
      url: '../lobo_celandar/lobo_celandar',
    })
  },
  record: function () {
    wx.navigateTo({
      url: '../lobo_record/lobo_record',
    })
  },
  password:function(e){
    this.setData({
      password:e.detail.value
    })
  },

  lobo_history: function () {
    var my = this.data.my
    console.log(my)
    if (my.password_view_bind_history==true){
      this.setData({
        display: 'block',
      })
    }
    else{
      wx.navigateTo({
        url: '../lobo_history/lobo_history',
      })
    }
  },
  // 查看绑定历史
  sures:function(e){
    var that=this
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
            icon:'loading',
            duration: 2000,
            success: function () {
              that.setData({
                password:'',
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

  lobo_password: function () {
    wx.navigateTo({
      url: '../lobo_password/lobo_password',
    })
  },
  lobo_marry: function() {
    wx.navigateTo({
      url: '../lobo_marry/lobo_marry',
    })
  },
  lobo_union: function () {
    wx.navigateTo({
      url: '../lobo_union/lobo_union',
    })
  },
  lobo_task:function(){
    wx.navigateTo({
      url: '../lobo_task/lobo_task',
    })
  },
  // 解除绑定
  relieve:function(){
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
  display:function(){
    this.setData({
      display:'none',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: 'head_Img',
      success: function(res) {
        console.log(res)
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
        console.log('直接登录',res)
        if (res.data.code == 505) {
          wx.showToast({
            title: '重新登录中...',
            icon:'loading',
            duration:2000,
            success:function(){
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
      else  if(res.data.code==200){
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
     else{
       wx.showToast({
         title: res.data.message,
         duration:2000,
       })
     }
       
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