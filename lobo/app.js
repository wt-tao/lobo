//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    url: 'http://211.149.186.132/lobo',
  },
  login:function(){
    var that=this
    wx.login({
      success:function(r){
        console.log(r)

      }
    })
  },
  //多张图片上传
  uploadimg: function (data) {
    // var imgs_ = this.data.imgs_
    var that = this
    var i = data.i ? data.i : 0,//当前上传的哪张图片
      success = data.success ? data.success : 0,//上传成功的个数

      fail = data.fail ? data.fail : 0;//上传失败的个数
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'imgs_',
      formData: null,
      success: (resp) => {
        if (resp.data == '{"code":506,"message":"只有关联了对象才能发布卡片","data":null}') {
          wx.showModal({
            title: '请关联对象',
            content: '只有关联了对象才能发布卡片',
            success: function (r) {
              if (r.confirm) {
                  img_ = [],//上传
                  content = '',//内容
                  title = '',//标题
                  id = '1'
              }
            }
          })
        }
        success++;//图片上传成功，图片上传成功的变量+1
        console.log(resp)
        console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
        console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        console.log(i);
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用        
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
          wx.reLaunch({
            url: '../lobo_Instantaneous/lobo_Instantaneous',
          })
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    })
  },

})