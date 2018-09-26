// pages/lobo_password/lobo_password.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1:true,
    show2: false,
    show3: false,
    j1: false,
    j2: true,
    ids:['1'],
    pwd1:true,
    pwd2:false
  },
  password:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  npassword: function (e) {
    this.setData({
      npassword: e.detail.value
    })
  },
  select_date1:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    var show1 = !e.currentTarget.dataset.show
    var ids=this.data.ids
    if (show1==true){
        ids.push(id)
    }
    else{
      for (var i = 0; i < ids.length; i++) {
        if (ids[i] == id) {
          ids.splice(i, 1)
        }
      }
    }
    console.log('ids',ids)
    console.log('show1', show1)
    this.setData({
      ids: ids,
      show1: show1,
    });
  },
  select_date2: function (e) {
    console.log(e)
    var ids = this.data.ids
    var id = e.currentTarget.dataset.id
    var show2 = !e.currentTarget.dataset.show
    console.log('show2', show2)
    if (show2 == true) {
      ids.push(id)
    }
    else {
      for (var i = 0; i < ids.length; i++) {
        if (ids[i] == id) {
          ids.splice(i, 1)
        }
      }
    }
    console.log('ids', ids)
    this.setData({
      show2: show2,
    });
  },
  select_date3: function (e) {
    console.log(e)
    var ids = this.data.ids
    var id = e.currentTarget.dataset.id
    var show3 = !e.currentTarget.dataset.show
    console.log('show3', show3)
    if (show3 == true) {
      ids.push(id)
    }
    else {
      for (var i = 0; i < ids.length; i++) {
        if (ids[i] == id) {
          ids.splice(i, 1)
        }
      }
    }
    console.log('ids', ids)
    this.setData({
      show3: show3,
    });
  },
  save:function(){
    console.log('触发save')
    var that = this

    var password = this.data.password
    var flyPassword = this.data.flyPassword
    console.log('flyPassword', flyPassword)
    console.log('password', password)

    var id = this.data.ids
    var token = wx.getStorageSync('token')
    if (flyPassword=='true'){
      if (password==undefined){
        wx.showToast({
          title: "请输入旧密码",
          icon:'loading',
          duration:2000,
        })
      }
      else{
        this.setData({
          pwd1: false,
          pwd2: true
        })
      }
    }
    else if (flyPassword=='false'){
      wx.request({
        url: getApp().globalData.url + '/api/user/setPassword',
        method: 'POST',
        data: {
          type: id,
          password: password,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
          // 'content-type': 'application/json;charset=UTF-8',
          'token': token
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 201) {
            wx.showToast({
              title: '修改成功',
              duration: 2000,
              success: function () {
                wx.navigateBack({
                  delta: 1
                })
              }
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
  saves: function () {
    console.log('触发saves')
    var that = this
    var oldPassword = this.data.password
    var password = this.data.npassword
    var id = this.data.ids
    var token = wx.getStorageSync('token')

      wx.request({
        url: getApp().globalData.url + '/api/user/setPassword',
        method: 'POST',
        data: {
          type: id,
          oldPassword: oldPassword,
          password: password,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
          // 'content-type': 'application/json;charset=UTF-8',
          'token': token
        },
        success: function (res) {
          console.log(res)
          if (res.data.code == 201) {
            wx.showToast({
              title: '修改成功',
              duration: 2000,
              success: function () {
                wx.navigateBack({
                  delta: 1
                })
              }
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      this.setData({
        flyPassword:options.id
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