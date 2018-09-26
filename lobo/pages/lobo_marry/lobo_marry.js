// pages/marry/marry.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1: true,
    show: false,
    url: getApp().globalData.url,
    idCardPhotoList: [],
    marriageLicenseAndGroupPhotoList: [],
    files: [],
    filet: [],
  },
  tj: function () {
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log(res.data)
        wx.request({
          url: app.globalData.url + '/api/marriageLicense/submit',
          method: 'POST',
          data: {
            // code: code
          },
          header: {
            // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认值
            'content-type': 'application/json;charset=UTF-8',
            'token': res.data
          },
          success: function (res) {
            console.log(res)
            if (res.data.code == 505) {
              app.login()
              // that.onLoad()
            }
            if (res.data.code = 200) {
              this.setData({
                show: true,
                show1: false
              })
            }

          }
        })
      }
    })
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
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        // console.log(res.data)
        wx.request({
          url: app.globalData.url + '/api/marriageLicense/get',
          data: {
            // code: code
          },
          header: {
            // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认值
            'content-type': 'application/json;charset=UTF-8',
            'token': res.data
          },
          success: function (res) {
            console.log(res)
            if (res.data.code == 505) {
              app.login()
              // that.onLoad()
            }
            if (res.data.data.status == 0) {
              that.setData({
                show: true,
                show1: false
              })
            }
            if (res.data.data.status == 1) {
              wx.showToast({
                title: '审核通过',
                duration: 2000,
                success: function () {
                  wx.switchTab({
                    url: '../user/user',
                  })
                }
              })
            }
            if (res.data.data.status == 2) {
              wx.showModal({
                title: '审核结果',
                content: '审核未通过',
                success: function (e) {
                  if (e.confirm) {
                    that.setData({
                      idCardPhotoList: [],
                      marriageLicenseAndGroupPhotoList: [],
                      show1: true,
                      show: false,
                    })
                  }
                }
              })
            }
            that.setData({
              idCardPhotoList: res.data.data.idCardPhotoList,
              marriageLicenseAndGroupPhotoList: res.data.data.marriageLicenseAndGroupPhotoList
            })

          }
        })
      }
    })
  },
  //上传身份证 
  card: function (data) {
    var that = this,
      files = this.data.files;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['相册', '相机'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        // console.log('img_',img_)
        // console.log('imgsrc',imgsrc)
        files = files.concat(imgsrc);
        console.log('files+++', files)
        // console.log(img_)
        that.setData({
          img: true,
          files: files
        })
        var i = data.i ? data.i : 0,//当前上传的哪张图片
          success = data.success ? data.success : 0,//上传成功的个数

          fail = data.fail ? data.fail : 0;//上传失败的个数
        if (files.length >= 4) {
          wx.getStorage({
            key: 'token',
            success: function (res) {
              app.uploadimgs({
                url: getApp().globalData.url + '/api/marriageLicense/id_card?token=' + res.data,
                path: files,//这里是选取的图片的地址数组

              })

            }
          })
        }
      },
    })
  },
  //上传结婚证 
  marry: function (data) {
    var that = this,
      filet = this.data.filet;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['相册', '相机'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        // console.log('img_',img_)
        // console.log('imgsrc',imgsrc)
        filet = filet.concat(imgsrc);
        console.log('filet+++', filet)
        // console.log(img_)
        that.setData({
          img: true,
          filet: filet
        })
        var i = data.i ? data.i : 0,//当前上传的哪张图片
          success = data.success ? data.success : 0,//上传成功的个数

          fail = data.fail ? data.fail : 0;//上传失败的个数
        if (filet.length >= 2) {
          wx.getStorage({
            key: 'token',
            success: function (res) {
              app.uploadimgs({

                url: getApp().globalData.url + '/api/marriageLicense/marriage_license_and_group_photo?token=' + res.data,
                path: filet,//这里是选取的图片的地址数组

              })

            }
          })
        }

      },
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