// pages/add/add.js、
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addres:true,
    ids:111,
    url: getApp().globalData.url,

    img: false,
    img_: [],//上传
    video_:[],
    img_s:true,
    id:1,
  },
  imges:function(){
    this.setData({
      addres: false,
    })
  },
  bindAddrestap: function () {
    this.setData({
      addres: true,
    })
  },
  imgs:function(e){
    console.log(e)
    this.setData({
      ids: e.currentTarget.id,
    })
  },
  gb: function (e) {
    this.setData({
      id: e.currentTarget.id,

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
  img: function (e) {
    var that = this,
      img_ = this.data.img_;
    // video_ = this.data. video_  
    if (e.currentTarget.id==1){
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var imgsrc = res.tempFilePaths;
          img_ = img_.concat(imgsrc);
          
          if(img_.length>8){
            that.setData({
              img_s:false
            })
          }
          that.setData({
            img: true,
            img_: img_,
            addres:true,
          })
        }
      })
    }
    if (e.currentTarget.id == 2){
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success: function (res) {
          console.log(res)
          wx.showLoading({
            title: '上传中...',
          })
          var imgsrc = res.tempFilePath;
              img_ = img_.concat(imgsrc);
          console.log(img_)
          wx.hideLoading()
          console.log('size', res.size)
          if (res.size  > 1024 * 1024 * 2) {
            wx.showModal({
              title: '超出限制',
              content: '很抱歉，视频最大允许2M，当前为' + (res.size  / (1024 * 1024)).toFixed(2) + 'M',
            
            })
            return false;}
          if (img_.length > 8) {
            that.setData({
              img_s: false
            })
          }
          that.setData({
            img: true,
            img_: img_,
            addres: true,
          })
        }
      })
    }
  },
  add: function (e) {
    var token = wx.getStorageSync('token')
    var type_id = this.data.id
    var content = this.data.content
    var imgs_ = this.data.img_
    console.log('imgs_', imgs_)
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