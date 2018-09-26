// pages/rili/rili.js
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 0; i < 24; i++) {
  months.push(i)
}

for (let i = 1; i <= 60; i++) {
  days.push(i)
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    week: ['sun', 'mon', 'tues', 'wed', 'ther', 'fir', 'sat'],
    dateArr: [],//三个月份的日历数据
    today: 0,
    currentYear: 2018,
    currentMonth: 8,
    currentDate: 0,
    swiperIndex: 1,//当前所在的位置
    dates: [],//最近3个月的月份和年份
    
    monthEnglish: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    addActivity: false,
    titleValue: '',
    activityContent: '',
    dateValue: '2018-09-06',
    typeData: ['纪念日', '足迹'],
    typeValue: 0,
    privacyData: ['双方可见', '仅自己可见'],
    privacyValue: 0,
    remindData: ['服务通知', '在线通知'],
    remindValue: 0,
    startTime: '00:00',
    endTime: '00:00',
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['全部', '纪念日','足迹'],//下拉列表的数据
    index: 0//选择的下拉列表下标
  },
  name:function(e){
    this.setData({
      titleValue: e.detail.value
    })
  },
  comment: function (e) {
    this.setData({
      activityContent: e.detail.value
    })
  },
  // 点击日历
  dateTap(e) {
    let Index = e.currentTarget.dataset.index,
      Item = e.currentTarget.dataset.item;
    console.log(Index);
    console.log('当天的日期', this.data.dates[this.data.swiperIndex], 'date:', Item.date);
    this.setData({
      today: Index + 1
    });
  },
  // 点击添加事件
  addtap() {
    wx.setNavigationBarTitle({
      title: '创建事件',
    })
    this.setData({
      addActivity: true
    });
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      show: !this.data.show
    });
  },

  // 点击下拉列表 筛选框
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    console.log(e)
    this.setData({
      index: Index,
      show: !this.data.show
    });
    var that = this
    var token = wx.getStorageSync('token');
    wx.request({
      url: getApp().globalData.url + '/api/anniversary/getMain',
      data: {
        type: Index,
      },
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认值
        'content-type': 'application/json;charset=UTF-8',
        'token': token
      },
      success: function (res) {
        console.log(res)
        for (var i = 0; i < res.data.data.list.length; i++) {
          res.data.data.list[i].anniversaryDate = res.data.data.list[i].anniversaryDate.split(' ')
        }
        that.setData({
          list: res.data.data.list,
          together: res.data.data.together
        })
        that.judgeDeta();
      }
    })
  },
  // 创建选择
  bindPickerChange(e) {
    console.log(e);
    let types = e.currentTarget.dataset.types;
    switch (types) {
      // 日期
      case 'date':
        this.setData({
          dateValue: e.detail.value
        });
        break;
      // 时间
      case 'time':
        this.timeScope.openTap();
        break;
      // 类型
      case 'type':
        this.setData({
          typeValue: e.detail.value
        });
        break;
      // 隐私
      case 'privacy':
        this.setData({
          privacyValue: e.detail.value
        });
        break;
      // 提醒
      case 'remind':
        this.setData({
          remindValue: e.detail.value
        });
        break;
    }
  },
  saveTaps(){
    this.setData({
      addActivity: false  //控制显示
    });
  },
  // 点击保存
  saveTap() {
    var that=this
    // this.timeScope.openTap();
    // this.setData({
    //   addActivity: false  //控制显示
    // });
    console.log(this.data.titleValue, this.data.activityContent, this.data.dateValue, this.data.typeData[this.data.typeValue], this.data.privacyData[this.data.privacyValue], this.data.remindData[this.data.remindValue], this.data.startTime, this.data.endTime);

    if (this.data.titleValue==''){
        wx.showToast({
          title: '请填标题',
          icon:'loading',
          duration:2000,
        })
    }
    else{
      wx.showToast({
        title: '提交中...',
        icon: 'loading',
        duration: 2000,
      })
      console.log('privacyValue', this.data.privacyValue)
      console.log('remindType', this.data.remindType)
      console.log('type', this.data.typeValue)
      var token = wx.getStorageSync('token')
      wx.request({
        url: getApp().globalData.url + '/api/anniversary/addAnniversary',
        method:'POST',
        data: {
          comment: this.data.activityContent,
          name: this.data.titleValue,
          date: this.data.dateValue +' '+ this.data.startTime+':00',
          date2: this.data.dateValue + ' ' + this.data.endTime + ':00',
          privacyType: parseInt(this.data.privacyValue)+1,
          remindType: parseInt(this.data.remindValue)+1,
          type: parseInt(this.data.typeValue)  + 1,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', // 默认值
          // 'content-type': 'application/json;charset=UTF-8',
          'token': token
        },
        success: function (res) {
          console.log(res)
            if(res.data.code==200){
              wx.setNavigationBarTitle({
                title: '安排',
              })
              wx.showToast({
                title: '添加成功...',
                duration:2000,
                success:function(){
                 that.setData({
                   addActivity: false  //控制显示
                 })
                 that.onShow()
                }
              })
            }
            else{
              wx.showToast({
                title: res.data.message,
                duration: 2000,
            
              })
            }

        }
      })
    }

    

  },
  

  timeComfirm(e) {
    console.log(e);
    this.setData({
      startTime: e.detail.timeData[0] + ':' + e.detail.timeData[1],
      endTime: e.detail.timeData[2] + ':' + e.detail.timeData[3],
      timeIndex: e.detail.timeIndex
    });
  },
  // 每月日期排列
  dataFn(data) {
    let date = data || new Date();
    let dateArr = [];
    let yue = date.getMonth();
    let n = date.getFullYear();
    let r = date.getDate();
    let totalDay = this.dayNum({ month: yue, year: n });
    let lastMonthDay = new Date(n, yue, 0).getDate();

    console.log(yue);
    let firstDay = new Date(n, yue, 1).getDay();
    let lastDay = new Date(n, yue + 1, 0).getDay();

    console.log(date.getFullYear() != new Date().getFullYear(), date.getMonth() != new Date().getMonth());

    console.log(totalDay, firstDay, lastDay, lastMonthDay);
    for (let i = 1; i < 43; i++) {
      dateArr[i - 1] = {};
      if (i <= firstDay) {
        dateArr[i - 1].date = lastMonthDay - firstDay + i;
        dateArr[i - 1].bg = '1'
      } else if (i > firstDay + totalDay) {
        dateArr[i - 1].date = i - firstDay - totalDay;
        dateArr[i - 1].bg = '1'
      } else {
        dateArr[i - 1].date = i - firstDay;
        dateArr[i - 1].bg = '2'
      }
    }
    console.log(dateArr);
    // this.setData({ today});
    return dateArr;

  },
  swiperChange(e) {
    console.log(e);
    let Index = e.detail.current;
    let swiperIndex = this.data.swiperIndex;

    this.setData({ swiperIndex: Index })
    this.dateChange();
    this.judgeDeta();
  },
  //
  dateChange() {
    let Index = this.data.swiperIndex;
    let currentYear = this.data.dates[Index].year,
      currentMonth = this.data.dates[Index].month;
    let dates = [{}, {}, {}];
    if (Index == 0) {

      dates[1].month = currentMonth + 1;
      dates[1].year = currentYear;

      dates[2].month = currentMonth - 1;
      dates[2].year = currentYear;

      dates[0].month = currentMonth;
      dates[0].year = currentYear;

    } else if (Index == 1) {

      dates[0].month = currentMonth - 1;
      dates[0].year = currentYear;

      dates[2].month = currentMonth + 1;
      dates[2].year = currentYear;

      dates[1].month = currentMonth;
      dates[1].year = currentYear;

    } else if (Index == 2) {
      dates[0].month = currentMonth + 1;
      dates[0].year = currentYear;

      dates[1].month = currentMonth - 1;
      dates[1].year = currentYear;

      dates[2].month = currentMonth;
      dates[2].year = currentYear;
    }
    // console.log('查看：',dates);
    for (let i = 0; i < 3; i++) {
      if (dates[i].month >= 12) {
        dates[i].month = 0;
        dates[i].year = dates[i].year + 1;
      }
      if (dates[i].month <= -1) {
        dates[i].month = 11;
        dates[i].year = dates[i].year - 1;
      }
    }
    console.log('查看所有：', dates, Index);
    this.setData({ dates });
    this.updateDate();
  },
  // 判断月份天数
  dayNum(data) {
    // 400  4 !100
    data.month += 1;
    if (data.month == 2) {
      if (data.year % 400 == 0 || (data.year % 4 == 0 && data.year % 100 != 0)) {
        data.day = 29;
      } else {
        data.day = 28;
      }
    } else if (data.month == 1 || data.month == 3 || data.month == 5 || data.month == 7 || data.month == 8 || data.month == 10 || data.month == 12) {
      data.day = 31;
    } else {
      data.day = 30;
    }
    return data.day;
  },
  // 更新三个月的日期
  updateDate() {
    let arr = [];
    let currentYear = this.data.currentYear,
      currentMonth = this.data.currentMonth,
      dates = this.data.dates;
    let dateAr = [new Date(dates[0].year, dates[0].month), new Date(dates[1].year, dates[1].month), new Date(dates[2].year, dates[2].month)];
    for (let i = 0; i < 3; i++) {
      arr[i] = this.dataFn(dateAr[i]);
    }
    console.log(arr);
    let firstDay = new Date().getDay();
    let today = firstDay + new Date().getDate();
    let date = new Date(dates[this.data.swiperIndex].year, dates[this.data.swiperIndex].month);
    if (date.getFullYear() != new Date().getFullYear() || date.getMonth() != new Date().getMonth()) {
      today = -1;
    }
    this.setData({ dateArr: arr, today });
  },
  onLoad: function (options) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000,
    })
    let datesArr = [];
    for (let i = 0; i < 3; i++) {
      datesArr[i] = {};
      datesArr[i].year = new Date(new Date().getFullYear(), new Date().getMonth() + i - 1).getFullYear();
      datesArr[i].month = new Date(new Date().getFullYear(), new Date().getMonth() + i - 1).getMonth();
    }
    this.setData({
      dates: datesArr
    });
    this.updateDate();


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.timeScope = this.selectComponent('#timeScope');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    var token = wx.getStorageSync('token');
    wx.request({
      url: getApp().globalData.url + '/api/anniversary/getMain',
      data: {
        type: 0,
      },
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认值
        'content-type': 'application/json;charset=UTF-8',
        'token': token
      },
      success: function (res) {
        console.log(res)
        for(var i=0;i<res.data.data.list.length;i++){
          res.data.data.list[i].anniversaryDate = res.data.data.list[i].anniversaryDate.split(' ')
        }
        that.setData({
          list: res.data.data.list,
          together: res.data.data.together
        })
        that.judgeDeta();
      }
    })
  },
  // 判断图标
  judgeDeta(){
    // 当前查看的年月
    let lookDate=this.data.dates[this.data.swiperIndex],
        list=this.data.list,
        dateArr = this.data.dateArr;
    for(let i=0,len=list.length;i<len;i++){
      let date = new Date(list[i].anniversaryDate[0]);
      console.log(date);
      if (date.getFullYear() == lookDate.year && date.getMonth() == lookDate.month){
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        console.log('有东西：', date.getDate(), firstDay, list[i].anniversaryDate[0], dateArr[date.getDate() + firstDay - 1]);
        dateArr[this.data.swiperIndex][date.getDate() + firstDay - 1].type = list[i].type;
      }
    }
    this.setData({ dateArr });
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