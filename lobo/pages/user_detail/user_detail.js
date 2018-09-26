// pages/user_detail/user_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:getApp().globalData.url,
    img:true,
    img1:false,
  },
  name:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  sex: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  real_name: function (e) {
    this.setData({
      real_name: e.detail.value
    })
  },
  id_card_no: function (e) {
    this.setData({
      id_card_no: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  img: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths[0];
        that.setData({
          img: false,
          img1: true,
          img_: imgsrc
        })
      }
    })
  },
  save:function(){
    var that = this
    wx.showModal({
      title: '请注意！',
      content: '身份证填写完成后,lobo基金才可开通使用',
      success:function(e){
        if(e.confirm){
          var name = that.data.name
          var sex = that.data.sex
          if (sex == '男') {
            sex = 1
          }
          else {
            sex = 0
          }
          console.log('sex', sex)
          var real_name = that.data.real_name
          var id_card_no = that.data.id_card_no
          var phone = that.data.phone
          var img_ = that.data.img_
          console.log('img_', img_)
          var token = wx.getStorageSync('token')
          // 判断带*号的必须填写
          if (real_name == undefined || id_card_no == undefined || phone == undefined) {
            wx.showToast({
              title: '资料不完整',
              icon: 'loading',
              duration: 2000,
            })
          } else if (img_ == undefined) {
            wx.request({
              url: getApp().globalData.url + '/api/user/set',
              method:'POST',
              data: {
                headImg: img_,
                idCardNo: id_card_no,
                phone: phone,
                realName: real_name,
                setCity: that.data.city,
                setProvince: that.data.country,
                set_nickname: name,
                set_sex: sex
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
                // 'content-type': 'application/json;charset=UTF-8',
                'token': token
              },
              success: function (res) {
                // console.log(res)
                console.log('填之前', res)
                if (res.data.code === 201) {
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
                else{
                  wx.showToast({
                    title: res.data.message,
                    icon:'loading',
                    duration:2000,
                  })
                }

              }
            })
          }
          
          else if (id_card_no.length < 17){
            wx.showToast({
              title: '身份证错误',
              icon: 'loading',
              duration: 2000,
            })
          } else if (phone.length < 10) {
            wx.showToast({
              title: '手机号错误',
              icon: 'loading',
              duration: 2000,
            })
          }
           else {
            
            wx.uploadFile({
              url: getApp().globalData.url + '/api/user/set',
              filePath: img_,
              name: 'headImg',
              formData: {
                headImg: img_,
                idCardNo: id_card_no,
                phone: phone,
                realName: real_name,
                setCity: that.data.city,
                setProvince: that.data.country,
                set_nickname: name,
                set_sex: sex
              },
              header: {
                // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认值
                'content-type': 'application/json;charset=UTF-8',
                'token': token
              },
              success: function (res) {
                // console.log(res)
                var data = JSON.parse(res.data)
                console.log('填之前', data)
                if (data.code === 201) {
                  wx.showToast({
                    title: '修改成功',
                    duration:2000,
                    success:function(){
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  })
                
                }

              }
            })
          }

        }
      }
    })
  },
  saves:function(e){
    var that = this
    wx.showModal({
      title: '请注意！',
      content: '身份证填写完成后,用户务必保证居民身份证的真实性，身份信息科反复更改，每次修改，一年最短提现时间将会初始化',
      success: function (e) {
        if (e.confirm) {
          var name = that.data.name
          var sex = that.data.sex
          if (sex == '男') {
            sex = 1
          }
          else {
            sex = 0
          }
          console.log('sex', sex)
          var real_name = that.data.real_name
          var id_card_no = that.data.id_card_no
          var phone = that.data.phone
          var img_ = that.data.img_
          console.log('img_', img_)

          // 默认数据
          var user = that.data.user
          var head_img = that.data.url + user.head_img
          var nickname = user.nickname
          var Sex = user.sex
          if (Sex == 1) {
            Sex = '男'
          }
          else {
            Sex = '女'
          }
          // console.log('Sex', Sex)
          // console.log('head_img', head_img)
          var Real_name = ''
          var Id_card_no = ''
          var Phone = ''

          var set_nickname = name == undefined ? nickname : name
          var set_sex = sex == undefined ? Sex : sex
          var headImg = img_ == undefined ? head_img : img_

          var realName = real_name == undefined ? Real_name : real_name
          var idCardNo = id_card_no == undefined ? Id_card_no : id_card_no
          var telphone = phone == undefined ? Phone : phone
          console.log('headImg', headImg)
          var token = wx.getStorageSync('token')
          if (img_ == undefined) {
              wx.request({
                url: getApp().globalData.url + '/api/user/set',
                method:'POST',
                header:{
                  'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
                  'token': token
                },
                data: {
                  // headImg: headImg,
                  idCardNo: idCardNo,
                  phone: telphone,
                  realName: realName,
                  setCity: that.data.city,
                  setProvince: that.data.country,
                  set_nickname: set_nickname,
                  set_sex: set_sex
                },
                success: function (res) {
                  // console.log(,res)
                  console.log('填之后不带图片', res)
                  if (res.data.code === 201) {
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
          else {
            wx.uploadFile({
              url: getApp().globalData.url + '/api/user/set',
              filePath: headImg,
              name: 'headImg',
              formData: {
                headImg: headImg,
                idCardNo: idCardNo,
                phone: telphone,
                realName: realName,
                setCity: that.data.city,
                setProvince: that.data.country,
                set_nickname: set_nickname,
                set_sex: set_sex
              },
              header: {
                // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认值
                'content-type': 'application/json;charset=UTF-8',
                'token': token
              },
              success: function (res) {
                // console.log(,res)
                var data = JSON.parse(res.data)
                console.log('填之后', data)
                if (data.code === 201) {
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

              }
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key: 'head_Img',
      success: function (res) {
        that.setData({
          head_Img: res.data
        })
      },
    })
    var token = wx.getStorageSync('token')
    wx.request({
      url: getApp().globalData.url + '/api/user/info',
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
          user: res.data.data
        })

      }
    })

    wx.getLocation({
      success: function (res) {
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + res.latitude + ',' + res.longitude + '&key=QPHBZ-INS36-47USQ-EEPJW-E4NR3-FIF42&get_poi=1', data: {},
          header: { 'Content-Type': 'application/json' },
          success: function (ops) {
            console.log(ops.data)
            that.setData({
              country: ops.data.result.address_component.province,
              city: ops.data.result.address_component.city,

            })
          }
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