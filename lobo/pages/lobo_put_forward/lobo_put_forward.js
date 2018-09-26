// pages/Put_forward/Put_forward.js\
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    s2: false,
    s1: true,
    no: '',
    price: 0,
    url: app.globalData.url,
  },


  // 银行卡
  no: function (e) {
    this.setData({
      no: e.detail.value
    })
  },
  // 输入金额
  input: function (e) {
    var money = e.currentTarget.dataset.money
    if (money == '0.00') {
      wx.showToast({
        title: '无法提现',
        icon: 'loading'
      })
    } else {
      this.setData({
        s2: true,
        s1: false,
        price: e.detail.value
      })
    }
  },
  payall: function (e) {
    var amount = e.currentTarget.dataset.money
    var no = this.data.no
    wx.showModal({
      title: '请确认银行卡号',
      content: this.data.no,
      success: function (r) {
        if (r.confirm) {

          if (amount == '0.00') {
            wx.showToast({
              title: '金额不足',
              icon: 'loading'
            })
          }
          if (no == '') {
            wx.showToast({
              title: '卡号为空',
              icon: 'loading'
            })
          }
          else{
          wx.getStorage({
            key: 'token',
            success: function (res) {
              // console.log(res.data)
              wx.request({
                url: app.globalData.url + '/api/withdraw/apply-v2',
                method: 'POST',
                data: {
                  amount: amount,
                  no: no,
                  noType: 1,
                  types: types,

                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
                  // 'content-type': 'application/json;charset=UTF-8',
                  'token': res.data
                },
                success: function (res) {
                  console.log(res)
                  if (res.data.code == 200) {
                    wx.showToast({
                      title: '提现审核中...',
                    })
                  }
                }
              })
            }
          })
        }
        }
      }
    })
  },
  //确认提现
  pay: function () {
    var that = this
    var types = this.data.types
    var amount = parseInt(this.data.price)
    var money = parseInt(this.data.loveTotalAmount)
    var no = this.data.no
    if (amount > money) {
      wx.showToast({
        title: '请输入正确金额',
        icon: 'loading'
      })
    }
    else {
      wx.showModal({
        title: '请确认银行卡号',
        content: this.data.no,
        success: function (r) {
          if (r.confirm) {

            if (amount == 0) {
              wx.showToast({
                title: '金额不足',
                icon: 'loading'
              })
            }
            if (no == '') {
              wx.showToast({
                title: '卡号为空',
                icon: 'loading'
              })
            }
            wx.getStorage({
              key: 'token',
              success: function (res) {
                // console.log(res.data)
                wx.request({
                  url: app.globalData.url + '/api/withdraw/apply-v2',
                  method: 'POST',
                  data: {
                    amount: amount,
                    no: no,
                    noType: 1,
                    types: types,

                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
                    // 'content-type': 'application/json;charset=UTF-8',
                    'token': res.data
                  },
                  success: function (res) {
                    console.log(res)
                    if (res.data.code == 200) {
                      wx.showToast({
                        title: '提现审核中...',
                      })
                    }
                  }
                })
              }
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var types = options.types
    var loveTotalAmount = options.loveTotalAmount
    that.setData({
      types: types,
      loveTotalAmount: loveTotalAmount,
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