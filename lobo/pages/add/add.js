// pages/add/add.js、
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.url,
    g0: true,
    g1: false,

    r0: true,
    r1: false,

    gw0: true,
    gw1: false,

    ly0: true,
    ly1: false,

    hd0: true,
    hd1: false,

    jx0: true,
    jx1: false,

    dk0: true,
    dk1: false,

    qt0: true,
    qt1: false,


    img: false,
    img_: [],//上传
    img_s:true,
    id:1,
  },
  gb: function (e) {
    this.setData({
      id: e.currentTarget.id,
      g0: true,
      g1: false,
      r0: true,
      r1: false,
      gw0: true,
      gw1: false,
      ly0: true,
      ly1: false,

      hd0: true,
      hd1: false,

      jx0: true,
      jx1: false,

      dk0: true,
      dk1: false,

      qt0: true,
      qt1: false,
    })
  },
  rl: function (e) {
    this.setData({
      id: e.currentTarget.id,
      g0: false,
      g1: true,
      r0: false,
      r1: true,
      gw0: true,
      gw1: false,
      ly0: true,
      ly1: false,

      hd0: true,
      hd1: false,

      jx0: true,
      jx1: false,

      dk0: true,
      dk1: false,

      qt0: true,
      qt1: false,
    })
  },
  gw: function (e) {
    this.setData({
      id: e.currentTarget.id,
      g0: false,
      g1: true,
      r0: true,
      r1: false,
      gw0: false,
      gw1: true,
      ly0: true,
      ly1: false,

      hd0: true,
      hd1: false,

      jx0: true,
      jx1: false,

      dk0: true,
      dk1: false,

      qt0: true,
      qt1: false,
    })
  },
  ly: function (e) {
    this.setData({
      id: e.currentTarget.id,
      g0: false,
      g1: true,
      r0: true,
      r1: false,
      gw0: true,
      gw1: false,
      ly0: false,
      ly1: true,

      hd0: true,
      hd1: false,

      jx0: true,
      jx1: false,

      dk0: true,
      dk1: false,

      qt0: true,
      qt1: false,
    })
  },
  hd: function (e) {
    this.setData({
      id: e.currentTarget.id,
      g0: false,
      g1: true,
      r0: true,
      r1: false,
      gw0: true,
      gw1: false,
      ly0: true,
      ly1: false,

      hd0: false,
      hd1: true,

      jx0: true,
      jx1: false,

      dk0: true,
      dk1: false,

      qt0: true,
      qt1: false,
    })
  },
  jx: function (e) {
    this.setData({
      id: e.currentTarget.id,
      g0: false,
      g1: true,
      r0: true,
      r1: false,
      gw0: true,
      gw1: false,
      ly0: true,
      ly1: false,

      hd0: true,
      hd1: false,

      jx0: false,
      jx1: true,

      dk0: true,
      dk1: false,

      qt0: true,
      qt1: false,
    })
  },
  dk: function (e) {
    this.setData({
      id: e.currentTarget.id,
      g0: false,
      g1: true,
      r0: true,
      r1: false,
      gw0: true,
      gw1: false,
      ly0: true,
      ly1: false,

      hd0: true,
      hd1: false,

      jx0: true,
      jx1: false,

      dk0: false,
      dk1: true,

      qt0: true,
      qt1: false,
    })
  },
  qt: function (e) {
    this.setData({
      id: e.currentTarget.id,
      g0: false,
      g1: true,
      r0: true,
      r1: false,
      gw0: true,
      gw1: false,
      ly0: true,
      ly1: false,

      hd0: true,
      hd1: false,

      jx0: true,
      jx1: false,

      dk0: true,
      dk1: false,

      qt0: false,
      qt1: true,
    })
  },
  // 标题
  title: function (e) {
    console.log(e)
    this.setData({
      title: e.detail.value
    })
  },
  // 内容
  content: function (e) {
    console.log(e)
    this.setData({
      content: e.detail.value
    })
  },
  // 上传
  img: function () {
    // var cover_img = this.data.cover_img
    // console.log(cover_img)
    var that = this,
      img_ = this.data.img_;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        img_ = img_.concat(imgsrc);
        // img_.unshift(cover_img)
        // console.log(img_)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        if(img_.length>8){
          that.setData({
            img_s:false
          })
        }
        that.setData({
          img: true,
          img_: img_
        })

      }
    })
  },
  add: function (e) {
    var token = wx.getStorageSync('token')
    var type_id = this.data.id
    var content = this.data.content
    var imgs_ = this.data.img_
    var title = this.data.title
    var that = this    
    if (title == undefined) {
      wx.showToast({
        title: '请填标题',
        icon: 'loading'
      })
    }
    else if (content == undefined) {
      wx.showToast({
        title: '请填内容',
        icon: 'loading'
      })
    }
    else if (imgs_.length == 0) {
      wx.showToast({
        title: '请选图片',
        icon: 'loading'
      })
    } else {
      wx.showToast({
        title: '提交中...',
        icon:'loading',
        duration:2000,
      })
          wx.request({
            url: getApp().globalData.url + '/api/card/submit',
            method: 'POST',      
            data: {
              type_id: type_id,
              content: content,
              title: title,
              city: that.data.city,
              country: that.data.country,
 
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
              // 'content-type': 'application/json;charset=UTF-8',
              'token': token
            },
            success: function (resp) {
              console.log(resp)
              var tokens = resp.data.data
            
              app.uploadimg({
                url: getApp().globalData.url + '/api/card/submit_img/' + tokens,
                path: imgs_//这里是选取的图片的地址数组
              })
            },
          })
   
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var data = wx.getStorageSync('info')

    console.log(data)
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000,
    })
    this.setData({
      types_img: data,
    })
    var that = this
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
      var now=new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    // console.log('year', year)
    // console.log('month', month)
    // console.log('day', day)

    this.setData({
      year: year,
      month: month,
      day: day,
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
  
  }
})